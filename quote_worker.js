const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const PDFDocument = require('pdfkit');

const supabaseUrl = 'https://dyidbpwyzatoihydmkwa.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aWRicHd5emF0b2loeWRta3dhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY2MTkwMSwiZXhwIjoyMDkxMjM3OTAxfQ.VZsRNvXFSOjVFaTRsJAC_65gTVG8p7gGvfuzm30GP8o';

const sb = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// Polling interval (10 seconds)
const POLL_INTERVAL_MS = 10000;

// Config state loaded from database
let config = {
  resend_api_key: '',
  resend_from_email: 'quotes@buildprouk.co.uk',
  admin_notification_email: 'kidflashfarhan@outlook.com'
};

async function loadConfig() {
  try {
    const { data, error } = await sb.from('app_settings').select('*');
    if (error) throw error;
    
    if (data) {
      data.forEach(item => {
        config[item.key] = item.value;
      });
      console.log('[Quote Worker] Configuration loaded/updated from database.');
    }
  } catch (err) {
    console.error('[Quote Worker] Failed to load configuration from app_settings:', err.message);
  }
}

async function ensureBucketExists() {
  try {
    const { data, error } = await sb.storage.createBucket('quotes', {
      public: false,
      allowedMimeTypes: ['application/pdf'],
      fileSizeLimit: 10485760 // 10MB
    });
    if (error) {
      if (error.message.includes('already exists') || error.message.includes('Duplicate')) {
        // Bucket already exists, perfect
      } else {
        console.error('[Quote Worker] Storage bucket check error:', error.message);
      }
    } else {
      console.log('[Quote Worker] Created private storage bucket "quotes" successfully.');
    }
  } catch (err) {
    console.error('[Quote Worker] Storage check failed:', err.message);
  }
}

