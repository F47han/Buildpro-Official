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
      emailRedirectTo: window.location.origin + '/login.html',
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
  
  // Render verification banner if applicable
  renderVerificationBanner(!!user, verified);

  return verified;
}

// ─────────────────────────────────────────────
// PRICE VISIBILITY HELPER
// ─────────────────────────────────────────────
function applyPriceVisibility(canSeePrices, isLoggedIn = false) {
  // Inject price-button styles if not already present
  if (!document.getElementById('auth-price-styles')) {
    const style = document.createElement('style');
    style.id = 'auth-price-styles';
    style.textContent = `
      .price-login-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        color: inherit;
        text-decoration: none;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        height: 100%;
        justify-content: center;
      }
      .price.price-hidden {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }
      .price.price-hidden:hover {
        background-color: var(--border-gray, #E1E8ED) !important;
        border-color: var(--text-gray, #5A6C7D) !important;
        transform: translateY(-1px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('.price').forEach(el => {
    if (!el.dataset.realPrice) {
      // Store the original price text the first time
      el.dataset.realPrice = el.textContent.trim();
    }
    if (canSeePrices) {
      el.innerHTML = el.dataset.realPrice;
      el.style.visibility = 'visible';
      el.classList.remove('price-hidden');
    } else if (isLoggedIn) {
      el.innerHTML = '📧 Verify your email to view prices';
      el.style.visibility = 'visible';
      el.classList.add('price-hidden');
    } else {
      el.innerHTML = '<a href="login.html" class="price-login-btn">🔒 Log In / Sign Up to see prices</a>';
      el.style.visibility = 'visible';
      el.classList.add('price-hidden');
    }
  });
}

// ─────────────────────────────────────────────
// EMAIL VERIFICATION BANNER RENDERER
// ─────────────────────────────────────────────
function renderVerificationBanner(isLoggedIn, isVerified) {
  const existing = document.querySelector('.verify-alert-banner');
  if (existing) {
    existing.remove();
  }

  if (isLoggedIn && !isVerified) {
    if (!document.getElementById('verify-banner-styles')) {
      const style = document.createElement('style');
      style.id = 'verify-banner-styles';
      style.textContent = `
        .verify-alert-banner {
          background: #FFF3E0;
          border-bottom: 2px solid #FFE0B2;
          color: #D84315;
          padding: 0.85rem 1.25rem;
          text-align: center;
          font-size: 0.95rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 2100;
          box-shadow: 0 2px 10px rgba(216, 67, 21, 0.05);
          width: 100%;
        }
        .verify-resend-btn {
          background: #D84315;
          color: white;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
          min-height: 32px;
          display: inline-flex;
          align-items: center;
        }
        .verify-resend-btn:hover {
          background: #BF360C;
        }
        .verify-resend-btn:disabled {
          background: #FFCCBC;
          color: #FF5722;
          cursor: not-allowed;
        }
      `;
      document.head.appendChild(style);
    }

    const banner = document.createElement('div');
    banner.className = 'verify-alert-banner';
    banner.innerHTML = `
      <span>📧 Please verify your email to unlock trade prices. Check your inbox for a confirmation link.</span>
      <button onclick="resendVerificationEmail()" class="verify-resend-btn">Resend Link</button>
    `;
    
    if (document.body) {
      document.body.prepend(banner);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.prepend(banner);
      });
    }
  }
}

// Resend verification link
async function resendVerificationEmail() {
  const btn = document.querySelector('.verify-resend-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Sending...';
  }
  try {
    const { data: { user } } = await sb.auth.getUser();
    if (!user || !user.email) {
      throw new Error('No logged-in user or email found.');
    }
    const { error } = await sb.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: window.location.origin + '/login.html'
      }
    });
    if (error) throw error;
    alert('Verification link has been sent to ' + user.email);
    if (btn) btn.innerText = 'Sent!';
  } catch (err) {
    alert('Failed to resend: ' + err.message);
    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Resend Link';
    }
  }
}

// Expose resend function to window context
window.resendVerificationEmail = resendVerificationEmail;

// ─────────────────────────────────────────────
// UPDATE NAV: swap Login/Signup links for Logout
// ─────────────────────────────────────────────
function updateNavForAuth(user) {
  // Logout buttons (elements with data-logout)
  document.querySelectorAll('[data-logout]').forEach(btn => {
    // Override CSS display:none explicitly
    btn.style.setProperty('display', user ? 'inline-flex' : 'none', 'important');
  });
  // Login/Signup links (elements with data-auth-hide)
  document.querySelectorAll('[data-auth-hide]').forEach(el => {
    el.style.setProperty('display', user ? 'none' : 'inline-flex', 'important');
  });
  // Show username if element exists
  document.querySelectorAll('[data-username]').forEach(nameEl => {
    if (user) {
      nameEl.textContent = user.user_metadata?.fname
        ? 'Hi, ' + user.user_metadata.fname
        : 'Hi, User';
      nameEl.style.setProperty('display', 'inline-block', 'important');
    } else {
      nameEl.style.setProperty('display', 'none', 'important');
    }
  });
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
  renderVerificationBanner(!!user, verified);
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
  renderVerificationBanner(!!user, verified);
});
