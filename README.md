# Octonary Robotics — Public engineering overview

A static project introduction for GitHub Pages. It uses HTML, CSS, supplied brand assets and a small optional JavaScript motion layer, with no build dependencies or backend. Visitors choose a language and follow the main website button; there is no automatic redirect.

## Pages

- English: /
- Deutsch: /de.html
- 简体中文: /zh.html

The organization-site address is https://octonary-robotics.github.io/ . Each page has a self-referencing canonical URL, reciprocal language alternatives, and a matching-language link to the main website at https://octonary-robotics.pages.dev/ .

## Content

The engineering overview is based on the [public organization profile](https://github.com/octonary-robotics/.github): tendon-driven robotic tentacles, mechanical structures, embedded control, software tools and testing. Repository links point only to public organization resources. The large illustration is a brand symbol, not a hardware photograph.

## Maintenance

Edit index.html, de.html and zh.html together when changing content. site.css controls the shared responsive layout. All published files are at the repository root, so they can be uploaded without a build step. Keep .nojekyll, robots.txt and sitemap.xml in place. Update canonical, alternate and sitemap URLs if the domain changes.

motion.js adds single-play content reveals and desktop pointer tilt. CSS animates the brand symbol, orbit marker and scan line. The localized button pauses the effects; the operating system's reduced-motion preference disables them automatically. Hero loops pause when off screen or when the tab is hidden. All content and links remain available without JavaScript. No animation libraries, external requests, cookies or tracking are added.

To preview with an installed Python runtime, run:

    python -m http.server 4197 --bind 127.0.0.1

Open http://127.0.0.1:4197/ . Do not validate root-relative assets by double-clicking HTML files.

## Publishing

Use GitHub Pages with main and / (root). GitHub publishes committed static files automatically after Pages is enabled. The main sales and inquiry website is maintained separately.

## Google Search Console

The URL-prefix property is `https://octonary-robotics.github.io/`. Keep `google6bf5ceadffdb8de0.html` unchanged at the repository root to support ownership verification, including after Google confirms it. The site's own sitemap is `https://octonary-robotics.github.io/sitemap.xml` and lists the English, German and Chinese introduction pages. Verification and sitemap submission do not by themselves confirm search indexing.

## Bing Webmaster Tools

Keep the `msvalidate.01` verification meta tag unchanged inside the `index.html` head, including after Bing confirms ownership. The same three-page sitemap can be submitted to Bing. Ownership verification and URL submission do not by themselves confirm search indexing.
