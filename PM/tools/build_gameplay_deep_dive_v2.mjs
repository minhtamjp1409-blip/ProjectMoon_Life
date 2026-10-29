import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outputDir = path.resolve('docs');
const mdPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.md');
const markdownContent = fs.readFileSync(mdPath, 'utf8').normalize('NFC');

// Also update Brain Artifact
const artifactDir = path.resolve('C:/Users/nguyenhuynhminhtam/.gemini/antigravity/brain/e7e90694-7d57-4cea-90c8-403b1d3593ff');
if (fs.existsSync(artifactDir)) {
  fs.writeFileSync(path.join(artifactDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.md'), markdownContent, 'utf8');
  console.log('Artifact updated.');
}

function convertMarkdownToHtml(md) {
  let lines = md.split('\n');
  let html = [];
  let inCode = false;
  let codeBuffer = [];
  let inTable = false;
  let tableBuffer = [];

  for (let line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        html.push('<pre class="diagram-box"><code>' + codeBuffer.join('\n') + '</code></pre>');
        codeBuffer = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuffer.push(line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      continue;
    }

    if (line.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableBuffer = [];
      }
      tableBuffer.push(line);
      continue;
    } else if (inTable) {
      html.push(renderTable(tableBuffer));
      tableBuffer = [];
      inTable = false;
    }

    if (line.startsWith('# ')) {
      html.push(`<h1>${formatInline(line.slice(2))}</h1>`);
    } else if (line.startsWith('## ')) {
      html.push(`<h2>${formatInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      html.push(`<h3>${formatInline(line.slice(4))}</h3>`);
    } else if (line.startsWith('#### ')) {
      html.push(`<h4>${formatInline(line.slice(5))}</h4>`);
    } else if (line.startsWith('> ')) {
      html.push(`<blockquote>${formatInline(line.slice(2))}</blockquote>`);
    } else if (line.startsWith('* ') || line.startsWith('- ')) {
      html.push(`<li>${formatInline(line.slice(2))}</li>`);
    } else if (line.trim() === '---') {
      html.push('<hr/>');
    } else if (line.trim().startsWith('**') && line.trim().endsWith('**') && line.includes('=')) {
      html.push(`<div class="formula-card">${formatInline(line.trim().slice(2, -2))}</div>`);
    } else if (line.trim().length > 0) {
      html.push(`<p>${formatInline(line)}</p>`);
    }
  }

  if (inTable) {
    html.push(renderTable(tableBuffer));
  }

  return html.join('\n');
}

function renderTable(lines) {
  if (lines.length < 2) return '';
  let out = ['<table class="data-table"><thead><tr>'];
  let headerCols = lines[0].split('|').slice(1, -1);
  for (let col of headerCols) {
    out.push(`<th>${formatInline(col.trim())}</th>`);
  }
  out.push('</tr></thead><tbody>');

  for (let i = 2; i < lines.length; i++) {
    let rowCols = lines[i].split('|').slice(1, -1);
    out.push('<tr>');
    for (let col of rowCols) {
      out.push(`<td>${formatInline(col.trim())}</td>`);
    }
    out.push('</tr>');
  }
  out.push('</tbody></table>');
  return out.join('');
}

function formatInline(str) {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
    .replace(/\\le/g, '&le;')
    .replace(/\\ge/g, '&ge;')
    .replace(/\\times/g, '&times;')
    .replace(/\\sum/g, '&sum;')
    .replace(/\\prod/g, '&prod;')
    .replace(/\\in/g, '&isin;')
    .replace(/\\forall/g, '&forall;')
    .replace(/\\land/g, '&and;')
    .replace(/\\lor/g, '&or;')
    .replace(/\\iff/g, '&hArr;')
    .replace(/\\leftarrow/g, '&larr;')
    .replace(/\\rightarrow/g, '&rarr;')
    .replace(/\$(.*?)\$/g, '<span class="math-expr">$1</span>');
}

const bodyHtml = convertMarkdownToHtml(markdownContent);

// Using Segoe UI / Arial system stack to ensure perfect precomposed Vietnamese glyphs without kerning gaps
const printHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>The City Chronicles: Gameplay & Systems Architecture</title>
<style>
  @page {
    size: A4;
    margin: 18mm 16mm 20mm 16mm;
    @bottom-right {
      content: counter(page);
    }
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.6;
    color: #1a1a1e;
    background: #ffffff;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  h1 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    font-size: 18pt;
    font-weight: 800;
    color: #1a1510;
    border-bottom: 3px double #b8860b;
    padding-bottom: 8px;
    margin-top: 0;
    margin-bottom: 12px;
    letter-spacing: normal;
  }
  h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    font-size: 13pt;
    font-weight: 700;
    color: #2b2216;
    border-bottom: 1.5px solid #d4af37;
    padding-bottom: 5px;
    margin-top: 24px;
    margin-bottom: 10px;
    page-break-after: avoid;
    letter-spacing: normal;
  }
  h3 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    font-size: 11pt;
    font-weight: 700;
    color: #8b6508;
    margin-top: 16px;
    margin-bottom: 6px;
    page-break-after: avoid;
    letter-spacing: normal;
  }
  h4 {
    font-size: 10pt;
    font-weight: 700;
    color: #333333;
    margin-top: 10px;
    margin-bottom: 4px;
    page-break-after: avoid;
  }
  p, li {
    color: #222226;
    margin-top: 4px;
    margin-bottom: 6px;
  }
  li {
    margin-left: 18px;
    margin-bottom: 4px;
  }
  blockquote {
    margin: 10px 0 16px;
    padding: 8px 14px;
    background: #faf6ee;
    border-left: 4px solid #b8860b;
    color: #554428;
    font-size: 9.5pt;
    line-height: 1.5;
  }
  hr {
    border: none;
    border-top: 1px solid #e0d8c8;
    margin: 20px 0;
  }
  .diagram-box {
    background: #f7f6f2;
    border: 1px solid #dcd6c8;
    border-left: 4px solid #b8860b;
    padding: 10px 14px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 8pt;
    line-height: 1.35;
    color: #1e1e24;
    white-space: pre-wrap;
    word-break: break-word;
    border-radius: 3px;
    margin: 10px 0 14px;
    page-break-inside: avoid;
  }
  .formula-card {
    background: #faf7f0;
    border: 1px solid #dcd4c2;
    border-left: 4px solid #b8860b;
    padding: 8px 14px;
    margin: 10px 0 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 10pt;
    font-weight: 700;
    color: #1a1510;
    border-radius: 2px;
    page-break-inside: avoid;
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 16px;
    font-size: 9pt;
    page-break-inside: avoid;
  }
  .data-table th, .data-table td {
    border: 1px solid #d4ccb8;
    padding: 6px 9px;
    text-align: left;
    vertical-align: top;
  }
  .data-table th {
    background: #f5eedc;
    color: #4a3818;
    font-weight: 700;
  }
  .data-table tr:nth-child(even) td {
    background: #fdfbf7;
  }
  .inline-code {
    font-family: 'Consolas', monospace;
    font-size: 8.5pt;
    background: #f0ece1;
    color: #7a2020;
    padding: 1px 4px;
    border-radius: 3px;
    border: 1px solid #e4dac5;
  }
  .math-expr {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-weight: 600;
    color: #1f3a52;
    background: #f2f7fb;
    padding: 1px 4px;
    border-radius: 2px;
    border: 1px solid #d9e6f2;
  }
  .page-footer {
    text-align: right;
    font-size: 8pt;
    color: #888888;
    margin-top: 30px;
    border-top: 1px solid #e5e5e5;
    padding-top: 8px;
  }
</style>
</head>
<body>
${bodyHtml}
<div class="page-footer">
  The City Chronicles — Game Systems & Mechanics Deep Dive — Confidential Architecture Document
</div>
</body>
</html>`;

const htmlPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.html');
fs.writeFileSync(htmlPath, printHtml, 'utf8');
console.log('Saved HTML:', htmlPath);

// Generate Word .doc (HTML wrapper readable by MS Word)
const docPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.doc');
const wordHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>The City Chronicles Gameplay Bible</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
body { font-family: 'Segoe UI', 'Arial', sans-serif; font-size: 10pt; line-height: 1.5; color: #222; }
h1 { font-size: 18pt; color: #8b6508; border-bottom: 2pt solid #8b6508; }
h2 { font-size: 13pt; color: #333; border-bottom: 1pt solid #ccc; margin-top: 18pt; }
h3 { font-size: 11pt; color: #8b6508; }
table { border-collapse: collapse; width: 100%; margin: 10pt 0; font-size: 9pt; }
th, td { border: 1pt solid #bbb; padding: 5pt; text-align: left; }
th { background-color: #f5eedc; }
pre { background-color: #f7f6f2; border: 1pt solid #ccc; padding: 6pt; font-family: 'Consolas', monospace; font-size: 8pt; }
blockquote { border-left: 3pt solid #b8860b; background-color: #faf6ee; padding: 6pt 10pt; margin: 8pt 0; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>
`;
fs.writeFileSync(docPath, wordHtml, 'utf8');
console.log('Saved Word (.doc):', docPath);

// Generate PDF via Microsoft Edge Headless
const pdfPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.pdf');
console.log('Generating PDF via Microsoft Edge headless...');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let edgeBin = edgePaths.find(p => fs.existsSync(p));

if (edgeBin) {
  try {
    const cmd = `"${edgeBin}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" "${htmlPath}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log('PDF GENERATED SUCCESSFULLY:', pdfPath);
  } catch (err) {
    console.error('Failed to generate PDF with Edge:', err.message);
  }
} else {
  console.log('Edge not found, skipping PDF generation.');
}
