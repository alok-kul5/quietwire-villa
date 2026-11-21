import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.copyFileSync(path.join(root, 'docs/brand/mark.svg'), path.join(out, 'assets/mark.svg'));
fs.copyFileSync(path.join(root, 'docs/cover.jpg'), path.join(out, 'assets/cover.jpg'));
fs.copyFileSync(path.join(import.meta.dirname, 'style.css'), path.join(out, 'assets/style.css'));

const files = fs.readdirSync(path.join(root, 'docs')).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
const slug = f => f.replace(/\.md$/, '.html');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const docs = files.map(f => {
  const md = fs.readFileSync(path.join(root, 'docs', f), 'utf8');
  const title = (md.match(/^# (.+)$/m) || [, f])[1].replace(/^\d+\.\s*/, '');
  const num = f.slice(0, 2);
  const lead = (md.split('\n').find(l => l && !/^[#>|*\-`]/.test(l)) || '')
    .replace(/[*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  return { f, md, title, num, lead };
});

const renderer = new marked.Renderer();
renderer.code = (code, lang) =>
  lang === 'mermaid' ? `<pre class="mermaid">${esc(code)}</pre>` : `<pre><code>${esc(code)}</code></pre>`;
renderer.table = (header, body) =>
  `<div class="tablewrap"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
marked.use({ renderer, gfm: true });

const head = (title, desc) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="assets/cover.jpg"><meta name="theme-color" content="#0b2a2a">
<link rel="icon" href="assets/mark.svg"><link rel="stylesheet" href="assets/style.css"></head>`;

const nav = () => `<header class="top"><a class="brand" href="index.html"><img src="assets/mark.svg" alt="" width="32" height="32"><span>Quietwire</span></a>
<nav><a href="index.html#pack">The pack</a><a href="${slug(files[5])}">Budget</a><a href="https://github.com/alok-kul5/quietwire-villa">GitHub</a></nav></header>`;

const footer = `<footer class="foot"><p>Quietwire is a design exercise on an assumed building, not a certified construction document. Prices are rough estimates.</p>
<p>One of seven projects by <a href="https://alok.is-a.dev">Alok Kulkarni</a> · <a href="https://github.com/alok-kul5/quietwire-villa">Source on GitHub</a> · MIT</p></footer>`;

const mermaidScript = `<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.4.0/dist/mermaid.esm.min.mjs';
mermaid.initialize({startOnLoad:true,theme:'base',themeVariables:{darkMode:true,background:'#0b2a2a',primaryColor:'#115e59',primaryTextColor:'#e6fffb',primaryBorderColor:'#2dd4bf',lineColor:'#5eead4',secondaryColor:'#0f3d3b',tertiaryColor:'#0b2a2a',clusterBkg:'#0f3d3b',clusterBorder:'#2dd4bf88',edgeLabelBackground:'#0b2a2a',fontFamily:'Segoe UI, system-ui, sans-serif'}});
</script>`;

docs.forEach((d, i) => {
  let html = marked.parse(d.md.replace(/^# .+\n/, ''));
  html = html.replace(/href="(\d\d-[^"#]*)\.md(#[^"]*)?"/g, 'href="$1.html$2"')
    .replace(/\[ \]/g, '<span class="box">☐</span>')
    .replace(/\[x\]/gi, '<span class="box on">☑</span>');
  const side = docs.map(x => `<a href="${slug(x.f)}"${x.f === d.f ? ' class="on"' : ''}><b>${x.num}</b>${esc(x.title)}</a>`).join('');
  const prev = docs[i - 1], next = docs[i + 1];
  const page = `${head(`${d.title} · Quietwire`, d.lead)}<body>${nav()}
<div class="layout"><aside class="side"><p class="side-h">The design pack</p>${side}</aside>
<main class="doc"><p class="eyebrow">Section ${d.num}</p><h1>${esc(d.title)}</h1>${html}
<div class="pager">${prev ? `<a href="${slug(prev.f)}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="${slug(next.f)}">${esc(next.title)} →</a>` : '<span></span>'}</div></main></div>
${footer}${html.includes('class="mermaid"') ? mermaidScript : ''}</body></html>`;
  fs.writeFileSync(path.join(out, slug(d.f)), page);
});

const stats = [['44', 'tunable-white light zones'], ['6', 'air-quality nodes'], ['0', 'Wi-Fi APs in bedrooms'], ['8', 'leak sensors, 1 auto shut-off'], ['≈16', 'month programme'], ['₹27–53 L', 'budget estimate']];
const principles = [
  ['Wellness first', 'Light that follows the day, air that is measured, water that is monitored.'],
  ['Wired first, low-EMF', 'Cables for everything fixed. Wireless only where a cable cannot go. No AP in bedrooms.'],
  ['Local control', 'Lights, climate, locks and leak shut-off keep working with the internet unplugged.'],
  ['Open standards', 'KNX, DALI-2, Modbus, Zigbee, Thread, Matter, with Home Assistant as the hub.'],
];
const index = `${head('Quietwire · A calm, wired-first smart home', 'A low-EMF smart home design pack for a 4-bedroom wellness villa: KNX + Home Assistant, from device schedule and budget to commissioning and handover.')}<body class="home">${nav()}
<section class="hero"><img class="mark" src="assets/mark.svg" alt="Quietwire mark" width="96" height="96">
<p class="eyebrow">Smart home design proposal</p><h1>Quietwire</h1>
<p class="tag">A calm, wired-first smart home.</p>
<p class="sub">A design pack for a four-bedroom wellness villa: low-EMF by design, local control that works without the cloud, built on open standards.</p>
<p class="cta"><a class="btn" href="01-overview-and-principles.html">Read the proposal</a><a class="btn ghost" href="${slug(files[5])}">See the budget</a></p>
<img class="cover" src="assets/cover.jpg" alt="Quietwire cover: system topology for the villa" width="1600" height="1000"></section>
<section class="band"><div class="stats">${stats.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join('')}</div></section>
<section class="wrap"><p class="eyebrow">Principles</p><h2>Technology that stays out of the way</h2>
<div class="cards">${principles.map(([t, p]) => `<div class="card"><h3>${t}</h3><p>${p}</p></div>`).join('')}</div></section>
<section class="wrap" id="pack"><p class="eyebrow">The pack</p><h2>From brief to handover</h2>
<div class="grid">${docs.map(d => `<a class="tile" href="${slug(d.f)}"><b>${d.num}</b><h3>${esc(d.title)}</h3><p>${esc(d.lead.slice(0, 130))}${d.lead.length > 130 ? '…' : ''}</p></a>`).join('')}</div></section>
${footer}</body></html>`;
fs.writeFileSync(path.join(out, 'index.html'), index);
console.log(`built ${docs.length + 1} pages`);
