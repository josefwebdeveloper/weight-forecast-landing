#!/usr/bin/env node
/**
 * Body snapshot for the Vite + React SPA.
 *
 * Why: `prerender.mjs` only rewrites head meta per route, the body is still an
 * empty `<div id="root"></div>`. That hurts SEO because Googlebot's first-pass
 * crawler sees no content and defers indexation to the (slower) JS-rendering
 * queue. Social scrapers (Twitter, Slack, Discord, LinkedIn, Facebook) don't
 * execute JS at all, so they see no content either.
 *
 * What this does: after `vite build` + `prerender.mjs`, spin up a static
 * server against `dist/`, drive headless Chromium through every canonical
 * route, wait for React to hydrate, and bake the resulting `#root` innerHTML
 * back into the matching `dist/<route>/index.html`. React still hydrates on
 * top of the snapshot at runtime, so behaviour is unchanged — the snapshot
 * only gives non-JS clients a real first paint.
 *
 * Trade-offs:
 *   - Adds ~170MB Chromium download to devDeps (build-time only).
 *   - Adds ~30-60s to the build.
 *   - Requires that components handle hydration cleanly (no pure-random IDs,
 *     no Date.now() in render, etc.). React 19 is tolerant of minor
 *     mismatches.
 */

import { promises as fs } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sirv from 'sirv';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.SNAPSHOT_PORT) || 4173;
const CONCURRENCY = Number(process.env.SNAPSHOT_CONCURRENCY) || 3;

/**
 * Canonical routes to snapshot. Must stay in sync with sitemap.xml and
 * `scripts/prerender.mjs`. Blog posts are discovered dynamically below.
 */
const STATIC_ROUTES = [
  '/',
  '/blog',
  '/privacy',
  '/terms',
  '/vs/macrofactor',
];

/** Load blog slugs by compiling src/blog/blogData.ts on the fly. */
async function loadBlogRoutes() {
  const esbuild = await import('esbuild');
  const entry = path.join(ROOT, 'src/blog/blogData.ts');
  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: false,
    format: 'esm',
    platform: 'neutral',
    target: 'es2020',
    write: false,
    loader: { '.ts': 'ts' },
  });
  const js = result.outputFiles[0].text;
  const dataUrl =
    'data:text/javascript;base64,' + Buffer.from(js).toString('base64');
  const mod = await import(dataUrl);
  return mod.blogArticles.map((a) => `/blog/${a.slug}`);
}

function startServer() {
  // `single: true` makes every unknown path fall back to /index.html, which
  // is what our vercel.json rewrite does in production for the SPA.
  const handler = sirv(DIST, { single: true, dev: false, etag: false });
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => handler(req, res));
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function snapshotRoute(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Swallow Tailwind Play CDN's production warning and other noise.
  page.on('console', () => {});
  page.on('pageerror', (err) => {
    console.warn(`[snapshot] pageerror on ${route}:`, err.message);
  });

  const url = `http://127.0.0.1:${PORT}${route}`;

  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 45_000,
  });

  // Hydration has happened when #root has children and there is visible text.
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      if (!root || root.children.length === 0) return false;
      const text = root.innerText || '';
      return text.trim().length > 80;
    },
    { timeout: 20_000 }
  );

  // Let fonts settle so no layout shift is baked into the snapshot.
  await page.evaluate(() => document.fonts && document.fonts.ready);

  // Small buffer for any post-hydration async content (recharts, etc.).
  await new Promise((r) => setTimeout(r, 400));

  const rootHtml = await page.evaluate(() => {
    const root = document.getElementById('root');
    return root ? root.innerHTML : '';
  });

  await page.close();

  if (!rootHtml || rootHtml.length < 200) {
    throw new Error(
      `snapshot for ${route} looks empty (${rootHtml.length} chars)`
    );
  }
  return rootHtml;
}

