# Code Island — marketing site

The landing page for [Code Island](https://github.com/fauzannadhif/code-island-ubuntu),
a live dashboard for Claude Code (macOS notch + Ubuntu floating island).

A single static page — no build step, no dependencies. Inspired in spirit by
[Vibe Island](https://vibeisland.app/).

## Structure

```
.
├── index.html      ← all the markup (hero, features, how-it-works, platforms, FAQ)
├── styles.css      ← dark notch-themed styles (purple / terracotta / cyan)
├── app.js          ← starfield, pixel-crab mascot canvases, looping island demo
└── assets/
    ├── logo.png
    └── favicon.png
```

## Run locally

It's plain static files — open `index.html`, or serve it:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

Any static host works. For **GitHub Pages**: push to a repo and enable Pages on the
`main` branch (root). For Netlify/Vercel/Cloudflare Pages: point them at the repo with
no build command and the root as the publish directory.

## Editing

- Copy lives directly in `index.html`.
- Brand colors are CSS variables at the top of `styles.css` (`--terracotta`, `--cyan`,
  `--purple`, …).
- The hero "island" is a pure HTML/CSS recreation; its states cycle in `app.js`
  (`islandDemo`). The crab mascot is drawn on `<canvas>` in `drawMascot`.

## License

Personal, non-commercial use only — same as the app. The pixel mascot is adapted from
the Claude Code mascot generator.
