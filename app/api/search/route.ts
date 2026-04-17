import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/supabase/queries";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const locale = searchParams.get("locale") ?? "ru";

  if (!query.trim()) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await searchProducts(query, locale);
    return NextResponse.json({ products });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ products: [] });
  }
}
