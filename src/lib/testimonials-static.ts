/**
 * Static testimonials data for static export
 * Replaces database-driven testimonials
 */

export interface StaticTestimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  initial: string;
  createdAt: Date;
}

export const STATIC_TESTIMONIALS: StaticTestimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Business Traveler",
    rating: 5,
    text: "Sabun kertas Resikku benar-benar mengubah cara saya travel. Praktis, ringkas, dan efektif. Sudah menjadi item wajib di tas saya!",
    initial: "B",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Ibu Rumah Tangga",
    rating: 5,
    text: "Aman untuk kulit sensitif seluruh keluarga saya. Anak-anak suka wanginya yang natural dan aromaterapi nya bikin relaks.",
    initial: "S",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: 3,
    name: "Arjun Prabowo",
    role: "Outdoor Enthusiast",
    rating: 5,
    text: "Sempurna untuk hiking dan outdoor activities. Ringan, mudah dibawa, dan ramah lingkungan. Sudah recommend ke teman-teman!",
    initial: "A",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: 4,
    name: "Dewi Lestari",
    role: "Yoga Instructor",
    rating: 5,
    text: "Sabun kertas organik ini perfect untuk lifestyle sehat kami. Zero waste, natural ingredients, dan packaging yang indah.",
    initial: "D",
    createdAt: new Date("2024-03-25"),
  },
  {
    id: 5,
    name: "Rahman Habibi",
    role: "Environmental Activist",
    rating: 5,
    text: "Akhirnya ada produk yang benar-benar eco-friendly tanpa greenwashing. Supportive terhadap gerakan zero waste di Indonesia!",
    initial: "R",
    createdAt: new Date("2024-04-05"),
  },
  {
    id: 6,
    name: "Citra Wijaya",
    role: "Beauty Blogger",
    rating: 5,
    text: "Quality premium dengan harga terjangkau. Packaging mewah, produk efektif, dan sustainability credentials yang jelas.",
    initial: "C",
    createdAt: new Date("2024-04-20"),
  },
  {
    id: 7,
    name: "Rizki Gunawan",
    role: "Frequent Flyer",
    rating: 5,
    text: "Terbang setiap minggu dan sabun kertas ini lifesaver saya. TSA approved, super portable, dan quality tidak mengecewakan!",
    initial: "R",
    createdAt: new Date("2024-05-08"),
  },
  {
    id: 8,
    name: "Nadia Kusuma",
    role: "Gym Enthusiast",
    rating: 5,
    text: "Praktis dibawa ke gym dan travel pouch. Aromaterapi varian lavender bikin relaks setelah workout yang intense.",
    initial: "N",
    createdAt: new Date("2024-05-22"),
  },
  {
    id: 9,
    name: "Handoko Wijaya",
    role: "Conscious Consumer",
    rating: 5,
    text: "Setiap pembelian terasa like supporting a sustainable future. Kualitas produk membuktikan bahwa eco-friendly tidak harus compromise.",
    initial: "H",
    createdAt: new Date("2024-06-10"),
  },
  {
    id: 10,
    name: "Eka Prasetyo",
    role: "Parent",
    rating: 5,
    text: "Untuk keluarga dengan kulit sensitif, ini best choice. Anak-anak tidak rewel, tangan tidak kering, dan smell good!",
    initial: "E",
    createdAt: new Date("2024-06-28"),
  },
  {
    id: 11,
    name: "Meisya Rana",
    role: "Content Creator",
    rating: 5,
    text: "Sabun kertas ini bukan hanya produk berkualitas, tapi juga brand dengan nilai-nilai yang sejalan dengan audience saya.",
    initial: "M",
    createdAt: new Date("2024-07-05"),
  },
  {
    id: 12,
    name: "Fajar Kusuma",
    role: "Sustainability Advocate",
    rating: 5,
    text: "Finally! Produk lokal Indonesia yang bisa bersaing di level international. Bangga support bisnis anak negeri!",
    initial: "F",
    createdAt: new Date("2024-07-18"),
  },
];

/**
 * Get all testimonials (sorted by date, newest first)
 */
export function getTestimonials() {
  return [...STATIC_TESTIMONIALS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Get latest N testimonials
 */
export function getLatestTestimonials(count: number = 6) {
  return getTestimonials().slice(0, count);
}

/**
 * Get testimonial by ID
 */
export function getTestimonialById(id: number) {
  return STATIC_TESTIMONIALS.find((t) => t.id === id);
}