async function patchRouteFile(route, rootHtml) {
  const relDir = route === '/' ? '' : route.replace(/^\//, '');
  const file = path.join(DIST, relDir, 'index.html');

  let html;
  try {
    html = await fs.readFile(file, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(
        `expected ${path.relative(ROOT, file)} to exist ` +
          `(did you run prerender.mjs first?)`
      );
    }
    throw err;
  }

  // Vite 6 moves the module script into <head>, so the body contains just
  // `<div id="root">...</div>` followed by `</body>`. Replace the whole root
  // div content every time — idempotent for rebuilds and for bare re-runs of
  // this script. Done with indexOf instead of a regex because the root div
  // can be 100+ KB and contain hundreds of `</div>` tags, which causes
  // catastrophic backtracking on `<div id="root">[\s\S]*?</div>` patterns.
  const openTag = '<div id="root">';
  const openIdx = html.indexOf(openTag);
  if (openIdx < 0) throw new Error(`no <div id="root"> in ${file}`);

  const bodyEndIdx = html.indexOf('</body>', openIdx);
  if (bodyEndIdx < 0) throw new Error(`no </body> after #root in ${file}`);

  // Find the last `</div>` before </body> — that's the root's closer.
  const closeIdx = html.lastIndexOf('</div>', bodyEndIdx);
  if (closeIdx < openIdx) throw new Error(`no </div> before </body> in ${file}`);

  html =
    html.slice(0, openIdx) +
    `<div id="root">${rootHtml}</div>` +
    html.slice(closeIdx + '</div>'.length);

  await fs.writeFile(file, html, 'utf8');
  return file;
}

async function processInBatches(items, batchSize, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const settled = await Promise.allSettled(batch.map(fn));
    results.push(...settled);
  }
  return results;
}

async function main() {
  // Vercel (and some other CI images) do not ship NSS/Chromium shared libs that
  // Puppeteer's downloaded Chrome needs — e.g. libnspr4.so — so launch fails
  // with Code 127. Head/meta prerender from prerender.mjs still runs in `npm
  // run build`; this step only bakes hydrated #root HTML for non-JS crawlers.
  // Locally: full `npm run build` still runs snapshots. To force skip anywhere:
  // SKIP_SNAPSHOT=1. To try snapshots on Vercel anyway (custom image with deps):
  // SNAPSHOT_FORCE=1
  if (process.env.SKIP_SNAPSHOT === '1') {
    console.log('[snapshot] skipped: SKIP_SNAPSHOT=1');
    process.exit(0);
  }
  if (process.env.VERCEL === '1' && process.env.SNAPSHOT_FORCE !== '1') {
    console.log(
      '[snapshot] skipped on Vercel (Chromium system libs unavailable in build image). ' +
        'Deploy still includes prerendered head + route HTML shells. ' +
        'For full body snapshots, run `npm run build` locally or `npm run snapshot` after `npm run build:fast`.'
    );
    process.exit(0);
  }

  const blogRoutes = await loadBlogRoutes();
  const routes = [...STATIC_ROUTES, ...blogRoutes];

  console.log(`[snapshot] serving ${path.relative(ROOT, DIST)} on :${PORT}`);
  const server = await startServer();

  console.log('[snapshot] launching chromium');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  let failures = 0;
  try {
    const results = await processInBatches(routes, CONCURRENCY, async (route) => {
      const start = Date.now();
      const rootHtml = await snapshotRoute(browser, route);
      const file = await patchRouteFile(route, rootHtml);
      return {
        route,
        file: path.relative(DIST, file),
        bytes: rootHtml.length,
        ms: Date.now() - start,
      };
    });

    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      const route = routes[i];
      if (r.status === 'fulfilled') {
        const { file, bytes, ms } = r.value;
        const kb = (bytes / 1024).toFixed(1);
        console.log(
          `[snapshot] ${route.padEnd(48)} → dist/${file} (${kb}KB, ${ms}ms)`
        );
      } else {
        failures++;
        console.error(`[snapshot] ${route} FAILED: ${r.reason.message}`);
      }
    }
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }

  if (failures > 0) {
    console.error(`[snapshot] ${failures} route(s) failed`);
    process.exit(1);
  }
  console.log(`[snapshot] done, snapshotted ${routes.length} routes`);
}

main().catch((err) => {
  console.error('[snapshot] failed:', err);
  process.exit(1);
});
