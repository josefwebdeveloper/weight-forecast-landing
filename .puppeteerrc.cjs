/**
 * Puppeteer config — keep the Chromium binary inside `node_modules/` so
 * Vercel's build cache persists it between deploys. Without this, Puppeteer
 * would download ~170MB of Chromium to `~/.cache/puppeteer` on every deploy,
 * since Vercel does not preserve that directory.
 */
const { join } = require('node:path');

/** @type {import('puppeteer').Configuration} */
module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};
