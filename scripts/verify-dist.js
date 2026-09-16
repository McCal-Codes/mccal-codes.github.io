/**
 * Independent check that `dist` is publishable. Run by CI and before deploy.
 *
 * Paths are listed literally rather than imported from `emit-route-pages.js`:
 * a check that imports what it checks fails open when that thing breaks.
 */

import { readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const REQUIRED = [
  'index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'notes/index.html',
  'roadmap/index.html',
  'about/index.html',
  'projects/terranova/index.html',
  'projects/abridgd/index.html',
];

/** These redirect to '/', so serving them as pages would mislead crawlers. */
const MUST_NOT_EXIST = ['projects/folio/index.html'];

const problems = [];

for (const path of REQUIRED) {
  try {
    if (statSync(join(dist, path)).size === 0) problems.push(`dist/${path} is empty`);
  } catch {
    problems.push(`dist/${path} is missing`);
  }
}

for (const path of MUST_NOT_EXIST) {
  try {
    statSync(join(dist, path));
    problems.push(`dist/${path} should not be pre-rendered`);
  } catch {
    /* expected */
  }
}

// The CSP is the site's only remaining security control. Check a route page.
try {
  const page = readFileSync(join(dist, 'notes/index.html'), 'utf8');
  if (!page.includes('http-equiv="Content-Security-Policy"')) {
    problems.push('dist/notes/index.html has no CSP meta tag');
  }
  if (!page.includes('rel="canonical" href="https://mccal-codes.github.io/notes/"')) {
    problems.push('dist/notes/index.html has no canonical, or it points elsewhere');
  }
  if (page.includes('vercel')) problems.push('dist/notes/index.html still references vercel');
} catch {
  /* already reported as missing above */
}

if (problems.length) {
  console.error('verify-dist: dist is not publishable');
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`verify-dist: ok (${REQUIRED.length} required paths present)`);
