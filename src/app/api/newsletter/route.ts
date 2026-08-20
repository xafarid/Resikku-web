import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Seluruh kode prisma/database lama dihapus, langsung return sukses
  return NextResponse.json({ 
    success: true, 
    message: "Berhasil terhubung tanpa database!" 
  })
}