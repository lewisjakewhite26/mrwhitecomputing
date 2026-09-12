#!/usr/bin/env node
// Extract plain text from an unzipped .pptx or .docx directory tree.
// Usage: node extract-office-text.js <unzipped-dir> [pptx|docx]
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
let kind = process.argv[3];
if (!dir) { console.error('usage: extract-office-text.js <unzipped-dir> [pptx|docx]'); process.exit(1); }
if (!kind) {
  if (fs.existsSync(path.join(dir, 'ppt'))) kind = 'pptx';
  else if (fs.existsSync(path.join(dir, 'word'))) kind = 'docx';
  else { console.error('cannot detect kind, pass pptx or docx'); process.exit(1); }
}

function textFromXml(xml) {
  // Pull text runs <a:t>...</a:t> (pptx) or <w:t ...>...</w:t> (docx)
  const runs = [];
  const re = /<(?:a:t|w:t)(?:\s[^>]*)?>([\s\S]*?)<\/(?:a:t|w:t)>/g;
  let m;
  while ((m = re.exec(xml))) {
    runs.push(m[1]
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&apos;/g, "'"));
  }
  return runs.join('');
}

if (kind === 'pptx') {
  const slidesDir = path.join(dir, 'ppt', 'slides');
  const files = fs.readdirSync(slidesDir)
    .filter(f => /^slide\d+\.xml$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
  for (const f of files) {
    const xml = fs.readFileSync(path.join(slidesDir, f), 'utf8');
    // split into paragraphs on <a:p> boundaries for readability
    const paras = xml.split(/<a:p>/).slice(1).map(chunk => {
      const end = chunk.indexOf('</a:p>');
      return textFromXml(chunk.slice(0, end === -1 ? undefined : end));
    }).filter(Boolean);
    console.log(`\n=== ${f} ===`);
    paras.forEach(p => console.log(p));

    // also grab speaker notes if present
    const notesFile = path.join(dir, 'ppt', 'notesSlides', f.replace('slide', 'notesSlide'));
    if (fs.existsSync(notesFile)) {
      const notesXml = fs.readFileSync(notesFile, 'utf8');
      const notesParas = notesXml.split(/<a:p>/).slice(1).map(chunk => {
        const end = chunk.indexOf('</a:p>');
        return textFromXml(chunk.slice(0, end === -1 ? undefined : end));
      }).filter(Boolean);
      if (notesParas.length) {
        console.log(`--- notes for ${f} ---`);
        notesParas.forEach(p => console.log(p));
      }
    }
  }
} else if (kind === 'docx') {
  const docFile = path.join(dir, 'word', 'document.xml');
  const xml = fs.readFileSync(docFile, 'utf8');
  const paras = xml.split(/<w:p(?:\s[^>]*)?>/).slice(1).map(chunk => {
    const end = chunk.indexOf('</w:p>');
    return textFromXml(chunk.slice(0, end === -1 ? undefined : end));
  });
  paras.forEach(p => { if (p.trim()) console.log(p); });
} else {
  console.error('unknown kind: ' + kind);
  process.exit(1);
}
