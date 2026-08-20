import { PRODUCTS } from "@/lib/products";

// JSON-LD structured data for SEO (Organization, Product list, WebSite)
export function getStructuredData() {
  const baseUrl = "https://resikku-essentials.example.com";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Resikku Essentials",
    description:
      "Brand sabun kertas organik premium Indonesia. Praktis, higienis, dan ramah lingkungan.",
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    sameAs: [
      "https://instagram.com/resikku.essentials",
      "https://wa.me/6285185976414",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+62-851-8597-6414",
      availableLanguage: ["Indonesian", "English"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Resikku Essentials",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const products = PRODUCTS.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.fullDescription,
    image: `${baseUrl}${p.image}`,
    sku: `RSK-${String(p.id).padStart(3, "0")}`,
    brand: {
      "@type": "Brand",
      name: "Resikku Essentials",
    },
    category: p.categoryLabel,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating,
      reviewCount: p.popularity,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: p.price,
      availability: p.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${baseUrl}/#products`,
    },
  }));

  return {
    organization,
    website,
    products,
  };
}

// Component version for rendering in head (server-side only)
export function StructuredData() {
  const data = getStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.website) }}
      />
      {data.products.map((p, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
    </>
  );
}
