---
name: read-article
version: 1.0.0
description: Return the full text of a Weight Forecast blog article by slug, including title, date, category, reading time and body.
---

# Skill: Read Article

Fetch one article by its stable slug. All article content is public.

## Inputs

| Field  | Type     | Required | Notes |
|--------|----------|----------|-------|
| `slug` | `string` | yes | The article slug, e.g. `ai-weight-prediction-exact-date`. |

Discoverable slugs: use the `list-articles` skill first, or `GET
/.well-known/agent-skills/index.json` and then `list-articles`.

## Output

```json
{
  "slug": "ai-weight-prediction-exact-date",
  "title": "...",
  "metaDescription": "...",
  "date": "2026-03-28",
  "readTime": "6 min read",
  "category": "AI & Technology",
  "url": "https://www.weight-forecast.com/blog/ai-weight-prediction-exact-date",
  "content": "<html-fragment>"
}
```

## Browser

Exposed via WebMCP as `weight-forecast.readArticle`.

## HTTP

Agents outside the browser can fetch the rendered article at
`https://www.weight-forecast.com/blog/<slug>` with `Accept: text/html` (or
`Accept: text/markdown` to get the markdown form via the site's
markdown-negotiation middleware).
