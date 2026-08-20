import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    products: PRODUCTS,
    count: PRODUCTS.length,
  });
}
