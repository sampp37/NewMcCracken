import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const BUILD_STAMP = "v-2026-07-15-fix-leads-fields";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify({ buildStamp: BUILD_STAMP, ...body }), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log("resend-email payload received:", { keys: Object.keys(payload ?? {}), buildStamp: BUILD_STAMP });

    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const phone = String(payload?.phone ?? "").trim();
    const message = String(payload?.message ?? "").trim();

    if (!name || !phone) {
      return jsonResponse({ error: "Name and phone are required" }, 400);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return jsonResponse({ error: "Supabase env vars missing in edge function" }, 500);
    }

    const insertBody = {
      name,
      phone,
      email,
      message,
      details: message,
    };
    console.log("resend-email insert body:", insertBody);

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(insertBody),
    });

    const insertText = await insertRes.text();
    console.log("resend-email insert response:", { status: insertRes.status, body: insertText });

    if (!insertRes.ok) {
      return jsonResponse({ error: "Lead insert failed", status: insertRes.status, body: insertText }, 500);
    }

    let leadId: string | null = null;
    try {
      const parsed = JSON.parse(insertText);
      if (Array.isArray(parsed) && parsed[0]?.id) leadId = parsed[0].id;
    } catch (_) {
      // ignore parse issues; insert was OK by status
    }

    if (!RESEND_API_KEY) {
      return jsonResponse({ success: true, leadId, emailSent: false, warning: "RESEND_API_KEY not configured" });
    }

    const displayMessage = message ? escapeHtml(message) : "No message provided";
    const displayEmail = email ? escapeHtml(email) : "Not provided";
    const displayName = escapeHtml(name);
    const displayPhone = escapeHtml(phone);

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "McCracken Painting <leads@palai.biz>",
        to: ["sampp37@gmail.com"],
        subject: `New Lead: ${name}`,
        html: `
          <h2>New Lead from McCracken Painting Website</h2>
          <p><strong>Name:</strong> ${displayName}</p>
          <p><strong>Email:</strong> ${displayEmail}</p>
          <p><strong>Phone:</strong> ${displayPhone}</p>
          <p><strong>Message:</strong> ${displayMessage}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error("Resend email failed:", emailRes.status, errBody);
      return jsonResponse({ success: true, leadId, emailSent: false, resendError: errBody });
    }

    const emailData = await emailRes.json();
    return jsonResponse({ success: true, leadId, emailSent: true, emailId: emailData.id });
  } catch (err) {
    console.error("resend-email fatal:", err);
    return jsonResponse({ error: String(err) }, 500);
  }
});
