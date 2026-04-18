# Weight Forecast — AI Predicts When You'll Hit Your Goal Weight

> Stop guessing "when?". Weight Forecast uses AI to turn your daily weigh-ins
> into a concrete calendar date for hitting your target — and keeps that date
> up to date as life happens.

- **Landing:** <https://www.weight-forecast.com/>
- **App:** <https://weight-forecast.com/>
- **API base:** <https://node-log-weight-tennisappservicegmailcoms-projects.vercel.app>
- **This markdown view:** `GET /` with `Accept: text/markdown` (or `GET /index.md`)

## What it does

Weight Forecast is a free web app (installable PWA) for people trying to
reach a specific body weight. It:

- Logs morning / afternoon / evening weight, calories, sleep and workouts.
- Runs linear regression over the user's history to project **the exact
  date** they'll hit their goal weight.
- Updates the projected date on every new data point, so the finish line
  moves in response to real behaviour.
- Visualises 7 / 30 / 90-day trends with live BMI context.
- Works offline; data syncs when the device is back online.
- Integrates with Strava and Garmin for activity correlation.

## For AI agents

This site publishes machine-readable discovery endpoints:

| Purpose                         | URL                                                     |
|---------------------------------|---------------------------------------------------------|
| API catalog (RFC 9727)          | `/.well-known/api-catalog`                              |
| OpenAPI description             | `/openapi.yaml`                                         |
| Agent skills index              | `/.well-known/agent-skills/index.json`                  |
| Markdown alternate of this page | `/index.md`                                             |
| Content usage signals           | `/robots.txt` — see `Content-Signal`                    |
| In-page tools                   | `navigator.modelContext` (WebMCP) on page load          |

## WebMCP tools exposed on this page

- **`weight-forecast.openApp`** — navigate the user to the real application.
- **`weight-forecast.listArticles`** — enumerate the blog (6 long-form
  articles on AI prediction, plateaus, voice food logging, AI vs personal
  trainer, Garmin integration).
- **`weight-forecast.readArticle`** — fetch one article by slug.

## Content usage

The site declares Content Signals in `/robots.txt`:

```
Content-Signal: search=yes, ai-train=no, ai-input=yes
```

Search indexing and grounded / RAG-style citations are welcome; training
generative models on this content is **not** permitted.

## FAQ

**How accurate is the AI weight prediction?**
Linear regression over the user's history. After two weeks of consistent
daily logging, predictions are typically within 0.5 kg.

**Is it free?** Yes, no hidden fees, all features included.

**Can I track weight multiple times per day?** Yes — morning, afternoon, and
evening slots are supported.

**Does it work offline?** Yes; it's a PWA with local storage and
background sync.
