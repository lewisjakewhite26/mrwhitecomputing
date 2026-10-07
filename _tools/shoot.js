// Screenshot parts of a lesson page with Playwright.
//
//   node _tools/shoot.js <page.html> <shots> [outDir]
//
// <shots> is a comma-separated list of part:steps[:click|click], for example
//   "1:0,4:2:#cshow|#cins"  = part 1 at step 0, then part 4 at step 2 with two clicks.
// Parts are 1-based (the #partN hash). Pages without parts (index.html#/g/y12)
// can be passed with a hash and the shot list "0:0".
//
// Needs a local server on port 8765 (python3 -m http.server 8765) started from
// the repo root. Google Fonts are served from @fontsource packages if FONTS points
// at a node_modules/@fontsource folder; otherwise the page falls back to system fonts,
// which is fine for checking layout but not for judging type.
//
// Env: WAIT (ms after the last action, default 2500), W and H (viewport, default 1600x900),
//      NODE_PATH must reach playwright.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [page, list, outDir = '.'] = process.argv.slice(2);
if (!page || !list) { console.error('usage: node _tools/shoot.js <page.html> <shots> [outDir]'); process.exit(2); }
const FONTS = process.env.FONTS;
const EXE = fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined;

function fontCss(url) {
  if (!FONTS) return '';
  const u = new URL(url);
  return u.searchParams.getAll('family').map(f => {
    const [name, spec] = f.split(':');
    const pkg = name.toLowerCase().replace(/\+| /g, '-');
    const weights = spec && spec.includes('@') ? spec.split('@')[1].split(';').map(w => w.split(',').pop()) : ['400'];
    return weights.map(w => `@font-face{font-family:'${name.replace(/\+/g, ' ')}';font-weight:${w};src:url(https://fonts.local/${pkg}/${w}.woff2)}`).join('');
  }).join('');
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: EXE });
  const pg = await b.newPage({ viewport: { width: +(process.env.W || 1600), height: +(process.env.H || 900) } });
  const errs = [];
  pg.on('pageerror', e => errs.push('pageerror: ' + e.message));
  pg.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await pg.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://localhost')) return r.continue();
    if (u.includes('fonts.googleapis.com')) return r.fulfill({ contentType: 'text/css', body: fontCss(u) });
    if (u.includes('fonts.local') && FONTS) {
      const [, pkg, file] = new URL(u).pathname.split('/');
      const f = path.join(FONTS, pkg, 'files', `${pkg}-latin-${file.replace('.woff2', '')}-normal.woff2`);
      if (fs.existsSync(f)) return r.fulfill({ contentType: 'font/woff2', body: fs.readFileSync(f) });
    }
    return r.abort();
  });
  const base = page.split('#')[0], hash = page.includes('#') ? '#' + page.split('#')[1] : '';
  const saved = [];
  for (const it of list.split(',')) {
    const [p, s = '0', clicks] = it.split(':');
    const url = `http://localhost:8765/${base}${hash || (+p ? '#part' + p : '')}`;
    await pg.goto('about:blank');
    await pg.goto(url);
    await pg.waitForTimeout(900);
    for (let i = 0; i < +s; i++) { await pg.keyboard.press('ArrowRight'); await pg.waitForTimeout(350); }
    if (clicks) for (const sel of clicks.split('|')) {
      try { await pg.click(sel, { timeout: 2000 }); } catch (e) { errs.push(`click failed: ${sel} on ${it}`); }
      await pg.waitForTimeout(300);
    }
    await pg.waitForTimeout(+(process.env.WAIT || 2500));
    const out = path.join(outDir, `${base.replace(/\W+/g, '_')}-${p}-${s}${clicks ? 'x' : ''}.png`);
    await pg.screenshot({ path: out });
    saved.push(out);
  }
  console.log(saved.join('\n'));
  console.log(errs.length ? 'ERRORS\n' + errs.join('\n') : 'no errors');
  await b.close();
})();
