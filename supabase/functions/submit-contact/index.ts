import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, phone, service, message, best_day_to_call, best_time_to_reach } = body;

    if (!name || !email || !service || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, service, message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("contact_requests").insert({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      service: String(service).trim(),
      message: String(message).trim(),
      best_day_to_call: best_day_to_call ? String(best_day_to_call).trim() : null,
      best_time_to_reach: best_time_to_reach ? String(best_time_to_reach).trim() : null,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: dbError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const emailBody = `
<h2>New Contact Form Submission</h2>
<table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Name</td><td style="padding:8px;">${String(name).trim()}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px;">${String(email).trim()}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Phone</td><td style="padding:8px;">${phone ? String(phone).trim() : '—'}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Service</td><td style="padding:8px;">${String(service).trim()}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Best Day to Call</td><td style="padding:8px;">${best_day_to_call ? String(best_day_to_call).trim() : '—'}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Best Time</td><td style="padding:8px;">${best_time_to_reach ? String(best_time_to_reach).trim() : '—'}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Message</td><td style="padding:8px;">${String(message).trim()}</td></tr>
</table>
      `.trim();

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "McCracken Painting <onboarding@resend.dev>",
          to: ["sampp37@gmail.com"],
          subject: `New Quote Request from ${String(name).trim()}`,
          html: emailBody,
        }),
      }).catch((err) => console.error("Resend error:", err));
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
