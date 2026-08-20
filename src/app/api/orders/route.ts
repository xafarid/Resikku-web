import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { getProductById } from "@/lib/products";

const orderItemSchema = z.object({
  id: z.number().int().positive(),
  qty: z.number().int().positive(),
});

const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  customerName: z.string().max(100).optional(),
  customerPhone: z.string().max(30).optional(),
  notes: z.string().max(500).optional(),
});

// POST: create a new order (called before WhatsApp redirect)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data pesanan tidak valid.", details: parsed.error.flatten() },
        { status: 422 }
      );
    }
    const { items, customerName, customerPhone, notes } = parsed.data;

    // Compute total from server-side product data (never trust client prices)
    let totalAmount = 0;
    const validatedItems: Array<{
      id: number;
      name: string;
      qty: number;
      price: number;
      subtotal: number;
    }> = [];

    for (const it of items) {
      const product = getProductById(it.id);
      if (!product) {
        return NextResponse.json(
          { error: `Produk dengan ID ${it.id} tidak ditemukan.` },
          { status: 404 }
        );
      }
      const lineTotal = product.price * it.qty;
      totalAmount += lineTotal;
      validatedItems.push({
        id: product.id,
        name: product.name,
        qty: it.qty,
        price: product.price,
        subtotal: lineTotal,
      });
    }

    const order = await db.order.create({
      data: {
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        itemsJson: JSON.stringify(validatedItems),
        totalAmount,
        notes: notes || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        totalAmount,
        itemCount: validatedItems.reduce((s, i) => s + i.qty, 0),
        createdAt: order.createdAt,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[orders] POST error:", err);
    return NextResponse.json(
      { error: "Gagal membuat pesanan. Coba lagi nanti." },
      { status: 500 }
    );
  }
}

// GET: list recent orders (for future admin dashboard)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);

    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        customerName: true,
        totalAmount: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ orders, count: orders.length });
  } catch (err) {
    console.error("[orders] GET error:", err);
    return NextResponse.json(
      { error: "Gagal mengambil daftar pesanan." },
      { status: 500 }
    );
  }
}
