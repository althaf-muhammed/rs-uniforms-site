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

## Publish on GitHub Pages

1. Create an empty repository on GitHub, without a README.
2. Connect it and push, replacing the address with your own:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. On GitHub, open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then branch `main` and folder `/ (root)`, and save.
4. The site appears at `https://YOUR-USERNAME.github.io/YOUR-REPO/` within a few minutes.
5. In the `<head>` of `index.html`, uncomment the `og:image` lines and put in your site address, so links shared on WhatsApp show a picture. Commit and push.

All links in the site are relative, so it works from a repository subfolder or a custom domain.

## Common changes

- **Phone number:** search `index.html` for `9742324242`, and change `WHATSAPP_NUMBER` at the top of `js/main.js`.
- **Enquiry form:** it opens WhatsApp with the message filled in. The site has no server, so nothing is stored.
