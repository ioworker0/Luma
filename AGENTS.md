# Working on Luma

## What this project is

Luma is a personal collection of HTML visualizations. It starts with linear algebra and can expand into geometry, spaces, transformations, and other mathematical or technical concepts. The homepage is a shared browsing and search entry point; every visualization is an independent webpage.

The user will regularly drop HTML files into this repository. Agents help create, receive, and maintain these pages, keep them working in the browser, and ensure they appear automatically in the homepage catalog.

## What we are building

- Add visualizations under `html/` while preserving existing pages and their URLs.
- Create interactive explanations when requested, using dragging, controls, or animation to help readers explore concepts. Keep the mathematics and explanations accurate.
- Maintain a clear, simple homepage that makes the collection easy to browse.
- Preserve the workflow: add HTML, push to `main`, and automatically update the homepage and GitHub Pages.
- Keep all project content in English: interface text, documentation, comments, and agent instructions.
- The repository and GitHub Pages site are public, as requested by the user. Do not change visibility without authorization.

## File organization

- The root `index.html` is the homepage template. Do not overwrite it with a visualization.
- Put single-file pages in `html/<descriptive-name>.html`; use topic folders as the collection grows.
- Multi-file pages may use `html/<visualization>/index.html` with resources in the same directory. Shared resources may go in `assets/`.
- Other HTML files in the repository root are also discovered, but prefer `html/` for new pages.
- Set a meaningful `<title>` and optionally add `meta[name="description"]` for a short card description.
- Use relative resource paths compatible with the project URL, `https://ioworker0.github.io/Luma/`.
- `scripts/build.mjs` discovers pages, generates the homepage catalog, and copies resources. Do not maintain a manual page list.
- `_site/` is generated publishing output. Never commit it.
- Non-hidden files in `html/` and `assets/` are published. Keep internal documents and credentials out of those directories.

## Technical choices

- Default to native HTML, CSS, and JavaScript, preferably self-contained HTML files.
- Do not introduce Python, npm dependencies, frameworks, a backend, or a database unless a concrete user request needs them.
- Node.js is used only to assemble the static site. The build script uses built-in modules; adding HTML requires no local build.
- Support desktop and mobile layouts, keyboard navigation, readable contrast, and reduced motion preferences.
- Preserve the functionality of user-supplied HTML. Make only the changes needed for the current request.
- Do not invent sample projects to fill the gallery. Show an honest empty state until real visualizations are added.

## Validation and delivery

- For catalog or publishing changes, run `node scripts/build.mjs`. Check discovered pages, links, resources, and removal of stale output.
- For website changes, inspect the actual page and key interactions, including desktop and mobile layouts when relevant.
- For mathematical visualizations, verify important values, edge cases, and interaction behavior, not just whether the page opens.
- Decide whether to commit and push from the user's authorization in the current task. Editing files alone does not imply publishing permission.
- When pushing is authorized, check the GitHub Actions result and report the working website URL.
- Do not add analytics, tracking, or third-party authentication without a user request.
