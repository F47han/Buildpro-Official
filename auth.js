// auth.js — Authentication helpers for BuildPro UK
// Depends on: supabase.js (must be loaded first)

// ─────────────────────────────────────────────
// SIGN UP
// ─────────────────────────────────────────────
async function signUp(email, password, metadata = {}) {
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/builder.html',
      data: metadata
    }
  });
  if (error) throw error;
  return data;
}

// ─────────────────────────────────────────────
// SIGN IN
// ─────────────────────────────────────────────
async function signIn(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// ─────────────────────────────────────────────
// SIGN OUT
// ─────────────────────────────────────────────
async function signOut() {
  const { error } = await sb.auth.signOut();
  if (error) throw error;
  window.location.href = 'builder.html';
}

// ─────────────────────────────────────────────
// GET CURRENT USER (returns null if not logged in)
// ─────────────────────────────────────────────
async function getCurrentUser() {
  const { data: { user } } = await sb.auth.getUser();
  return user;
}

// ─────────────────────────────────────────────
// REQUIRE AUTH
// Call on any protected page. If not logged in:
//   - Hides real prices
//   - Replaces .price text with "Login to view price"
//   - Does NOT redirect — prices simply stay hidden
//   - Sets window.__isLoggedIn for page scripts to read
// ─────────────────────────────────────────────
async function requireAuth() {
  const user = await getCurrentUser();
  const verified = user && !!user.email_confirmed_at;
  window.__isLoggedIn = !!user;
  window.__isVerified = !!verified;

  // Hide or show prices depending on auth state
  applyPriceVisibility(verified, !!user);

  return verified;
}

// ─────────────────────────────────────────────
// PRICE VISIBILITY HELPER
// ─────────────────────────────────────────────
function applyPriceVisibility(canSeePrices, isLoggedIn = false) {
  document.querySelectorAll('.price').forEach(el => {
    if (!el.dataset.realPrice) {
      // Store the original price text the first time
      el.dataset.realPrice = el.textContent.trim();
    }
    if (canSeePrices) {
      el.textContent = el.dataset.realPrice;
      el.style.visibility = 'visible';
      el.classList.remove('price-hidden');
    } else if (isLoggedIn) {
      el.textContent = '📧 Verify your email to view prices';
      el.style.visibility = 'visible';
      el.classList.add('price-hidden');
    } else {
      el.textContent = '🔒 Login to view price';
      el.style.visibility = 'visible';
      el.classList.add('price-hidden');
    }
  });
}

// ─────────────────────────────────────────────
// UPDATE NAV: swap Login/Signup links for Logout
// ─────────────────────────────────────────────
function updateNavForAuth(user) {
  // Logout buttons (elements with data-logout)
  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.style.display = user ? '' : 'none';
  });
  // Login/Signup links (elements with data-auth-hide)
  document.querySelectorAll('[data-auth-hide]').forEach(el => {
    el.style.display = user ? 'none' : '';
  });
  // Show username if element exists
  const nameEl = document.querySelector('[data-username]');
  if (nameEl && user) {
    nameEl.textContent = user.user_metadata?.fname
      ? 'Hi, ' + user.user_metadata.fname
      : user.email;
    nameEl.style.display = '';
  }
}

// ─────────────────────────────────────────────
// ON AUTH STATE CHANGE — runs on every page load
// ─────────────────────────────────────────────
sb.auth.onAuthStateChange((_event, session) => {
  const user = session?.user ?? null;
  const verified = user && !!user.email_confirmed_at;
  window.__isLoggedIn = !!user;
  window.__isVerified = !!verified;
  updateNavForAuth(user);
  applyPriceVisibility(verified, !!user);
});

// ─────────────────────────────────────────────
// AUTO-RUN on DOMContentLoaded
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const user = await getCurrentUser();
  const verified = user && !!user.email_confirmed_at;
  window.__isLoggedIn = !!user;
  window.__isVerified = !!verified;
  updateNavForAuth(user);
  applyPriceVisibility(verified, !!user);
});
