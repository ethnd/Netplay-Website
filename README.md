# NetPlay Website

This folder contains the complete static website for NetPlay, including the latest-update summary, Student and Instructor role summaries, searchable game details, gameplay systems, download area, and system requirements.

## Preview the website

Open a terminal in this folder and run a local web server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Windows game download

The download button points to the official NetPlay v1.17.1.50 package on GitHub Releases. The large game ZIP is intentionally kept outside the website deployment.

## Main files

- `index.html` — page content and search-ready game details
- `style.css` — responsive dark/gold pixel-game presentation
- `script.js` — navigation, tabs, detail search, animations, and download detection
- `assets/` — original NetPlay game screenshots used by the website
- `sitemap.xml` and `robots.txt` — search-engine discovery files
- `netlify.toml` — Netlify publish and header settings

## Editing notes

- Update the GitHub release URL in `index.html` whenever a new Windows build is published.
- Replace NetPlay screenshots in `assets/` while keeping their current file names to avoid changing the HTML.
- The website uses only HTML, CSS, and JavaScript, so no build command is required.
