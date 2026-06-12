const fs = require('fs');

async function run() {
  const url = "https://api.supabase.com/v1/projects/dyidbpwyzatoihydmkwa/database/query";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aWRicHd5emF0b2loeWRta3dhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY2MTkwMSwiZXhwIjoyMDkxMjM3OTAxfQ.VZsRNvXFSOjVFaTRsJAC_65gTVG8p7gGvfuzm30GP8o";

  const sql = fs.readFileSync('./migration_new_electrical_products.sql', 'utf8');

  console.log("Running migration_new_electrical_products.sql...");
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text.substring(0, 2000));
}

run().catch(console.error);
