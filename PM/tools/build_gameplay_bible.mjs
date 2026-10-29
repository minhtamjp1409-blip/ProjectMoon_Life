import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outputDir = path.resolve('docs');
const mdPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.md');
const markdownContent = fs.readFileSync(mdPath, 'utf8');

// Also copy to Artifact directory
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
      html.push(`<h1>${line.slice(2)}</h1>`);
    } else if (line.startsWith('## ')) {
      html.push(`<h2>${line.slice(3)}</h2>`);
    } else if (line.startsWith('### ')) {
      html.push(`<h3>${line.slice(4)}</h3>`);
    } else if (line.startsWith('#### ')) {
      html.push(`<h4>${line.slice(5)}</h4>`);
    } else if (line.startsWith('> ')) {
      html.push(`<blockquote>${line.slice(2)}</blockquote>`);
    } else if (line.startsWith('* ') || line.startsWith('- ')) {
      html.push(`<li>${formatInline(line.slice(2))}</li>`);
    } else if (line.trim() === '---') {
      html.push('<hr/>');
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
    .replace(/➔/g, '&rarr;')
    .replace(/──►/g, '&#9472;&#9658;')
    .replace(/\$(.*?)\$/g, '<span class="math-expr">$1</span>');
}

const bodyHtml = convertMarkdownToHtml(markdownContent);

const printHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>The City Chronicles: Gameplay Deep-Dive Bible</title>
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
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.55;
    color: #1a1a1e;
    background: #ffffff;
    margin: 0;
    padding: 0;
  }
  h1 {
    font-family: 'Georgia', serif;
    font-size: 21pt;
    font-weight: 700;
    color: #1a1510;
    border-bottom: 3px double #b8860b;
    padding-bottom: 8px;
    margin-top: 0;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }
  h2 {
    font-family: 'Georgia', serif;
    font-size: 14pt;
    font-weight: 700;
    color: #2b2216;
    border-bottom: 1.5px solid #d4af37;
    padding-bottom: 5px;
    margin-top: 22px;
    margin-bottom: 10px;
    page-break-after: avoid;
  }
  h3 {
    font-size: 11pt;
    font-weight: 700;
    color: #8b6508;
    margin-top: 14px;
    margin-bottom: 6px;
    page-break-after: avoid;
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
    margin: 8px 0 14px;
    padding: 8px 14px;
    background: #faf6ee;
    border-left: 4px solid #b8860b;
    color: #554428;
    font-size: 9.5pt;
    font-style: italic;
  }
  hr {
    border: none;
    border-top: 1px solid #e0d8c8;
    margin: 18px 0;
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
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px;
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
    font-family: 'Cambria Math', 'Georgia', serif;
    font-style: italic;
    color: #1f3a52;
    background: #f2f7fb;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .page-footer {
    text-align: right;
    font-size: 8.5pt;
    color: #888888;
    margin-top: 24px;
    border-top: 1px solid #eeeeee;
    padding-top: 6px;
  }
</style>
</head>
<body>
${bodyHtml}
<div class="page-footer">
  The City Chronicles · Project Moon Life-Simulator Engine · Gameplay & Mechanics Deep-Dive Bible
</div>
</body>
</html>`;

const htmlPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.html');
fs.writeFileSync(htmlPath, printHtml, 'utf8');
console.log('Saved HTML:', htmlPath);

// Word (.doc) Content with Office namespace
const wordDocContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
xmlns:w='urn:schemas-microsoft-com:office:word'
xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>The City Chronicles: Gameplay Deep-Dive Bible</title>
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
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10.5pt; line-height: 1.5; color: #111111; }
  h1 { font-family: 'Georgia', serif; font-size: 22pt; color: #1a1510; border-bottom: 2pt solid #b8860b; padding-bottom: 6pt; }
  h2 { font-family: 'Georgia', serif; font-size: 15pt; color: #8b6508; border-bottom: 1pt solid #d4af37; padding-bottom: 4pt; margin-top: 18pt; }
  h3 { font-size: 12pt; color: #4a3818; margin-top: 12pt; }
  blockquote { background: #faf6ee; border-left: 3pt solid #b8860b; padding: 6pt 10pt; color: #554428; }
  pre { background: #f4f2ea; border: 1pt solid #dcd6c8; padding: 8pt; font-family: 'Consolas', monospace; font-size: 8.5pt; }
  table { width: 100%; border-collapse: collapse; margin: 10pt 0; }
  th, td { border: 1pt solid #cccccc; padding: 5pt 8pt; text-align: left; }
  th { background: #f5eedc; font-weight: bold; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

const docPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.doc');
fs.writeFileSync(docPath, wordDocContent, 'utf8');
console.log('Saved Word (.doc):', docPath);

// Generate PDF via Edge headless
const pdfPath = path.join(outputDir, 'THE_CITY_CHRONICLES_GAMEPLAY_DEEP_DIVE.pdf');
const edgeCmd = `cmd.exe /c ""C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file://${htmlPath}" 2>&1"`;

console.log('Generating PDF via Microsoft Edge headless...');
try {
  const result = execSync(edgeCmd, { encoding: 'utf8' });
  console.log(result);
  if (fs.existsSync(pdfPath)) {
    console.log('PDF GENERATED SUCCESSFULLY:', pdfPath, `(${fs.statSync(pdfPath).size} bytes)`);
  } else {
    console.error('PDF file not found after command.');
  }
} catch (err) {
  console.error('Edge PDF generation failed:', err.message);
}
