// ──────────────────────────────────────────
// RESIKKU ESSENTIALS — Product & Testimonial Data
// Single source of truth shared by frontend and API
// ──────────────────────────────────────────

export type ProductIcon =
  | "lavender"
  | "greentea"
  | "citrus"
  | "rose"
  | "baby"
  | "charcoal"
  | "eucalyptus";

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: "bath" | "hand" | "travel";
  categoryLabel: string;
  price: number;
  rating: number;
  icon: ProductIcon;
  image: string;
  accentColor: string;
  sheetColor: string;
  scent: string;
  gradient: string;
  description: string;
  fullDescription: string;
  sheets: number;
  popularity: number;
  tag: string;
  isNew: boolean;
  inStock: boolean;
  isBundle?: boolean;
  bundleItems?: number[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  initial: string;
  rating: number;
  text: string;
}

// ──────────────────────────────────────────
// PRODUCTS (2 Signature Variants)
// ──────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Matcha Mint",
    slug: "matcha-mint",
    category: "hand",
    categoryLabel: "Cuci Tangan",
    price: 15000,
    rating: 5,
    icon: "greentea",
    image: "/images/Matcha-Mint.jpeg",
    accentColor: "#4c825f",
    sheetColor: "#d6eddc",
    scent: "Japanese Matcha & Peppermint",
    gradient:
      "linear-gradient(135deg, hsl(140 40% 90%), hsl(155 35% 78%))",
    description:
      "Perpaduan matcha Jepang dan mint yang menyegarkan untuk menjaga tangan tetap bersih dan lembut.",
    fullDescription:
      "Matcha Mint menghadirkan kesegaran teh hijau dan peppermint dalam lembaran sabun praktis. Larut cepat menjadi busa lembut, ideal untuk menjaga kebersihan tangan di rumah maupun saat bepergian.",
    sheets: 30,
    popularity: 95,
    tag: "Best Seller",
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Sweet Cherry",
    slug: "sweet-cherry",
    category: "hand",
    categoryLabel: "Cuci Tangan",
    price: 15000,
    rating: 5,
    icon: "rose",
    image: "/images/Sweet-Cheerry.jpeg",
    accentColor: "#8f1835",
    sheetColor: "#f4d9df",
    scent: "Sweet Cherry Blossom",
    gradient:
      "linear-gradient(135deg, hsl(345 55% 95%), hsl(350 45% 84%))",
    description:
      "Aroma cherry manis dan lembut yang membuat rutinitas cuci tangan terasa lebih menyenangkan.",
    fullDescription:
      "Sweet Cherry memadukan aroma buah cherry yang manis dengan nuansa floral lembut. Lembaran sabun ultra-tipis ini praktis dibawa dan menghasilkan busa lembut tanpa terasa kering di kulit.",
    sheets: 30,
    popularity: 88,
    tag: "Favorit Baru",
    isNew: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Duo Varian",
    slug: "duo-varian",
    category: "hand",
    categoryLabel: "Bundle Hemat",
    price: 25000,
    rating: 5,
    icon: "greentea",
    image: "/images/Matcha-Mint.jpeg",
    accentColor: "#b8872f",
    sheetColor: "#e9e0c8",
    scent: "Matcha Mint & Sweet Cherry",
    gradient:
      "linear-gradient(135deg, hsl(145 35% 85%), hsl(345 45% 88%))",
    description:
      "Dua varian Resikku dalam satu bundle hemat: Matcha Mint dan Sweet Cherry.",
    fullDescription:
      "Duo Varian menghadirkan Matcha Mint dan Sweet Cherry dalam satu paket praktis. Dapatkan dua aroma berbeda dengan harga spesial untuk menemani kebutuhan kebersihan sehari-hari.",
    sheets: 60,
    popularity: 98,
    tag: "Bundle Hemat",
    isNew: true,
    inStock: true,
    isBundle: true,
    bundleItems: [1, 2],
  },
];

// ──────────────────────────────────────────
// TESTIMONIALS
// ──────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sari Wulandari",
    role: "Ibu Rumah Tangga • Jakarta",
    initial: "S",
    rating: 5,
    text: '"Praktis banget buat dibawa ke mana-mana! Anak-anak jadi rajin cuci tangan karena bentuknya sabun kertas unik dan langsung berbusa banyak saat kena air."',
  },
  {
    id: 2,
    name: "Andi Prasetyo",
    role: "Travel Blogger • Bali",
    initial: "A",
    rating: 5,
    text: '"Selalu bawa Matcha Mint ke setiap trip. Nggak makan tempat di backpack, anti bocor, dan aromanya super segar!"',
  },
  {
    id: 3,
    name: "dr. Dina Rahmawati",
    role: "Dokter Spesialis Kulit • Bandung",
    initial: "D",
    rating: 5,
    text: '"Sebagai dermatologis, saya rekomendasikan Resikku untuk keluarga. Bebas SLS, paraben, dan sangat lembut di kulit."',
  },
  {
    id: 4,
    name: "Reza Firmansyah",
    role: "Trail Runner & Hiker • Malang",
    initial: "R",
    rating: 5,
    text: '"Game changer buat outdoor! Dulu repot bawa sabun cair yang berat dan sering bocor, sekarang cukup selipkan 1 pack Resikku di rompi lari."',
  },
  {
    id: 5,
    name: "Maya Putri",
    role: "Creative Director • Surabaya",
    initial: "M",
    rating: 5,
    text: '"Packaging-nya super aesthetic dan aromanya mewah setara brand luxury. Selalu ada di pouch makeup saya!"',
  },
  {
    id: 6,
    name: "Budi Santoso",
    role: "Professional • Tangerang",
    initial: "B",
    rating: 5,
    text: '"Satu pack Green Tea ditaruh di saku kemeja. Kalau dinas kantor atau ke resto, cuci tangan jadi lebih higienis tanpa harus pakai sabun umum."',
  },
];

// ──────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────
export function formatPrice(price: number): string {
  return "Rp " + price.toLocaleString("id-ID");
}

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
