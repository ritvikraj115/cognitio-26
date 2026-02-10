// ── Supabase config ──────────────────────────────────────────────
// Replace these with your Supabase project values (Settings → API)
const SUPABASE_URL = "https://zbliznzntjrzfzftpalh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FlSP5ArqhEj0i1yytQ9pdQ_xGLK4yLX";
// ─────────────────────────────────────────────────────────────────

export async function sendToSheet(formData) {
  const events = Array.isArray(formData.events)
    ? formData.events.join(", ")
    : formData.events;

  const row = {
    first_name: formData.firstName.trim(),
    last_name: formData.lastName.trim(),
    registration_number: formData.registrationNumber.trim().toUpperCase(),
    email: formData.email.trim(),
    branch: formData.branch.trim(),
    events,
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (res.ok || res.status === 201) {
    return { status: "success" };
  }

  const err = await res.json().catch(() => ({}));
  throw new Error(err.message || `Submission failed (${res.status})`);
}

export async function sendContactForm({ name, email, subject, message }) {
  const row = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (res.ok || res.status === 201) {
    return { status: "success" };
  }

  const err = await res.json().catch(() => ({}));
  throw new Error(err.message || `Submission failed (${res.status})`);
}
