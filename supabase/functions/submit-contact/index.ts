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
    const { name, email, phone, service, message, best_day_to_call, best_time_to_reach, _emailOnly } = body;

    if (!name || !email || !service || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Only insert into DB when not email-only mode
    if (!_emailOnly) {
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
    }

    // Send notification email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const emailHtml = `
<h2 style="color:#1a3a9e;">New Contact Form Submission — McCracken Painting</h2>
<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:15px;">
  <tr><td style="padding:10px 12px;font-weight:bold;background:#f0f4ff;width:160px;">Name</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${String(name).trim()}</td></tr>
  <tr><td style="padding:10px 12px;font-weight:bold;background:#f0f4ff;">Email</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${String(email).trim()}</td></tr>
  <tr><td style="padding:10px 12px;font-weight:bold;background:#f0f4ff;">Phone</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${phone ? String(phone).trim() : '—'}</td></tr>
  <tr><td style="padding:10px 12px;font-weight:bold;background:#f0f4ff;">Service</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${String(service).trim()}</td></tr>
  <tr><td style="padding:10px 12px;font-weight:bold;background:#f0f4ff;">Best Day</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${best_day_to_call ? String(best_day_to_call).trim() : '—'}</td></tr>
  <tr><td style="padding:10px 12px;font-weight:bold;background:#f0f4ff;">Best Time</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${best_time_to_reach ? String(best_time_to_reach).trim() : '—'}</td></tr>
  <tr><td style="padding:10px 12px;font-weight:bold;background:#f0f4ff;">Message</td><td style="padding:10px 12px;">${String(message).trim()}</td></tr>
</table>
      `.trim();

      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "McCracken Painting <onboarding@resend.dev>",
            to: ["sampp37@gmail.com"],
            subject: `New Quote Request from ${String(name).trim()}`,
            html: emailHtml,
          }),
        });
        const resendBody = await resendRes.text();
        console.log("Resend status:", resendRes.status, "body:", resendBody);
        if (_emailOnly) {
          return new Response(
            JSON.stringify({ success: resendRes.ok, resend_status: resendRes.status, resend_body: resendBody }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } catch (err) {
        console.error("Resend error:", err);
        if (_emailOnly) {
          return new Response(
            JSON.stringify({ success: false, error: String(err) }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    } else if (_emailOnly) {
      return new Response(
        JSON.stringify({ success: false, error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
