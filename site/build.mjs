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
fs.copyFileSync(path.join(import.meta.dirname, 'live.js'), path.join(out, 'assets/live.js'));
fs.cpSync(path.join(import.meta.dirname, 'img'), path.join(out, 'img'), { recursive: true });
fs.rmSync(path.join(out, 'img/credits.json'));

const files = fs.readdirSync(path.join(root, 'docs')).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
const slug = f => f.replace(/\.md$/, '.html');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const LEADS = ["The assumed villa, the design principles and the layers of the system.","Why KNX, DALI-2, PoE and Zigbee, and how it compares with Control4, Crestron and Lutron.","Lighting, climate and ventilation, water, energy, security and the network.","System topology and control flow, drawn as diagrams.","Every device in every room, with totals and the interface matrix.","Quantities and estimated cost ranges, in rupees.","What architects and MEP must settle before the slab is cast.","The tests to run, in order, before the house is handed over.","A plain-language guide for the family.","Maintenance, alerts, troubleshooting and restore procedures.","A 16-month plan by construction stage, with gates and risks."];
const docs = files.map(f => {
  const md = fs.readFileSync(path.join(root, 'docs', f), 'utf8');
  const title = (md.match(/^# (.+)$/m) || [, f])[1].replace(/^\d+\.\s*/, '');
  const num = f.slice(0, 2);
  const lead = (md.split('\n').find(l => l && !/^[#>|*\-`]/.test(l)) || '')
    .replace(/[*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  return { f, md, title, num, lead: LEADS[Number(num) - 1] || lead };
});

const renderer = new marked.Renderer();
renderer.code = (code, lang) =>
  lang === 'mermaid' ? `<pre class="mermaid">${esc(code)}</pre>` : `<pre><code>${esc(code)}</code></pre>`;
renderer.heading = (text, level, raw) => `<h${level} id="${raw.toLowerCase().replace(/[^a-z0-9 -]/g, '').trim().replace(/ +/g, '-')}">${text}</h${level}>`;
renderer.table = (header, body) =>
  `<div class="tablewrap"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
marked.use({ renderer, gfm: true });

const head = (title, desc) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="assets/cover.jpg"><meta name="theme-color" content="#e9f1ee">
<link rel="icon" href="assets/mark.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css"></head>`;

const nav = () => `<header class="top"><a class="brand" href="index.html"><img src="assets/mark.svg" alt="" width="32" height="32"><span>Quietwire</span></a>
<nav><a href="index.html#pack">The pack</a><a href="${slug(files[5])}">Budget</a><a href="https://github.com/alok-kul5/quietwire-villa">Source</a></nav></header>`;

const footer = `<footer class="foot"><p>Quietwire is a design exercise on an assumed building, not a certified construction document. Prices are rough estimates.</p>
<p>One of seven projects by <a href="https://alok.is-a.dev">Alok Kulkarni</a> · <a href="https://github.com/alok-kul5/quietwire-villa">Source on GitHub</a> · MIT</p></footer>`;

const mermaidScript = `<script type="module">
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11.4.0/dist/mermaid.esm.min.mjs";
mermaid.initialize({startOnLoad:true,theme:"base",themeVariables:{background:"#f4f9f7",primaryColor:"#d5e6e1",primaryTextColor:"#072827",primaryBorderColor:"#0f766e",lineColor:"#0f766e",secondaryColor:"#e9f1ee",tertiaryColor:"#f4f9f7",clusterBkg:"#e9f1ee",clusterBorder:"#0f766e",edgeLabelBackground:"#f4f9f7",fontFamily:"Bricolage Grotesque, Segoe UI, sans-serif"}});
</script>`;

docs.forEach((d, i) => {
  let html = marked.parse(d.md.replace(/^# .+\n/, ''));
  html = html.replace(/href="(\d\d-[^"#]*)\.md(#[^"]*)?"/g, 'href="$1.html$2"')
    .replace(/<a href="(\d\d)-([^"]*\.html)">\d\d<\/a>/g, (m, n, rest) => `<a href="${n}-${rest}">${(docs.find(x => x.num === n) || {}).title || n}</a>`)
    .replace(/\[ \]/g, '<span class="box">☐</span>')
    .replace(/\[x\]/gi, '<span class="box on">☑</span>');
  const side = docs.map(x => `<a href="${slug(x.f)}"${x.f === d.f ? ' class="on"' : ''}>${esc(x.title)}</a>`).join('');
  const prev = docs[i - 1], next = docs[i + 1];
  const page = `${head(`${d.title} · Quietwire`, d.lead)}<body>${nav()}
<div class="layout"><aside class="side"><p class="side-h">The design pack</p>${side}</aside>
<main class="doc"><h1>${esc(d.title)}</h1>${html}
<div class="pager">${prev ? `<a href="${slug(prev.f)}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="${slug(next.f)}">${esc(next.title)} →</a>` : '<span></span>'}</div></main></div>
${footer}${html.includes('class="mermaid"') ? mermaidScript : ''}</body></html>`;
  fs.writeFileSync(path.join(out, slug(d.f)), page);
});

const credits = 'Pictures: <a href="https://commons.wikimedia.org/w/index.php?curid=29934190">Field telephone switchboard</a> by Daderot, CC0; <a href="https://commons.wikimedia.org/w/index.php?curid=164180456">Florida Tropical Home, 1933</a> by Steve Shook, CC BY 2.0; <a href="https://commons.wikimedia.org/w/index.php?curid=7615079">CAT5e Cable</a> by Richard Wheeler (Zephyris), CC BY-SA 3.0; <a href="https://commons.wikimedia.org/w/index.php?curid=49777682">3 step stepwell</a> by Alice.surabhikumawat, CC BY-SA 4.0. Video: <a href="https://commons.wikimedia.org/wiki/File:Video_of_water_flowing_from_taps.webm">Video of water flowing from taps</a> by Gpkp, CC BY-SA 4.0. All via Wikimedia Commons.';
const list = docs.map(d => `<li class="rv"><a href="${slug(d.f)}"><b>${esc(d.title)}</b><span>${esc(d.lead.slice(0, 120))}${d.lead.length > 120 ? '…' : ''}</span></a></li>`).join('');
const tpl = fs.readFileSync(path.join(import.meta.dirname, 'landing.html'), 'utf8').replace('{{DOCS}}', list).replace('{{CREDITS}}', credits);
fs.writeFileSync(path.join(out, 'index.html'), tpl);
console.log(`built ${docs.length + 1} pages`);
