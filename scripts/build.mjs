import { readdir, readFile, writeFile, mkdir, rm, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '_site');
const pages = [];
const marker = '<!-- LUMA_CATALOG -->';
const publicExtensions = new Set([
  '.html', '.htm', '.css', '.js', '.mjs', '.json', '.svg', '.png', '.jpg',
  '.jpeg', '.gif', '.webp', '.avif', '.ico', '.woff', '.woff2', '.ttf',
  '.otf', '.mp4', '.webm', '.mp3', '.wav', '.ogg', '.wasm', '.csv',
]);

function metadata(source, relative) {
  const title = source.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1];
  let description = '';
  for (const tag of source.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = Object.fromEntries(
      [...tag[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
        .map((match) => [match[1].toLowerCase(), match[2] ?? match[3] ?? match[4]]),
    );
    if (attributes.name?.toLowerCase() === 'description') {
      description = attributes.content ?? '';
      break;
    }
  }
  return {
    title: title?.trim().replace(/\s+/g, ' ') || path.basename(relative, path.extname(relative)),
    description: description.trim().replace(/\s+/g, ' '),
    path: relative,
    url: relative.split('/').map(encodeURIComponent).join('/'),
    collection: relative.startsWith('html/') && relative.split('/').length > 2
      ? relative.split('/')[1] : 'visualization',
  };
}

async function publishFile(source, relative) {
  const destination = path.join(output, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(source, destination);
  if (/\.html?$/i.test(relative) && relative !== 'index.html') {
    pages.push(metadata(await readFile(source, 'utf8'), relative));
  }
}

async function publishDirectory(relative) {
  let entries;
  try {
    entries = await readdir(path.join(root, relative), { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.isSymbolicLink()) continue;
    const child = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) await publishDirectory(child);
    else if (entry.isFile()) await publishFile(path.join(root, child), child);
  }
}

const homepage = await readFile(path.join(root, 'index.html'), 'utf8');
if (homepage.split(marker).length !== 2) {
  throw new Error('index.html must contain exactly one LUMA_CATALOG marker.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await publishDirectory('html');
await publishDirectory('assets');
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && entry.name !== 'index.html' && publicExtensions.has(path.extname(entry.name).toLowerCase())) {
    await publishFile(path.join(root, entry.name), entry.name);
  }
}
pages.sort((a, b) => a.path.localeCompare(b.path, 'en', { numeric: true }));
const catalog = JSON.stringify(pages).replace(/[<>&]/g, (character) => ({
  '<': '\\u003c', '>': '\\u003e', '&': '\\u0026',
})[character]);
await writeFile(path.join(output, 'index.html'), homepage.replace(marker, () => catalog));
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Built Luma: ${pages.length} visualization(s) → _site/`);
