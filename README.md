# GDG on Campus · Mercy University

Official website for the GDG on Campus chapter at Mercy University. It is a plain static site: hand-written HTML, CSS and a little vanilla JS. There is no framework and no build step.

```
index.html  about.html  events.html  gallery.html  team.html  join.html
css/theme.css   shared design tokens and components (from gdgmercy/workshop2)
css/site.css    page layouts for this site
js/site.js      mobile menu, active link, header theme, year, gallery lightbox
assets/         logo, favicon, gallery/ placeholder images
.nojekyll       tells GitHub Pages to serve files as-is
```

All paths are relative (`assets/...`, `about.html`), so the site works from any sub-path such as `username.github.io/<repo>/`.

## Preview locally

Any static server works. From the repo root:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000/>. (Opening `index.html` by double-click also works, because the icons are inlined, but a server matches production more closely.)

## Deploy to GitHub Pages

1. Create a repository on GitHub and push this folder to the `main` branch.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<username>.github.io/<repo>/`.

## Updating content

- **Events:** each event is one `<li class="event">` block in `events.html`. To retire an event, move its block into the *Past events* list, add `past` to its class, replace its tags with `<span class="tag">Recap</span>`, and drop the time and place lines. The Home page repeats the two upcoming events, so update `index.html` too.
- **Gallery:** drop images in `assets/gallery/`, then edit the `<a class="g-item">` blocks in `gallery.html` (see the HTML comments there). The lightbox picks up any block that has `data-lightbox`. To add the featured video, follow the comment in the video section.
- **Team photos:** each team card has a comment showing the `<img class="avatar">` line to swap in for the initial avatar. Put photos in `assets/team/` (about 300×300, square).
- **Social preview image:** `og:image` is a relative path so the site works at any URL. Some social networks ignore relative image URLs. Once the final URL is known, change the `og:image` tag on each page to the full address, for example `https://<username>.github.io/<repo>/assets/gdg-mercy-logo-512.webp`.

## Design system

`css/theme.css` is copied unchanged from [gdgmercy/workshop2](https://github.com/gdgmercy/workshop2), so tokens and components (`.topbar`, `.brand`, `.btn`, `.tag`, `.note`) stay consistent across GDG Mercy sites. Put anything specific to this site in `css/site.css`.

*GDG on Campus Mercy University is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.*
