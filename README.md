# NetPlay Website

This folder contains the complete static website for NetPlay, including the updated Instructor tools, student retry-request workflow, written instructor guide, searchable game details, creative inspirations, download area, and system requirements.

## Preview the website

Open a terminal in this folder and run a local web server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Add the Windows game

1. Open the `downloads` folder.
2. Add the complete game ZIP using the exact file name `NetPlay-Windows-v1.17.1.50.zip`.
3. Preview or deploy the website through a web server.

The download button checks for that file and activates automatically when it is available.

## Main files

- `index.html` — page content and search-ready game details
- `style.css` — responsive dark/gold pixel-game presentation
- `script.js` — navigation, tabs, detail search, animations, and download detection
- `assets/` — game screenshots and inspiration references
- `sitemap.xml` and `robots.txt` — search-engine discovery files
- `netlify.toml` — Netlify publish and header settings

## Editing notes

- Keep the game ZIP name unchanged unless the `data-download-path` in `index.html` and the download file name in `script.js` are updated together.
- Replace screenshots in `assets/` while keeping their current file names to avoid changing the HTML.
- The website uses only HTML, CSS, and JavaScript, so no build command is required.
