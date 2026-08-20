// ──────────────────────────────────────────
// RESIKKU ESSENTIALS — Ingredient Transparency Data
// Each product has a list of key ingredients with benefits
// ──────────────────────────────────────────

import type { ProductIcon } from "@/lib/products";

export interface Ingredient {
  name: string;
  emoji: string;
  benefit: string;
  percentage?: string;
}

export const INGREDIENTS: Record<ProductIcon, Ingredient[]> = {
  lavender: [
    {
      name: "Lavender Oil",
      emoji: "💜",
      benefit: "Menenangkan pikiran & membantu tidur lebih nyenyak. Antibakteri alami.",
      percentage: "2%",
    },
    {
      name: "Sage Extract",
      emoji: "🌿",
      benefit: "Anti-inflamasi yang melembutkan kulit sensitif dan menyeimbangkan pH.",
      percentage: "1.5%",
    },
    {
      name: "Chamomile",
      emoji: "🌼",
      benefit: "Meredakan iritasi dan kemerahan pada kulit. Cocok untuk bayi.",
      percentage: "0.8%",
    },
    {
      name: "Glycerin (Plant-based)",
      emoji: "💧",
      benefit: "Humektan alami yang menjaga kelembapan kulit sepanjang hari.",
      percentage: "3%",
    },
  ],
  greentea: [
    {
      name: "Green Tea Extract",
      emoji: "🍵",
      benefit: "Antioksidan EGCG tinggi yang melindungi & merevitalisasi sel kulit.",
      percentage: "2.5%",
    },
    {
      name: "Peppermint Oil",
      emoji: "🌱",
      benefit: "Antibakteri alami, memberi sensasi dingin & menyegarkan tangan.",
      percentage: "1%",
    },
    {
      name: "Camellia Sinensis",
      emoji: "🍃",
      benefit: "Polyphenol yang menutrisi dan menjaga elastisitas kulit.",
      percentage: "1.2%",
    },
    {
      name: "Aloe Vera",
      emoji: "🪴",
      benefit: "Melembapkan tanpa minyak, cocok untuk kulit berminyak & sensitif.",
      percentage: "2%",
    },
  ],
  citrus: [
    {
      name: "Mandarin Oil",
      emoji: "🍊",
      benefit: "Vitamin C tinggi yang mencerahkan & menyegarkan kulit secara instan.",
      percentage: "1.8%",
    },
    {
      name: "Bergamot",
      emoji: "🍋",
      benefit: "Antiseptik alami yang membantu membersihkan & menyeimbangkan minyak.",
      percentage: "1.2%",
    },
    {
      name: "Sweet Orange",
      emoji: "🟠",
      benefit: "Mood booster dengan aroma ceria yang membangkitkan energi.",
      percentage: "0.8%",
    },
    {
      name: "Vitamin E",
      emoji: "✨",
      benefit: "Antioksidan yang melindungi kulit dari radikal bebas.",
      percentage: "0.5%",
    },
  ],
  baby: [
    {
      name: "Damascus Rose",
      emoji: "🌹",
      benefit: "Menenangkan kulit sensitif bayi & anak. Aroma mawar lembut hypoallergenic.",
      percentage: "1%",
    },
    {
      name: "Chamomile Roman",
      emoji: "🌼",
      benefit: "Anti-inflamasi yang sangat lembut, redakan ruam popok & iritasi.",
      percentage: "1.5%",
    },
    {
      name: "Calendula",
      emoji: "🌻",
      benefit: "Membantu regenerasi sel kulit bayi yang masih tipis & sensitif.",
      percentage: "0.8%",
    },
    {
      name: "Oat Extract",
      emoji: "🌾",
      benefit: "Soothing untuk kulit atopik & eksim. Bebas parfum sintetis.",
      percentage: "1%",
    },
  ],
  charcoal: [
    {
      name: "Activated Bamboo Charcoal",
      emoji: "🖤",
      benefit: "Menyerap minyak berlebih, kotoran pori-pori & racun secara mendalam.",
      percentage: "3%",
    },
    {
      name: "Tea Tree Oil",
      emoji: "🌳",
      benefit: "Antibakteri & antijamur alami yang efektif untuk jerawat.",
      percentage: "1.2%",
    },
    {
      name: "Salicylic Acid (Plant-derived)",
      emoji: "🍃",
      benefit: "BHA yang membantu eksfoliasi pori-pori tersumbat secara halus.",
      percentage: "0.5%",
    },
    {
      name: "Witch Hazel",
      emoji: "🌿",
      benefit: "Astringent alami yang mengecilkan pori & menyeimbangkan pH kulit.",
      percentage: "1%",
    },
  ],
  rose: [
    {
      name: "Damascus Rose",
      emoji: "🌹",
      benefit: "Mencerahkan & melembutkan tekstur kulit. Aroma mawar mewah.",
      percentage: "2%",
    },
    {
      name: "Rosehip Oil",
      emoji: "🥀",
      benefit: "Vitamin A & C yang meregenerasi sel kulit & meredakan bekas jerawat.",
      percentage: "1.5%",
    },
    {
      name: "Geranium",
      emoji: "🌸",
      benefit: "Menyeimbangkan produksi sebum & hormonal untuk kulit dewasa.",
      percentage: "0.8%",
    },
    {
      name: "Hyaluronic Acid (Vegan)",
      emoji: "💧",
      benefit: "Pelembap intens yang dapat menahan 1000x berat airnya.",
      percentage: "0.5%",
    },
  ],
  eucalyptus: [
    {
      name: "Eucalyptus Globulus",
      emoji: "🐨",
      benefit: "Membuka jalan napas, melegakan hidung tersumbat saat flu.",
      percentage: "2.2%",
    },
    {
      name: "Peppermint Oil",
      emoji: "🌱",
      benefit: "Sensasi dingin instan yang menyegarkan napas & meredakan pusing.",
      percentage: "1.5%",
    },
    {
      name: "Camphor (Natural)",
      emoji: "🌫️",
      benefit: "Expektoran alami yang membantu mengencerkan dahak.",
      percentage: "0.8%",
    },
    {
      name: "Rosemary Extract",
      emoji: "🍃",
      benefit: "Antibakteri & stimulasi sirkulasi yang menyegarkan kulit.",
      percentage: "1%",
    },
  ],
};

// Common base ingredients (added in labels)
export const BASE_INGREDIENTS = [
  { name: "Sodium Cocoyl Isethionate", note: "Surfaktan kelapa super lembut" },
  { name: "Decyl Glucoside", note: "Pembersih plant-based ramah kulit" },
  { name: "Vegetable Glycerin", note: "Humektan alami dari minyak nabati" },
  { name: "Citric Acid", note: "Penyeimbang pH alami dari jeruk" },
  { name: "Aqua (Water)", note: "Pelarut air reverse osmosis" },
];

export const FREE_FROM = [
  { label: "SLS / SLES", emoji: "🚫" },
  { label: "Paraben", emoji: "🚫" },
  { label: "Phthalate", emoji: "🚫" },
  { label: "Alkohol Kering", emoji: "🚫" },
  { label: "Pewarna Sintetis", emoji: "🚫" },
  { label: "Minyak Bumi", emoji: "🚫" },
];
