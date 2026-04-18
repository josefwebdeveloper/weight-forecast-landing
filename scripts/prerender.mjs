#!/usr/bin/env node
/**
 * Static prerender for SPA routes.
 *
 * Why this exists: the landing is a Vite + React SPA. A single `dist/index.html`
 * is served for every route, so social-media scrapers and pre-JS search bots
 * always see the root page's canonical, og:url, title, and description. Even
 * Googlebot's staged indexing can end up flagging sub-routes as duplicates of
 * the root until JS-rendering catches up.
 *
 * This post-build step clones `dist/index.html` into per-route files with the
 * correct meta baked in at build time. The React bundle still hydrates on top,
 * so runtime behaviour is unchanged — the prerendered HTML only exists to give
 * non-JS clients (Twitter, LinkedIn, Slack, Discord, Facebook, and Googlebot's
 * first pass) accurate per-page signals.
 *
 * Keeps the footprint small:
 *   - No new npm dependencies (uses the esbuild Vite already ships).
 *   - No server-side rendering (no runtime overhead).
 *   - Only rewrites tags we actually set in `usePageMeta`; other head contents
 *     (JSON-LD, icons, fonts, etc.) are untouched.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');

const SITE_URL = 'https://www.weight-forecast.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Compile blogData.ts with esbuild and import it so we don't duplicate data. */
async function loadBlogArticles() {
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
  const dataUrl = 'data:text/javascript;base64,' + Buffer.from(js).toString('base64');
  const mod = await import(dataUrl);
  return mod.blogArticles;
}

function truncate(str, max = 155) {
  if (!str) return str;
  const clean = str.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Replace or insert a meta/link tag in the head. All mutations target the tag
 * identified by `matcher`; if no match is found, the replacement is appended
 * right before `</head>`.
 */
function upsertTag(html, matcher, replacement) {
  const re = new RegExp(matcher, 'i');
  if (re.test(html)) {
    return html.replace(re, replacement);
  }
  return html.replace(/<\/head>/i, `    ${replacement}\n  </head>`);
}

function applyMeta(template, meta) {
  const {
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage = DEFAULT_OG_IMAGE,
    articlePublishedTime,
    articleSection,
    keywords,
  } = meta;

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description || '');
  const safeCanonical = escapeHtml(canonical);
  const safeOgImage = escapeHtml(ogImage);

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

  html = upsertTag(
    html,
    '<meta\\s+name="title"[^>]*>',
    `<meta name="title" content="${safeTitle}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+name="description"[^>]*>',
    `<meta name="description" content="${safeDesc}" />`
  );
  if (keywords) {
    html = upsertTag(
      html,
      '<meta\\s+name="keywords"[^>]*>',
      `<meta name="keywords" content="${escapeHtml(keywords)}" />`
    );
  }

  html = upsertTag(
    html,
    '<link\\s+rel="canonical"[^>]*>',
    `<link rel="canonical" href="${safeCanonical}" />`
  );

  // Open Graph
  html = upsertTag(
    html,
    '<meta\\s+property="og:type"[^>]*>',
    `<meta property="og:type" content="${ogType}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+property="og:url"[^>]*>',
    `<meta property="og:url" content="${safeCanonical}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+property="og:title"[^>]*>',
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+property="og:description"[^>]*>',
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+property="og:image"[^>]*>',
    `<meta property="og:image" content="${safeOgImage}" />`
  );

  // Twitter
  html = upsertTag(
    html,
    '<meta\\s+name="twitter:url"[^>]*>',
    `<meta name="twitter:url" content="${safeCanonical}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+name="twitter:title"[^>]*>',
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+name="twitter:description"[^>]*>',
    `<meta name="twitter:description" content="${safeDesc}" />`
  );
  html = upsertTag(
    html,
    '<meta\\s+name="twitter:image"[^>]*>',
    `<meta name="twitter:image" content="${safeOgImage}" />`
  );

  if (ogType === 'article') {
    if (articlePublishedTime) {
      html = upsertTag(
        html,
        '<meta\\s+property="article:published_time"[^>]*>',
        `<meta property="article:published_time" content="${escapeHtml(articlePublishedTime)}" />`
      );
    }
    if (articleSection) {
      html = upsertTag(
        html,
        '<meta\\s+property="article:section"[^>]*>',
        `<meta property="article:section" content="${escapeHtml(articleSection)}" />`
      );
    }
  }

  return html;
}

async function writeRouteFile(routePath, html) {
  // Always emit <route>/index.html (even for `/`), keeping behaviour identical
  // to Vite's default `index.html` at the root.
  const outDir =
    routePath === '/' ? DIST : path.join(DIST, routePath.replace(/^\//, ''));
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  await fs.writeFile(outFile, html, 'utf8');
  return path.relative(DIST, outFile);
}

async function main() {
  const template = await fs.readFile(TEMPLATE_PATH, 'utf8');
  const articles = await loadBlogArticles();

  const routes = [
    {
      path: '/',
      meta: {
        title:
          "Weight Forecast — AI Predicts EXACTLY When You'll Hit Your Goal Weight (Free)",
        description:
          '10,847+ people already know their goal date. Our AI analyzes your weight daily and predicts the exact date you\'ll hit your target. Start free in 60 seconds — no credit card needed.',
        canonical: `${SITE_URL}/`,
        ogType: 'website',
      },
    },
    {
      path: '/blog',
      meta: {
        title: 'Weight Forecast Blog — AI, Science & Habits for Sustainable Weight Loss',
        description:
          'Articles on AI-powered weight prediction, evidence-based nutrition, and the habits that keep weight off. New posts every week.',
        canonical: `${SITE_URL}/blog`,
        ogType: 'website',
      },
    },
    {
      path: '/privacy',
      meta: {
        title: 'Privacy Policy — Weight Forecast',
        description:
          'How Weight Forecast handles your health data. Privacy-first: local-first storage, no selling data, GDPR-compliant.',
        canonical: `${SITE_URL}/privacy`,
        ogType: 'website',
      },
    },
    {
      path: '/terms',
      meta: {
        title: 'Terms of Service — Weight Forecast',
        description:
          'Terms of use for the Weight Forecast web app and related services.',
        canonical: `${SITE_URL}/terms`,
        ogType: 'website',
      },
    },
    {
      path: '/vs/macrofactor',
      meta: {
        title: 'Weight Forecast vs MacroFactor — Free AI Prediction vs $72/yr Macro Coach',
        description:
          'Side-by-side comparison: AI weight prediction, adaptive coaching, and pricing. Weight Forecast is free; MacroFactor is $72/yr.',
        canonical: `${SITE_URL}/vs/macrofactor`,
        ogType: 'website',
        keywords:
          'weight forecast vs macrofactor, macrofactor alternative, free macro tracker, ai calorie coach',
      },
    },
  ];

  // Add one route per blog article.
  for (const article of articles) {
    routes.push({
      path: `/blog/${article.slug}`,
      meta: {
        title: `${article.title} — Weight Forecast Blog`,
        description: truncate(article.metaDescription, 160),
        canonical: `${SITE_URL}/blog/${article.slug}`,
        ogType: 'article',
        articlePublishedTime: article.date,
        articleSection: article.category,
      },
    });
  }

  const written = [];
  for (const route of routes) {
    const html = applyMeta(template, route.meta);
    const rel = await writeRouteFile(route.path, html);
    written.push({ path: route.path, file: rel });
  }

  console.log(`[prerender] wrote ${written.length} files:`);
  for (const w of written) {
    console.log(`  ${w.path.padEnd(48)} → dist/${w.file}`);
  }
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
