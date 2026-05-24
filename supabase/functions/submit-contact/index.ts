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
    const { name, phone_number, details } = body;

    if (!name || !String(name).trim()) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!phone_number || !String(phone_number).trim()) {
      return new Response(
        JSON.stringify({ error: "Phone number is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const cleanName = String(name).trim();
    const cleanPhone = String(phone_number).trim();
    const cleanDetails = details ? String(details).trim() || null : null;

    const { error: dbError } = await supabase.rpc('submit_contact_request', {
      p_name: cleanName,
      p_phone: cleanPhone,
      p_details: cleanDetails,
    });

    if (dbError) {
      console.error("RPC error, trying direct SQL:", dbError);
      const { error: sqlError } = await supabase.from('_dummy_fallback_').select().limit(0);
      const dbUrl = Deno.env.get("SUPABASE_DB_URL");
      if (dbUrl) {
        const { default: postgres } = await import("npm:postgres@3.4.4");
        const sql = postgres(dbUrl);
        await sql`
          INSERT INTO public.contact_requests (name, phone_number, details)
          VALUES (${cleanName}, ${cleanPhone}, ${cleanDetails})
        `;
        await sql.end();
      } else {
        return new Response(
          JSON.stringify({ error: dbError.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
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
