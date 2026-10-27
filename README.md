# Octonary Robotics — Public engineering overview

A static project introduction for GitHub Pages. It uses HTML, CSS and supplied brand assets, with no build dependencies or client-side JavaScript. Visitors choose a language and follow the main website button; there is no automatic redirect.

## Pages

- English: /
- Deutsch: /de.html
- 简体中文: /zh.html

The organization-site address is https://octonary-robotics.github.io/ . Each page has a self-referencing canonical URL, reciprocal language alternatives, and a matching-language link to the main website at https://octonary-robotics.pages.dev/ .

## Content

The engineering overview is based on the [public organization profile](https://github.com/octonary-robotics/.github): tendon-driven robotic tentacles, mechanical structures, embedded control, software tools and testing. Repository links point only to public organization resources. The large illustration is a brand symbol, not a hardware photograph.

## Maintenance

Edit index.html, de.html and zh.html together when changing content. site.css controls the shared responsive layout. All published files are at the repository root, so they can be uploaded without a build step. Keep .nojekyll, robots.txt and sitemap.xml in place. Update canonical, alternate and sitemap URLs if the domain changes.

To preview with an installed Python runtime, run:

    python -m http.server 4197 --bind 127.0.0.1

Open http://127.0.0.1:4197/ . Do not validate root-relative assets by double-clicking HTML files.

## Publishing

Use GitHub Pages with main and / (root). GitHub publishes committed static files automatically after Pages is enabled. The main sales and inquiry website is maintained separately.
