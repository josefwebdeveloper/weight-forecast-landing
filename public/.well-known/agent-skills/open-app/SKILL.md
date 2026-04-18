---
name: open-app
version: 1.0.0
description: Open the Weight Forecast application (signed-in area) in the user's browser to start tracking weight or view their forecast.
---

# Skill: Open App

Directs the user from the marketing landing page to the real Weight Forecast
application where sign-in and data entry happen.

## Inputs

| Field   | Type     | Required | Notes |
|---------|----------|----------|-------|
| `view`  | `string` | no       | One of `dashboard`, `log`, `charts`, `blog`. Defaults to `dashboard`. |
| `utm`   | `string` | no       | Optional UTM campaign tag to attach. |

## Browser behaviour

On the landing page (`https://www.weight-forecast.com/`), this skill is
exposed via WebMCP as `weight-forecast.openApp` and performs a navigation to
the application entry point with the requested view hash appended.

## HTTP fallback

There is no REST endpoint for this action; it's a pure client-side
navigation. Agents running outside the browser can simply open:

```
https://weight-forecast.com/#/<view>
```
