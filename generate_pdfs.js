const fs = require('fs');
const path = require('path');

try {
  const PDFDocument = require('pdfkit');

  // Helper to build a standard certificate
  function generateCert(filename, title, details) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(path.join(__dirname, filename));
    doc.pipe(stream);

    // Styling Colors
    const primaryBlue = '#0047AB';
    const textDark = '#1A2332';
    const textGray = '#5A6C7D';
    const lineLight = '#E1E8ED';

    // Header Branding
    doc.fillColor(primaryBlue)
       .font('Helvetica-Bold')
       .fontSize(26)
       .text('BUILDPRO UK', { align: 'center' });

    doc.fontSize(10)
       .fillColor(textGray)
       .text('Commercial Building & Finishing Solutions', { align: 'center' });

    doc.moveDown(0.5);

    // Header Address & Contact
    doc.fontSize(8)
       .text('123 Construction Way, London, EC1A 1BB  |  Tel: 0800 123 4567', { align: 'center' })
       .text('Email: info@buildprouk.co.uk  |  Web: www.buildprouk.co.uk', { align: 'center' });

    doc.moveDown(0.8);

    // Decorative line
    doc.moveTo(50, doc.y)
       .lineTo(545, doc.y)
       .strokeColor(primaryBlue)
       .lineWidth(2)
       .stroke();

    doc.moveDown(2.5);

    // Certificate Title
    doc.fillColor(primaryBlue)
       .font('Helvetica-Bold')
       .fontSize(18)
       .text(title, { align: 'center', underline: true });

    doc.moveDown(2);

    // Certificate Body
    doc.fillColor(textDark)
       .font('Helvetica')
       .fontSize(11)
       .lineGap(6);

    details.forEach(para => {
      doc.text(para, { align: 'justify' });
      doc.moveDown(1);
    });

    doc.moveDown(3);

    // Signatures
    doc.moveTo(50, doc.y)
       .lineTo(545, doc.y)
       .strokeColor(lineLight)
       .lineWidth(1)
       .stroke();

    doc.moveDown(2);

    // Left Signature
    doc.fontSize(9)
       .fillColor(textDark)
       .font('Helvetica-Bold')
       .text('Signed on behalf of BuildPro UK:', 50, doc.y, { lineBreak: false })
       .text('Authorized Quality Inspector:', 320, doc.y);

    doc.moveDown(2.5);

    doc.font('Helvetica-Oblique')
       .text('A. Harrison', 50, doc.y, { lineBreak: false })
       .text('M. Dunwoody', 320, doc.y);

    doc.font('Helvetica')
       .fillColor(textGray)
       .fontSize(8)
       .text('Technical Director, BuildPro UK', 50, doc.y)
       .text('QA Auditor, Certification Services', 320, doc.y);

    // Footer bottom
    doc.fontSize(7)
       .text('Document ID: BP-CERT-' + Math.floor(100000 + Math.random() * 900000) + '  |  BuildPro Registration: UK12345678  |  Issued in London, UK', 50, doc.page.height - 40, { align: 'center' });

    doc.end();
    console.log(`[BuildPro PDF] Created: ${filename}`);
  }

  // 1. Generate Compliance PDF
  generateCert('compliance.pdf', 'CERTIFICATE OF UK BUILDING REGULATION COMPLIANCE', [
    'This document serves to certify that the commercial-grade flooring products supplied and installed by BuildPro UK—including SPC (Stone Plastic Composite) Rigid Core planks, LVT (Luxury Vinyl Tiles), and associated adhesive-free underlay systems—comply in full with current United Kingdom Building Regulations.',
    'Specifically, the materials meet or exceed the following performance standards:',
    '• FIRE SAFETY: Tested in accordance with BS EN 13501-1 and classified as Class Bfl-S1 (Flame Retardant and Low Smoke Emission). Suitable for escape routes and commercial corridors.',
    '• SLIP RESISTANCE: Certified to DIN 51130 and BS 7976-2, achieving a Pendulum Test Value (PTV) of 36+ in wet and dry conditions, registering an R10 slip rating suitable for public spaces.',
    '• INDOOR AIR QUALITY: Materials conform to EN 717-1 emission limits, certifying VOC concentrations fall well below hazardous limits (FloorScore and E1 Formaldehyde Compliant).',
    '• SOUND INSULATION: Integrates a pre-attached 1.5mm high-density IXPE acoustic underlay, providing an impact sound reduction of 22dB, in compliance with Approved Document E (Resistance to the passage of sound).',
    'This declaration applies to all BuildPro UK flooring installations, including the Kingsley Oak, Light Chestnut, Storm Grey, Walnut, Norfolk Flint, Tuscan Marble, and Biscay Marble collections.'
  ]);

  // 2. Generate Quality PDF
  generateCert('quality.pdf', 'CERTIFICATE OF PRODUCT QUALITY STANDARDS & WARRANTY', [
    'BuildPro UK hereby certifies that our premium flooring ranges are manufactured under strict ISO 9001:2015 Quality Management Systems and ISO 14001:2015 Environmental Management Systems.',
    'All SPC and LVT products comply with BS EN 14041 (Resilient, textile and laminate floor coverings - Essential characteristics) and undergo systematic laboratory testing for dimensional stability, impact resistance, and durability.',
    'Key Quality Performance Figures:',
    '• Wear Layer Thickness: 0.55mm Commercial Grade, protecting against indentation, high foot traffic, and scratching.',
    '• Dimensional Stability: Tested to EN 434, displaying shrinkage or expansion of less than 0.05% under high temperature cycles.',
    '• Indentation Resistance: Tested to EN 433, showing residual indentation depth of less than 0.08mm.',
    'Warranty Protection Coverage:',
    '• Residential: Covered by a Lifetime Wear-Through Warranty against surface wearing, fade, and structural peeling.',
    '• Commercial: Covered by a 10-Year Trade & Commercial Warranty against premature wear-through and manufacturing defects.',
    'This certificate guarantees that the technical figures represented in the BuildPro flooring specifications match the manufacturer’s certified test data in full.'
  ]);

} catch (err) {
  console.error('[BuildPro PDF ERROR] Failed to load pdfkit. Make sure npm install pdfkit has run successfully.', err.message);
}
