import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { TESTIMONIALS } from "@/lib/products";
import { z } from "zod";

// GET returns seed testimonials merged with user-submitted ones
export async function GET() {
  try {
    const userSubmitted = await db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Map DB rows to Testimonial shape (initial derived from name)
    const userRows = userSubmitted.map((t, idx) => ({
      id: 1000 + idx,
      name: t.name,
      role: t.role,
      initial: t.initial || t.name.trim().charAt(0).toUpperCase(),
      rating: t.rating,
      text: t.text,
    }));

    return NextResponse.json({
      testimonials: [...userRows, ...TESTIMONIALS],
      count: userRows.length + TESTIMONIALS.length,
      userSubmittedCount: userRows.length,
    });
  } catch {
    // Fallback to seed data if DB not available
    return NextResponse.json({
      testimonials: TESTIMONIALS,
      count: TESTIMONIALS.length,
    });
  }
}

const testimonialSchema = z.object({
  name: z.string().min(2).max(50),
  role: z.string().max(80).optional().default("Pelanggan Setia"),
  rating: z.number().int().min(1).max(5).default(5),
  text: z.string().min(20).max(400),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data tidak valid.", details: parsed.error.flatten() },
        { status: 422 }
      );
    }
    const { name, role, rating, text } = parsed.data;
    const initial = name.trim().charAt(0).toUpperCase();

    const created = await db.testimonial.create({
      data: {
        name,
        role,
        rating,
        text,
        initial,
      },
    });

    return NextResponse.json(
      { success: true, id: created.id, message: "Ulasan berhasil dikirim" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[testimonials] POST error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan ulasan. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
