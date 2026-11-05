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

The site is live at https://rsuniforms.in, published with GitHub Pages from the `main` branch. Pushing to `main` updates it within a few minutes.

- **Pages settings:** in **Settings > Pages**, the source is **Deploy from a branch**, with branch `main` and folder `/ (root)`. **Enforce HTTPS** is on.
- **Domain:** the `CNAME` file holds the custom domain, so keep it in the repository. DNS is managed at GoDaddy: four `A` records for `@` point to GitHub Pages, and a `www` `CNAME` points to `althaf-muhammed.github.io`.
- **If the domain changes:** update the `og:url` and `og:image` lines in the `<head>` of `index.html`, so links shared on WhatsApp keep showing a picture. All other links in the site are relative.

## Common changes

- **Phone number:** search `index.html` for `9742324242`, and change `WHATSAPP_NUMBER` at the top of `js/main.js`.
- **Enquiry form:** it opens WhatsApp with the message filled in. The site has no server, so nothing is stored.
