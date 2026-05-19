# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for Motorfluggruppe Thurgau (MFGT), a Swiss flying club. Built with Hugo, deployed on Netlify. Content is managed via Netlify CMS, which commits Markdown files back to the `master` branch via git-gateway.

## Commands

```bash
# Development server with live reload
hugo server

# Build for production
hugo

# Build with drafts visible
hugo server -D
```

Hugo's `+extended` variant is required (for SCSS support) — the standard binary won't work. The installed version at `/usr/bin/hugo` is already extended.

There are no npm scripts, webpack, or test suites — this is a pure Hugo project.

## Architecture

**Content** lives in `content/` as Markdown with YAML front matter. Sections map directly to URL paths (e.g. `content/flugschule/` → `/flugschule/`).

**Templates** follow Hugo's standard lookup order:
- `layouts/index.html` — homepage
- `layouts/_default/baseof.html` — base template (nav, head, footer wired in here)
- `layouts/_default/section.html` — section index pages
- `layouts/_default/single.html` — individual pages
- `layouts/partials/` — reusable components injected via `{{ partial "name.html" . }}`

**Styling** uses SCSS in `assets/scss/`, processed through Hugo pipes (`toCSS | postCSS | minify | fingerprint`). Each partial has a corresponding `_*.scss` file imported via `assets/scss/main.scss`.

**JavaScript** is plain jQuery, loaded from `static/js/`. The main file is `static/js/custom.js`. Third-party libraries (Slick carousel, Simple Lightbox) are vendored as pre-minified files — do not replace them with npm packages.

**Static assets** (images, pre-built CSS, favicons) are in `static/` and copied verbatim to the build output.

## Netlify CMS

The CMS configuration at `static/admin/config.yml` defines all editable collections and fields. When adding new content sections or front matter fields:
1. Update `static/admin/config.yml` to expose the field in the CMS editor
2. Update the relevant Hugo template/partial to render it

The CMS writes to the `master` branch directly — there is no staging branch.

## Navigation & Menus

Top-level navigation is defined in `config.toml` under `[menu]`. Section order is controlled by `weight`. Subsection links within pages come from the content's own front matter buttons or the `sections` partial iterating over child pages.

## Content Front Matter

Typical front matter for a page:

```yaml
---
title: "Page Title"
date: 2024-01-01
draft: false
coverImage: "/img/cover/example.jpg"
coverImagePosition: "50% 30%"
---
```

`coverImagePosition` is a CSS `background-position` value used in the header image partial.

## Airport Status API

`static/js/custom.js` calls `https://api.mfgt.ch/api/v1/aerodromestatus` to display real-time runway status. This is an external backend separate from this repo.
