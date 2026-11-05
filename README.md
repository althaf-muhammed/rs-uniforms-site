# R&S Uniforms website

The company website for R&S Uniforms, Bangalore. Plain HTML, CSS and JavaScript, with no build step. All wording, colours, fonts and illustrations come from the 2026 company profile.

```
index.html      the page
css/style.css   styles (colours and fonts are set at the top)
js/main.js      menu, animations, WhatsApp enquiry form
assets/         illustrations (SVG), favicon, share image, brochure PDF
.nojekyll       tells GitHub Pages to serve the files as they are
```

## Preview on your computer

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123.

## Publishing

The site is published with GitHub Pages from the `main` branch, at https://althaf-muhammed.github.io/rs-uninforms-site/. Pushing to `main` updates it within a few minutes.

To set this up again, open **Settings > Pages** on GitHub, choose **Deploy from a branch**, then branch `main` and folder `/ (root)`.

If the site address changes, update the `og:url` and `og:image` lines in the `<head>` of `index.html`, so links shared on WhatsApp keep showing a picture.

All other links in the site are relative, so it works from a repository subfolder or a custom domain.

## Common changes

- **Phone number:** search `index.html` for `9742324242`, and change `WHATSAPP_NUMBER` at the top of `js/main.js`.
- **Enquiry form:** it opens WhatsApp with the message filled in. The site has no server, so nothing is stored.