// Generate the PDF file based on the quote specifications
async function generateQuotePdfFile(quote, filePath) {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Styling Colors
    const primaryBlue = '#0047AB';
    const textDark = '#1A2332';
    const textGray = '#5A6C7D';
    const lineLight = '#E1E8ED';
    const accentGold = '#B2945E';

    // Header Branding
    doc.fillColor(primaryBlue)
       .font('Helvetica-Bold')
       .fontSize(24)
       .text('BUILDPRO UK', { align: 'center' });

    doc.fontSize(9)
       .fillColor(textGray)
       .text('Commercial Building & Finishing Solutions', { align: 'center' });

    doc.moveDown(0.4);

    // Header Address & Contact
    doc.fontSize(8)
       .text('123 Construction Way, London, EC1A 1BB  |  Tel: 0800 123 4567', { align: 'center' })
       .text('Email: info@buildprouk.co.uk  |  Web: www.buildprouk.co.uk', { align: 'center' });

    doc.moveDown(0.6);

    // Decorative line
    doc.moveTo(50, doc.y)
       .lineTo(545, doc.y)
       .strokeColor(primaryBlue)
       .lineWidth(2)
       .stroke();

    doc.moveDown(2);

    // Document Title
    const shortId = quote.id.substring(0, 8).toUpperCase();
    doc.fillColor(primaryBlue)
       .font('Helvetica-Bold')
       .fontSize(16)
       .text(`COMMERCIAL SPECIFICATION & QUOTE SHEET`, { align: 'center' });
    
    doc.fontSize(11)
       .fillColor(textDark)
       .text(`Reference ID: BP-Q-${shortId}`, { align: 'center' });

    doc.moveDown(2);

    // Client Info Section (Left Side) & Document Info (Right Side)
    const yAnchor = doc.y;
    doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryBlue).text('CLIENT INFORMATION', 50, yAnchor);
    doc.font('Helvetica').fontSize(9).fillColor(textDark)
       .text(`Name: ${quote.fname} ${quote.lname}`, 50, yAnchor + 15)
       .text(`Email: ${quote.email}`, 50, yAnchor + 30)
       .text(`Phone: ${quote.pnumber || 'N/A'}`, 50, yAnchor + 45)
       .text(`Company: ${quote.company || 'N/A'}`, 50, yAnchor + 60);

    doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryBlue).text('QUOTE METADATA', 320, yAnchor);
    doc.font('Helvetica').fontSize(9).fillColor(textDark)
       .text(`Date Created: ${new Date(quote.created_at).toLocaleDateString('en-GB')}`, 320, yAnchor + 15)
       .text(`Status: ${quote.status}`, 320, yAnchor + 30)
       .text(`Category: ${quote.category.toUpperCase()}`, 320, yAnchor + 45)
       .text(`Partner Reference: BuildPro UK Partner Net`, 320, yAnchor + 60);

    doc.moveDown(4.5);

    // Specifications Divider
    doc.moveTo(50, doc.y)
       .lineTo(545, doc.y)
       .strokeColor(lineLight)
       .lineWidth(1)
       .stroke();

    doc.moveDown(1.5);

    // Render Specifications Table
    doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryBlue).text('REQUESTED SPECIFICATIONS');
    doc.moveDown(0.8);

    doc.font('Helvetica-Bold').fontSize(9).fillColor(textDark);
    
    // Draw table header
    const tableY = doc.y;
    doc.text('Specification Detail', 60, tableY);
    doc.text('Value / Configuration', 280, tableY);
    
    doc.moveTo(50, tableY + 14)
       .lineTo(545, tableY + 14)
       .strokeColor(primaryBlue)
       .lineWidth(1)
       .stroke();
       
    doc.font('Helvetica').fontSize(9).fillColor(textDark);
    
    let currentY = tableY + 22;
    const details = quote.details || {};
    
    // Write details rows
    for (const key in details) {
      if (key === 'client_notes') continue;
      const label = key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
      const val = details[key];
      
      doc.font('Helvetica-Bold').text(label, 60, currentY);
      doc.font('Helvetica').text(String(val), 280, currentY);
      
      doc.moveTo(50, currentY + 14)
         .lineTo(545, currentY + 14)
         .strokeColor(lineLight)
         .lineWidth(0.5)
         .stroke();
         
      currentY += 20;
    }

    doc.y = currentY + 10;

    // Client Notes if available
    if (details.client_notes) {
      doc.moveDown(1);
      doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryBlue).text('CLIENT NOTES & SPECIFICATION DEVIATIONS');
      doc.font('Helvetica').fontSize(9).fillColor(textDark).text(details.client_notes, { align: 'justify' });
      doc.moveDown(1.5);
    } else {
      doc.moveDown(2);
    }

    // Add compliance declarations based on categories
    doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryBlue).text('REGULATORY COMPLIANCE & WARRANTY DECREE');
    doc.font('Helvetica').fontSize(8.5).fillColor(textDark).lineGap(4);

    let complianceParagraphs = [];

    if (quote.category === 'electrical') {
      // Determine electrical standards based on products
      const itemCode = details.item_code || 'General';
      let standard = 'BS 7671 (Requirements for Electrical Installations)';
      if (itemCode.startsWith('LSMC') || itemCode.startsWith('FMC') || itemCode.startsWith('LHMC')) {
        standard = 'BS 7671 (IEE Wiring Regulations) & BS EN 61439 (Low-voltage switchgear and controlgear assemblies)';
      } else if (itemCode.startsWith('AMR') || itemCode.startsWith('RNA') || itemCode.startsWith('RNC') || itemCode.startsWith('ARS') || itemCode.startsWith('RA')) {
        standard = 'BS EN 61009-1 (Residual current operated circuit-breakers with integral overcurrent protection)';
      } else if (itemCode.startsWith('AFD')) {
        standard = 'BS EN 62606 (General requirements for arc fault detection devices)';
      } else if (itemCode.includes('LUM') || itemCode.includes('LIT') || itemCode.includes('LED')) {
        standard = 'BS EN 60598 (Luminaires - General requirements and tests)';
      }

      complianceParagraphs = [
        `This technical sheet certifies that the electrical product requested (SKU: ${itemCode}) meets all United Kingdom safety parameters. Low-voltage electrical switchgear, protection equipment, and distribution installations conform in full to ${standard} standards.`,
        'All products are sourced in partnership with certified UK electrical distributors (including partner catalogs like Live Electrical) and hold valid CE and UKCA marks. The commercial warranty covers structural and electronic failure for up to 3 years from supply date.'
      ];
    } else if (quote.category === 'flooring') {
      complianceParagraphs = [
        'Flooring specifications are aligned with Merrinton partner guidelines. All SPC (Stone Plastic Composite) Rigid Core and LVT flooring products comply with BS EN 14041 (Resilient, textile and laminate floor coverings - Essential characteristics).',
        '• FIRE COMPLIANCE: Class Bfl-S1 flame retardant rating under BS EN 13501-1, safe for egress routes.\n' +
        '• SLIP SAFETY: R10 slip rating with a Pendulum Test Value (PTV) of 36+ in wet and dry conditions under BS 7976-2.\n' +
        '• ACOUSTICS: Certified impact sound reduction of 22dB utilizing a pre-attached 1.5mm high-density IXPE acoustic underlay, satisfying Approved Document E.\n' +
        '• INDOOR AIR: E1 Formaldehyde and FloorScore certified low VOC content (EN 717-1 emission limits).\n' +
        '• TRADE WARRANTY: Covered by a 10-Year commercial / lifetime residential wear-through warranty.'
      ];
    } else if (quote.category === 'steel') {
      complianceParagraphs = [
        'Structural steel sections are manufactured and tested in accordance with British and European standards. Structural hot-rolled steel conforms to BS EN 10025. Technical specifications align with Manchester Steels partner tolerances.',
        'Unless specified otherwise, structural beams and fabrications are delivered in grade S275JR or S355JR with standard rust-inhibitive primer. Dimensions, straightness, and cross-section tolerances are verified under BS EN 10056 and BS EN 10210. A standard Certificate of Conformity (Mill Test Certificate) is held in archive.'
      ];
    } else if (quote.category === 'furniture') {
      complianceParagraphs = [
        'Commercial furniture and bespoke fixtures are manufactured to order. Solid wood, panel elements, and hardware are selected for high-traffic contract settings.',
        'All fabric and foam upholstery fillings comply with UK Fire Safety Regulations (BS 7176 Medium Hazard requirements for public spaces). Hardware, brackets, and functional runners conform to BS EN 15338 (Strength and durability of extension elements).'
      ];
    } else {
      complianceParagraphs = [
        'General building and finishing materials supplied by BuildPro UK comply with standard British construction requirements. Regulatory parameters, thermal specifications, and structural load compliance conform to the relevant parts of the UK Building Regulations (Approved Documents A through R).'
      ];
    }

    complianceParagraphs.forEach(p => {
      doc.text(p, { align: 'justify' });
      doc.moveDown(0.5);
    });

    doc.moveDown(1.5);

    // Signatures block
    const sigY = doc.y;
    doc.moveTo(50, sigY)
       .lineTo(545, sigY)
       .strokeColor(lineLight)
       .lineWidth(1)
       .stroke();

    doc.moveDown(1);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(textDark)
       .text('Signed on behalf of BuildPro UK:', 50, sigY + 12, { lineBreak: false })
       .text('Quality Assurance Inspector:', 320, sigY + 12);

    doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(textDark)
       .text('A. Harrison', 50, sigY + 32, { lineBreak: false })
       .text('M. Dunwoody', 320, sigY + 32);

    doc.font('Helvetica').fontSize(8).fillColor(textGray)
       .text('Technical Director, BuildPro UK', 50, sigY + 45)
       .text('QA Auditor, Certification Services', 320, sigY + 45);

    // Footer bottom
    doc.fontSize(7)
       .text(`Document Reference: BP-Q-DOC-${shortId}  |  BuildPro UK Registration: UK12345678  |  Issued in London, UK`, 50, doc.page.height - 40, { align: 'center' });

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', (err) => reject(err));
  });
}

