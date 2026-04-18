// WebMCP bridge for the Weight Forecast marketing landing
// (www.weight-forecast.com). Registers agent-accessible tools on page load
// using the experimental `navigator.modelContext.provideContext` API
// (https://webmachinelearning.github.io/webmcp/).
//
// Tools on the landing are read-only and do not require auth. They help AI
// agents surface site content (blog articles) and bounce the user into the
// real app at https://weight-forecast.com/.

import { blogArticles, type BlogArticle } from './blog/blogData';

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: any) => Promise<unknown>;
};

type WebMCPContext = {
  provideContext: (context: { tools: WebMCPTool[] }) => Promise<void> | void;
};

declare global {
  interface Navigator {
    modelContext?: WebMCPContext;
  }
}

const APP_ORIGIN = 'https://weight-forecast.com';

const summarizeArticle = (a: BlogArticle) => ({
  slug: a.slug,
  title: a.title,
  date: a.date,
  readTime: a.readTime,
  category: a.category,
  excerpt: a.excerpt,
  url: `https://www.weight-forecast.com/blog/${a.slug}`,
});

const tools: WebMCPTool[] = [
  {
    name: 'weight-forecast.openApp',
    description:
      "Open the Weight Forecast application (signed-in area) in the user's browser. " +
      'Use when the user wants to start tracking their weight or see their forecast.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        view: {
          type: 'string',
          enum: ['dashboard', 'log', 'charts', 'blog'],
          default: 'dashboard',
          description: 'Which area of the app to land on.',
        },
        utm: {
          type: 'string',
          maxLength: 64,
          description: 'Optional UTM campaign tag to attach to the link.',
        },
      },
    },
    async execute(input: { view?: string; utm?: string }) {
      const view = input?.view ?? 'dashboard';
      const params = new URLSearchParams();
      if (view === 'blog') {
        // Keep the user on the marketing site for the blog.
        const target = new URL('/blog', 'https://www.weight-forecast.com');
        if (input?.utm) params.set('utm_campaign', input.utm);
        if ([...params.keys()].length) target.search = params.toString();
        if (typeof window !== 'undefined') window.location.assign(target.toString());
        return { ok: true, navigatedTo: target.toString() };
      }
      const target = new URL(APP_ORIGIN);
      target.hash = `#${view}`;
      if (input?.utm) {
        target.searchParams.set('utm_campaign', input.utm);
      }
      if (typeof window !== 'undefined') window.location.assign(target.toString());
      return { ok: true, navigatedTo: target.toString() };
    },
  },
  {
    name: 'weight-forecast.listArticles',
    description:
      'List Weight Forecast blog articles (title, slug, date, category, excerpt). ' +
      'Content is static and public; no authentication required.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        category: {
          type: 'string',
          maxLength: 100,
          description: 'Case-insensitive substring filter on category.',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 100,
          description: 'Maximum number of articles to return.',
        },
      },
    },
    async execute(input: { category?: string; limit?: number }) {
      const needle = (input?.category ?? '').trim().toLowerCase();
      const filtered = needle
        ? blogArticles.filter((a) => a.category.toLowerCase().includes(needle))
        : blogArticles.slice();
      const limit =
        typeof input?.limit === 'number' ? Math.min(Math.max(input.limit, 1), 100) : filtered.length;
      return {
        count: filtered.length,
        articles: filtered.slice(0, limit).map(summarizeArticle),
      };
    },
  },
  {
    name: 'weight-forecast.readArticle',
    description:
      'Return the full text of a Weight Forecast blog article by its slug. ' +
      'Discover slugs via weight-forecast.listArticles.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      required: ['slug'],
      properties: {
        slug: {
          type: 'string',
          pattern: '^[a-z0-9-]+$',
          minLength: 1,
          maxLength: 120,
          description: 'The article slug, e.g. "ai-weight-prediction-exact-date".',
        },
      },
    },
    async execute(input: { slug: string }) {
      const article = blogArticles.find((a) => a.slug === input.slug);
      if (!article) {
        throw new Error(
          `Unknown article slug "${input.slug}". Use weight-forecast.listArticles to enumerate valid slugs.`,
        );
      }
      return {
        ...article,
        url: `https://www.weight-forecast.com/blog/${article.slug}`,
      };
    },
  },
];

let registered = false;

export const registerWebMCPTools = (): void => {
  if (registered) return;
  if (typeof window === 'undefined') return;
  if (!navigator?.modelContext?.provideContext) {
    // WebMCP not implemented in this browser — progressive enhancement.
    return;
  }
  try {
    const maybePromise = navigator.modelContext.provideContext({ tools });
    Promise.resolve(maybePromise).catch((error) => {
      console.warn('[WebMCP] provideContext rejected:', error);
    });
    registered = true;
  } catch (error) {
    console.warn('[WebMCP] registration failed:', error);
  }
};

export const webmcpTools = tools;
