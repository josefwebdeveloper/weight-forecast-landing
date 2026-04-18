---
name: list-articles
version: 1.0.0
description: List Weight Forecast blog articles (title, slug, date, category, excerpt) for agent-assisted content discovery.
---

# Skill: List Articles

Returns metadata for every article published on the Weight Forecast blog.
Content is static, bundled with the site; no authentication is required.

## Inputs

| Field     | Type     | Required | Notes |
|-----------|----------|----------|-------|
| `category`| `string` | no | Filter by category (case-insensitive substring match). |
| `limit`   | `integer`| no | Max number of articles to return (default: all). |

## Output

```json
{
  "count": 6,
  "articles": [
    {
      "slug": "ai-weight-prediction-exact-date",
      "title": "Stop Guessing \"When?\"",
      "date": "2026-03-28",
      "readTime": "6 min read",
      "category": "AI & Technology",
      "url": "https://www.weight-forecast.com/blog/ai-weight-prediction-exact-date",
      "excerpt": "..."
    }
  ]
}
```

## Browser

Exposed via WebMCP as `weight-forecast.listArticles`. Safe to call without
sign-in.

## HTTP

Each article is addressable at
`https://www.weight-forecast.com/blog/<slug>`. A markdown mirror is available
on request via `Accept: text/markdown`.
