import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, product_id, product_name } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      email: email || null,
      message: message || null,
      product_id: product_id || null,
      status: "new",
    });

    if (error) throw error;

    // Send email notification if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "noreply@labtech.kz",
          to: process.env.NOTIFICATION_EMAIL ?? "info@labtech.kz",
          subject: `Новая заявка с сайта labtech.kz${product_name ? ` — ${product_name}` : ""}`,
          text: [
            `Новая заявка с сайта labtech.kz`,
            product_name ? `Товар: ${product_name}` : "",
            `Имя: ${name}`,
            `Телефон: ${phone}`,
            email ? `Email: ${email}` : "",
            message ? `Сообщение: ${message}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
