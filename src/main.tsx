import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Privacy from './Privacy';
import Terms from './Terms';
import BlogIndex from './blog/BlogIndex';
import BlogPost from './blog/BlogPost';
import VsMacroFactor from './VsMacroFactor';
import { registerWebMCPTools } from './webmcp';

registerWebMCPTools();

const rootEl = document.getElementById('root')!;

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/vs/macrofactor" element={<VsMacroFactor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// When the HTML was produced by `scripts/snapshot.mjs`, the document root has
// `data-prerendered="true"` and `#root` already contains the fully rendered
// tree for the current route. Hydrating over that snapshot preserves the LCP
// paint and avoids a flash of blank content for real users on slow networks —
// crucial because Googlebot's first-pass indexer does not execute JS, and
// social scrapers (Twitter/Slack/Discord/LinkedIn) don't execute JS at all.
//
// For the dev server (`vite dev`) there is no prerendered body, so we fall
// back to a normal `createRoot().render()`.
if (document.documentElement.getAttribute('data-prerendered') === 'true') {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}
