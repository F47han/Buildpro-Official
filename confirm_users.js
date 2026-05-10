const url = "https://dyidbpwyzatoihydmkwa.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aWRicHd5emF0b2loeWRta3dhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY2MTkwMSwiZXhwIjoyMDkxMjM3OTAxfQ.VZsRNvXFSOjVFaTRsJAC_65gTVG8p7gGvfuzm30GP8o";

async function confirmUsers() {
  console.log("Fetching users from Supabase...");
  
  // 1. Get all users
  const res = await fetch(`${url}/auth/v1/admin/users`, {
    headers: {
      'Authorization': `Bearer ${key}`,
      'apikey': key,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    console.error("Failed to fetch users:", await res.text());
    return;
  }

  const data = await res.json();
  const users = data.users || [];
  console.log(`Found ${users.length} total users.`);

  let confirmedCount = 0;

  // 2. Loop through users and confirm those who aren't confirmed
  for (const user of users) {
    if (!user.email_confirmed_at) {
      console.log(`Confirming user: ${user.email} (ID: ${user.id})...`);
      
      const updateRes = await fetch(`${url}/auth/v1/admin/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${key}`,
          'apikey': key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_confirm: true })
      });

      if (updateRes.ok) {
        console.log(`✅ Successfully confirmed ${user.email}`);
        confirmedCount++;
      } else {
        console.error(`❌ Failed to confirm ${user.email}:`, await updateRes.text());
      }
    }
  }

  if (confirmedCount === 0) {
    console.log("No unconfirmed users found. Everyone is already confirmed!");
  } else {
    console.log(`\n🎉 Successfully confirmed ${confirmedCount} users! You can now log in with them.`);
  }
}

confirmUsers().catch(console.error);
