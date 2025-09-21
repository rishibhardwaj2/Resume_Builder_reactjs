// src/utils/pdf.js
export function downloadVisualPdf(element, filename = 'resume_visual.pdf') {
  if (window.html2pdf) {
    const opt = {
      margin: [10,10,10,10],
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    window.html2pdf().set(opt).from(element).save();
  } else {
    // fallback: open print window
    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Visual Resume</title><style>body{font-family:Inter, Arial, sans-serif;margin:0;padding:18px;background:#f7fafc}.preview-wrap{max-width:800px;margin:auto}</style></head><body><div class="preview-wrap">${element.outerHTML}</div></body></html>`;
    const w = window.open('', '_blank', 'noopener,noreferrer');
    if (!w) return alert('Please allow popups for PDF download');
    w.document.write(html); w.document.close(); w.focus();
    setTimeout(()=>w.print(), 600);
  }
}

export function openPrintWindowWithHtml(html) {
  const w = window.open('', '_blank', 'noopener,noreferrer');
  if (!w) return alert('Please allow popups for PDF download');
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(()=> w.print(), 600);
}
