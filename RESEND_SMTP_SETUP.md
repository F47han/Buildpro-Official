# Connecting Resend Custom SMTP to Supabase (BuildPro UK)

To bypass Supabase's default limit of 2 registration/verification emails per hour and send branded emails from a `buildprouk.co.uk` domain, you must configure a custom SMTP provider before going live.

This guide provides step-by-step instructions on setting up Resend (free tier) and connecting it to the Supabase dashboard.

---

## Step 1: Set Up & Verify Domain in Resend

1. Go to [Resend.com](https://resend.com) and create a free account.
2. In the Resend Sidebar, navigate to **Domains** and click **Create Domain**.
3. Enter your domain: `buildprouk.co.uk` (or the registered domain you are using) and click **Add**.
4. Resend will provide DNS records (SPF, DKIM, and MX). Log in to your domain registrar (e.g. GoDaddy, Namecheap, Route 53) and add these records.
5. Wait for the domain status to show **Verified** (usually takes a few minutes, up to 24 hours depending on DNS propagation).

---

## Step 2: Create a Resend API Key

1. In the Resend Sidebar, navigate to **API Keys** and click **Create API Key**.
2. Name the key (e.g., `Supabase Integration`).
3. Set the role to **Sending Access** (or Full Access).
4. Select your domain (`buildprouk.co.uk`).
5. Click **Add** and copy the generated API key (it starts with `re_...`). Keep this key secure.

---

## Step 3: Configure Custom SMTP in Supabase

1. Open the [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. Go to **Project Settings** > **Authentication** > **SMTP Settings** (or Dashboard > Authentication > Settings > SMTP).
3. Toggle **Enable Custom SMTP** to **ON**.
4. Fill in the following SMTP configuration details:

| Field | Configuration Value | Note |
| :--- | :--- | :--- |
| **Sender Email** | `noreply@buildprouk.co.uk` | Must use your verified Resend domain |
| **Sender Name** | `BuildPro UK` | Friendly sender name visible to clients |
| **SMTP Host** | `smtp.resend.com` | Resend's dedicated SMTP server |
| **Port** | `465` (SSL) or `587` (TLS) | Standard secure ports |
| **Username** | `resend` | Always literal `resend` |
| **Password** | `<YOUR_RESEND_API_KEY>` | The API key copied in Step 2 (`re_...`) |

5. Click **Save** at the bottom of the page.

---

## Step 4: Configure the Redirect URL for Email Verification

1. In the Supabase Dashboard, navigate to **Authentication** > **URL Configuration**.
2. Ensure that under **Redirect URLs**, the address `https://<YOUR_GITHUB_PAGES_URL>/login.html` (or your staging/live domain) is added so that when clients click the link in their email, they are directed to the login page where their verification hash is parsed and auto-logged in.
3. In **Authentication** > **Email Templates**, customize the "Confirm signup" template:
   - **Subject**: `Confirm your registration with BuildPro UK`
   - **Body**: Custom branded HTML with your company address, contact information, and logo.
   - Example:
     ```html
     <h2>Welcome to BuildPro UK!</h2>
     <p>Please click the link below to verify your email address and unlock your trade account pricing:</p>
     <p><a href="{{ .ConfirmationURL }}">Confirm Your Account &rarr;</a></p>
     <p>If you did not request this, you can safely ignore this email.</p>
     <hr/>
     <p><small>BuildPro UK Ltd | 123 Construction Way, London, EC1A 1BB</small></p>
     ```

---

## Step 5: Test the Integration

1. Go to the BuildPro UK website.
2. Register a new account with a valid email.
3. Check the inbox of that email. You should receive a registration confirmation email sent from `BuildPro UK <noreply@buildprouk.co.uk>` via Resend.
4. Click the confirmation link. You will be redirected back to `login.html`, see a **🎉 Account Verified!** success banner, and automatically log in to view trade prices.
