document.getElementById('pdf-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const { PDFDocument } = PDFLib;
    
    // Get values from the form
    const name = document.getElementById('name').value;
    const pre_screen_date = document.getElementById('pre_screen_date').value;
    const referral_source = document.getElementById('referral_source').value;
    const position = document.getElementById('position').value;
    const years_of_recent_exp = document.getElementById('years_of_recent_exp').value;
    const no_cruise_exp = document.getElementById('no_cruise_exp').value;
    const cruise_companies = document.getElementById('cruise_companies').value;
    const perner_no = document.getElementById('perner_no').value;
    const c1d_expires = document.getElementById('c1d_expires').value;

    // Comments (optional)
    const comment1 = document.getElementById('comment1').value;
    const comment2 = document.getElementById('comment2').value;
    const comment3 = document.getElementById('comment3').value;
    const comment4 = document.getElementById('comment4').value;
    const comment5 = document.getElementById('comment5').value;
    const comment6 = document.getElementById('comment6').value;
    const comment7 = document.getElementById('comment7').value;

    const re_position = document.getElementById('re_position').value;
    const pre_screener_name = document.getElementById('pre_screener_name').value;

    // Fetch the existing PDF
    const existingPdfBytes = await fetch('PRE-SCREEN - BLANK.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the form
    const form = pdfDoc.getForm();

    // Fill out form fields
    form.getTextField('name').setText(name);
    form.getTextField('pre_screen_date').setText(pre_screen_date);
    form.getTextField('referral_source').setText(referral_source);
    form.getTextField('position').setText(position);
    form.getTextField('years_of_recent_exp').setText(years_of_recent_exp);
    form.getTextField('no_cruise_exp').setText(no_cruise_exp);
    form.getTextField('cruise_companies').setText(cruise_companies);
    form.getTextField('perner_no').setText(perner_no);
    form.getTextField('c1d_expires').setText(c1d_expires);
    
    // Comments
    form.getTextField('comment1').setText(comment1);
    form.getTextField('comment2').setText(comment2);
    form.getTextField('comment3').setText(comment3);
    form.getTextField('comment4').setText(comment4);
    form.getTextField('comment5').setText(comment5);
    form.getTextField('comment6').setText(comment6);
    form.getTextField('comment7').setText(comment7);

    form.getTextField('re_position').setText(re_position);
    form.getTextField('pre_screener_name').setText(pre_screener_name);

    // Flatten the form to make the changes permanent
    form.flatten();

    // Save the filled PDF
    const pdfBytes = await pdfDoc.save();

    // Create a downloadable Blob
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'filled-form.pdf';
    a.click();
});
