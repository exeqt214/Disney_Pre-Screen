document.getElementById('pdf-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const { PDFDocument } = PDFLib; // ✅ Fixed here
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    const existingPdfBytes = await fetch('PRE-SCREEN - BLANK.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
    const form = pdfDoc.getForm();
    form.getTextField('name').setText(name);
    form.getTextField('email').setText(email);
  
    form.flatten();
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'filled-form.pdf';
    a.click();
  });
  