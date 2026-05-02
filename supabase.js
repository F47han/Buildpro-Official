// supabase.js — Supabase client initialisation
// Include in every HTML page BEFORE auth.js:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="supabase.js"></script>
//   <script src="auth.js"></script>

const SUPABASE_URL  = 'https://dyidbpwyzatoihydmkwa.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aWRicHd5emF0b2loeWRta3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjE5MDEsImV4cCI6MjA5MTIzNzkwMX0.mW6iYYEU5G8Av6HlZabcmsTjwtZ44nYjF1zTgRJz7RU';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
