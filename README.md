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

Published with GitHub Pages from the `main` branch, so pushing to `main` updates the site within a few minutes. Keep the `CNAME` file in the repository, because it holds the custom domain.

## Common changes

- **Phone number:** update the `tel:` and `wa.me` links in `index.html` and the number shown on the page, and change `WHATSAPP_NUMBER` at the top of `js/main.js`.
- **Enquiry form:** it opens WhatsApp with the message filled in. The site has no server, so nothing is stored.