// Send email using Resend Rest API
async function sendResendEmail(quote, signedUrl) {
  if (!config.resend_api_key) {
    console.warn('[Quote Worker] Resend API Key is empty. Skipping email notification.');
    return;
  }

  const shortId = quote.id.substring(0, 8).toUpperCase();
  const clientEmail = quote.email;
  const clientName = `${quote.fname} ${quote.lname}`;
  const categoryLabel = quote.category.charAt(0).toUpperCase() + quote.category.slice(1);

  console.log(`[Quote Worker] Sending email notification to ${clientEmail} via Resend...`);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.resend_api_key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `BuildPro UK Quotes <${config.resend_from_email}>`,
        to: clientEmail,
        subject: `Your BuildPro UK Commercial Quote is Ready - Ref: #${shortId}`,
        html: `
          <div style="font-family:'DM Sans', Arial, sans-serif; color:#1A2332; max-width:600px; margin:0 auto; padding:20px; border:1px solid #E1E8ED; border-radius:12px;">
            <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #0047AB;">
              <h1 style="color:#0047AB; font-family:'Space Grotesk', sans-serif; margin:0; font-size:28px; letter-spacing:1px;">BUILDPRO UK</h1>
              <p style="color:#5A6C7D; margin:5px 0 0 0; font-size:12px; text-transform:uppercase; font-weight:bold;">Commercial Quote Calculations</p>
            </div>
            
            <div style="padding:20px 0;">
              <h2 style="font-size:20px; margin-top:0; color:#1A2332;">Hello ${clientName},</h2>
              <p style="font-size:15px; line-height:1.6; color:#5A6C7D;">
                We are pleased to inform you that our estimating team has completed calculating your commercial specifications for <strong>${categoryLabel}</strong> materials.
              </p>
              
              <div style="background-color:#F8FAFB; padding:15px; border-radius:8px; margin:20px 0; border-left:4px solid #0047AB;">
                <p style="margin:5px 0; font-size:14px;"><strong>Quote Reference:</strong> #${shortId}</p>
                <p style="margin:5px 0; font-size:14px;"><strong>Status:</strong> Completed</p>
                <p style="margin:5px 0; font-size:14px;"><strong>Material Category:</strong> ${categoryLabel}</p>
              </div>

              <p style="font-size:15px; line-height:1.6; color:#5A6C7D;">
                Your formal branded PDF quote and technical compliance sheet has been compiled and is ready for download. This secure link is valid for 7 days:
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${signedUrl}" target="_blank" style="background-color:#0047AB; color:#ffffff; padding:12px 30px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:15px; display:inline-block; box-shadow:0 4px 15px rgba(0,71,171,0.25);">
                  📥 Download Branded Quote PDF
                </a>
              </div>

              <p style="font-size:13px; color:#5A6C7D; font-style:italic; text-align:center;">
                Note: You can also access this document and track your request history anytime in your <a href="http://localhost:5500/dashboard.html" style="color:#0047AB; text-decoration:none; font-weight:600;">Client Dashboard</a>.
              </p>
            </div>

            <div style="border-top:1px solid #E1E8ED; padding-top:20px; text-align:center; font-size:12px; color:#5A6C7D;">
              <p style="margin:0 0 5px 0;"><strong>BuildPro UK Commercial Solutions</strong></p>
              <p style="margin:0 0 15px 0;">123 Construction Way, London, EC1A 1BB</p>
              <p style="margin:0;">Need assistance? Contact us at <a href="mailto:info@buildprouk.co.uk" style="color:#0047AB; text-decoration:none;">info@buildprouk.co.uk</a></p>
            </div>
          </div>
        `
      })
    });

    const resJson = await response.json();
    console.log(`[Quote Worker] Email dispatched successfully. Resend Response ID:`, resJson.id || resJson);

    // If configured, send admin alert copy
    if (config.admin_notification_email && config.admin_notification_email !== clientEmail) {
      await sendAdminAlertEmail(quote, signedUrl);
    }
  } catch (err) {
    console.error(`[Quote Worker] Failed to send email via Resend API:`, err.message);
  }
}

