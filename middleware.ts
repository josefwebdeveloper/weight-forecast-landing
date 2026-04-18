// Vercel Routing Middleware — Markdown for Agents
// https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
//
// When a client requests `Accept: text/markdown` (typical AI agent) on any
// HTML route, serve the hand-written markdown mirror at `/index.md`. Browsers
// (which default to `Accept: text/html,...`) are untouched.

export const config = {
  matcher: [
    // Exclude static assets, api routes, and well-known discovery files so we
    // never shadow them. Only the HTML shell falls through to this handler.
    '/((?!api/|\\.well-known/|_next/|assets/|icons/|splash/|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|mov|mp4|js|mjs|css|json|yaml|yml|md|txt|xml|webmanifest|map|woff2?)$).*)',
  ],
};

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const accept = request.headers.get('accept') || '';
  const firstType = (accept.split(',')[0] || '').trim().toLowerCase();
  const wantsMarkdown =
    /\btext\/markdown\b/i.test(accept) && !firstType.startsWith('text/html');

  if (!wantsMarkdown || request.method !== 'GET') {
    return fetch(request);
  }

  const mdUrl = new URL('/index.md', url.origin);
  const upstream = await fetch(mdUrl, {
    headers: { accept: 'text/markdown' },
  });

  if (!upstream.ok) {
    return fetch(request);
  }

  const body = await upstream.text();
  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=300, must-revalidate',
      vary: 'Accept',
      'x-markdown-source': '/index.md',
      'x-markdown-tokens': String(Math.ceil(body.length / 4)),
      link: [
        '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
        '</openapi.yaml>; rel="service-desc"; type="application/yaml"',
        '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"; type="application/json"',
      ].join(', '),
    },
  });
}
