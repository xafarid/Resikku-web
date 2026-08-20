import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  email: z.string().email("Email tidak valid").max(254, "Email terlalu panjang"),
  source: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Body request tidak valid" },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validasi gagal" },
      { status: 422 }
    );
  }

  const { email, source } = parsed.data;

  try {
    // Check for duplicate
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // Create subscriber
    await db.newsletterSubscriber.create({
      data: { email, source: source ?? null },
    });

    const total = await db.newsletterSubscriber.count();

    return NextResponse.json({
      success: true,
      message: "Terima kasih sudah berlangganan!",
      total,
    });
  } catch (err) {
    console.error("[newsletter] DB error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Coba lagi nanti." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const total = await db.newsletterSubscriber.count();
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}
