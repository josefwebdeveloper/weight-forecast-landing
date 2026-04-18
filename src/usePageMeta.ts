import { useEffect } from 'react';

export interface PageMetaOptions {
  title: string;
  description?: string;
  canonical: string; // absolute URL, e.g. https://www.weight-forecast.com/blog
  ogImage?: string; // absolute URL
  ogType?: 'website' | 'article';
  // For article pages we also emit article:published_time and article:section
  articlePublishedTime?: string; // ISO date
  articleSection?: string;
  // Extra meta keywords. Appended (not replacing) so landing defaults stay intact.
  keywords?: string;
}

const DEFAULT_TITLE = "Weight Forecast — AI Predicts EXACTLY When You'll Hit Your Goal Weight (Free)";
const DEFAULT_DESCRIPTION = '🎯 10,847+ people already know their goal date! Our AI analyzes your weight daily and predicts the EXACT date you\'ll hit your target. Start free in 60 seconds — no credit card needed.';
const DEFAULT_OG_IMAGE = 'https://www.weight-forecast.com/og-image.png';

/**
 * Per-route meta updater. The landing is a client-rendered SPA, so social
 * bots (Twitter/Facebook/Slack/LinkedIn) still see `index.html` defaults, but
 * Google's renderer *does* execute JS and will pick up these updates for
 * indexing. Keep this in mind before relying on it for OG cards in the wild
 * — pre-rendering is the only true fix for that.
 */
export function usePageMeta(opts: PageMetaOptions): void {
  useEffect(() => {
    const {
      title,
      description,
      canonical,
      ogImage = DEFAULT_OG_IMAGE,
      ogType = 'website',
      articlePublishedTime,
      articleSection,
      keywords,
    } = opts;

    const prevTitle = document.title;
    document.title = title;

    setMeta('name', 'description', description || DEFAULT_DESCRIPTION);
    setMeta('name', 'title', title);
    if (keywords) setMeta('name', 'keywords', keywords);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description || DEFAULT_DESCRIPTION);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description || DEFAULT_DESCRIPTION);
    setMeta('name', 'twitter:url', canonical);
    setMeta('name', 'twitter:image', ogImage);

    if (ogType === 'article') {
      if (articlePublishedTime) setMeta('property', 'article:published_time', articlePublishedTime);
      if (articleSection) setMeta('property', 'article:section', articleSection);
    }

    // Canonical link
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    return () => {
      // Restore only the title — other meta tags are cheap to let the next
      // page overwrite, and avoids flashing the default in between routes.
      document.title = prevTitle || DEFAULT_TITLE;
    };
  }, [opts]);
}

function setMeta(attr: 'name' | 'property', key: string, value: string): void {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}
