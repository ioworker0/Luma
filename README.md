# Luma

Abstract ideas. Visible form.

A growing collection of HTML visualizations, starting with linear algebra and expanding into geometry, spaces, transformations, and other ideas worth exploring.

- Website: <https://ioworker0.github.io/Luma/>
- Repository: <https://github.com/ioworker0/Luma>

## Add a visualization

Drop an HTML file into `html/`, commit it, and push to `main`. GitHub Actions automatically discovers the pages, updates the homepage, and deploys to GitHub Pages. No manual link list is needed.

```text
html/
  vector-projection.html
  linear-algebra/
    matrix-transform.html
    images/
      diagram.svg
```

Keep each visualization independent. Place its CSS, JavaScript, images, and other resources alongside the HTML file and reference them with relative paths. Additional `.html` and `.htm` files in the repository root are also discovered; the root `index.html` is reserved for the homepage.

The homepage uses each page's `<title>` as its display name, falling back to the filename. An optional `<meta name="description" content="...">` supplies the card description. Search matches titles, descriptions, and paths.

```html
<title>Vector projection</title>
<meta name="description" content="Drag a vector to explore its projection onto another direction.">
```

The website uses plain HTML, CSS, and JavaScript. No Python, npm packages, or frontend framework is required. Adding HTML files does not require a local build.

## Local preview (optional)

With Node.js 22 or later installed:

```sh
node scripts/build.mjs
```

Open `_site/index.html` in a browser. Visualizations that use `fetch`, module scripts, or other HTTP features need a local static server, such as your editor's Live Server, serving `_site/`.

## Structure

```text
index.html                  Homepage template and search
html/                       Visualizations and their resources
assets/                     Optional shared static resources
scripts/build.mjs           Catalog generation and site assembly
.github/workflows/pages.yml Automatic deployment
AGENTS.md                   Instructions for working agents
_site/                      Generated output; not committed
```

The published site contains the homepage, `html/`, `assets/`, and supported static files from the repository root. Project documentation, agent instructions, and build scripts are excluded from the website.

## Deployment

Both the repository and the website are public. GitHub Pages uses **GitHub Actions** as its publishing source. Every push to `main` deploys automatically; **Deploy Luma** can also be run manually from the Actions tab.

Everything in the project, including documentation, interface copy, and agent instructions, should be written in English.
