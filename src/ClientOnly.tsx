import React, { useEffect, useState } from 'react';

/**
 * Renders `children` only after the component has mounted on the client.
 *
 * Needed because the landing page ships as a prerendered HTML snapshot (see
 * `scripts/snapshot.mjs`) and then re-uses it via `ReactDOM.hydrateRoot`.
 * Components that depend on `Date.now()`, `Math.random()`, `window.*`, or any
 * browser-only layout measurement produce different output at snapshot time
 * vs. at hydration time — that mismatch breaks hydration and either warns in
 * dev or forces React to throw away the server tree in production.
 *
 * Wrapping such components in <ClientOnly> makes the first client render
 * return `fallback` (which is what we WANT to also be in the snapshot), and
 * only after `useEffect` runs does it swap in the real, dynamic children.
 *
 * Important: the snapshot captures the DOM *after* hydration+effects have
 * run (Puppeteer waits for visible text). For components where we'd rather
 * ship a static, deterministic placeholder in the HTML payload, the caller
 * is responsible for making sure `fallback` matches the static content.
 */
interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, fallback = null }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <>{mounted ? children : fallback}</>;
};

export default ClientOnly;