// Send admin copy notification
async function sendAdminAlertEmail(quote, signedUrl) {
  const shortId = quote.id.substring(0, 8).toUpperCase();
  const clientName = `${quote.fname} ${quote.lname}`;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.resend_api_key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `BuildPro UK System <${config.resend_from_email}>`,
        to: config.admin_notification_email,
        subject: `[ADMIN ALERT] Quote Completed & Sent - #${shortId}`,
        html: `
          <h3>Admin Notification Alert</h3>
          <p>A customer's quote request has been processed and completed.</p>
          <ul>
            <li><strong>Quote ID:</strong> #${shortId}</li>
            <li><strong>Customer:</strong> ${clientName} (${quote.email})</li>
            <li><strong>Category:</strong> ${quote.category.toUpperCase()}</li>
            <li><strong>Branded Document PDF:</strong> <a href="${signedUrl}">Download PDF Link</a></li>
          </ul>
          <p>The client has been notified via email with their secure download link.</p>
        `
      })
    });
    console.log(`[Quote Worker] Admin alert copy dispatched to ${config.admin_notification_email}`);
  } catch (err) {
    console.error(`[Quote Worker] Failed to send admin alert email:`, err.message);
  }
}

async function processCompletedQuotes() {
  console.log('[Quote Worker] Scanning for completed quotes without PDF links...');
  
  try {
    // Reload configurations on every cycle in case admin modified settings
    await loadConfig();

    const { data, error } = await sb
      .from('quote_requests')
      .select('*')
      .eq('status', 'Completed')
      .is('pdf_url', null);

    if (error) throw error;

    if (!data || data.length === 0) {
      console.log('[Quote Worker] No pending completed quotes found.');
      return;
    }

    console.log(`[Quote Worker] Found ${data.length} completed quote(s) to compile.`);

    for (const quote of data) {
      console.log(`\n--- Processing Quote #${quote.id} ---`);
      
      const tempFilename = `quote_${quote.id.substring(0,8)}.pdf`;
      const tempPath = path.join(__dirname, tempFilename);

      try {
        // 1. Generate Branded PDF
        console.log(`[Quote Worker] Generating PDF: ${tempFilename}`);
        await generateQuotePdfFile(quote, tempPath);

        // 2. Upload to Supabase Storage Bucket
        console.log(`[Quote Worker] Uploading PDF to Storage quotes bucket...`);
        const fileBuffer = fs.readFileSync(tempPath);
        const storagePath = `${quote.id}.pdf`;

        const { error: uploadError } = await sb.storage
          .from('quotes')
          .upload(storagePath, fileBuffer, {
            contentType: 'application/pdf',
            upsert: true
          });

        if (uploadError) throw uploadError;
        console.log(`[Quote Worker] PDF uploaded to storage at: quotes/${storagePath}`);

        // 3. Create a Signed URL valid for 7 days (604800 seconds)
        console.log(`[Quote Worker] Creating signed access URL...`);
        const { data: signedData, error: signedError } = await sb.storage
          .from('quotes')
          .createSignedUrl(storagePath, 604800);

        if (signedError) throw signedError;
        const signedUrl = signedData.signedUrl;
        console.log(`[Quote Worker] Signed URL generated.`);

        // 4. Update the quote record in DB with the URL
        console.log(`[Quote Worker] Updating database record with PDF URL...`);
        const { error: updateError } = await sb
          .from('quote_requests')
          .update({ pdf_url: signedUrl, updated_at: new Date().toISOString() })
          .eq('id', quote.id);

        if (updateError) throw updateError;
        console.log(`[Quote Worker] Database record updated successfully.`);

        // 5. Fire email notification via Resend
        await sendResendEmail(quote, signedUrl);

      } catch (procErr) {
        console.error(`[Quote Worker] Failed to process quote #${quote.id}:`, procErr.message);
      } finally {
        // Clean up local temp file
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
          console.log(`[Quote Worker] Cleaned up temporary file: ${tempFilename}`);
        }
      }
    }
  } catch (err) {
    console.error('[Quote Worker] Polling error:', err.message);
  }
}

async function start() {
  console.log('===================================================');
  console.log('BuildPro UK Automated PDF & Resend Worker Starting');
  console.log('===================================================');
  
  await ensureBucketExists();
  await loadConfig();
  
  // Run immediately
  await processCompletedQuotes();
  
  // Set polling interval
  setInterval(processCompletedQuotes, POLL_INTERVAL_MS);
  console.log(`[Quote Worker] Polling loop started (scanning every ${POLL_INTERVAL_MS / 1000}s)...`);
}

start().catch(console.error);
