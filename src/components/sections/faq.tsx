"use client";

import { Reveal, SectionHeader } from "@/components/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "Apa itu sabun kertas?",
    a: "Sabun kertas adalah sabun dalam bentuk lembaran tipis seperti kertas yang larut menjadi busa saat terkena air. Praktis, ringan, dan higienis — cocok untuk traveling, outdoor, dan kebersihan sehari-hari.",
  },
  {
    q: "Berapa lama sabun kertas larut?",
    a: "Sabun kertas Resikku larut sepenuhnya dalam kurang dari 5 detik saat dibasahi air. Busa melimpah dan lembut, lalu bilas bersih tanpa residu.",
  },
  {
    q: "Aman untuk kulit sensitif?",
    a: "Ya! Matcha Mint dan Sweet Cherry diformulasikan untuk membersihkan dengan lembut. Bebas SLS, paraben, dan alkohol dengan pH seimbang. Semua produk telah teruji dermatologis.",
  },
  {
    q: "Bagaimana cara menyimpannya?",
    a: "Simpan di tempat kering pada suhu ruang. Kemasan saku kami kedap air sehingga aman dibawa di dalam tas tanpa risiko sabun larut sebelum digunakan.",
  },
  {
    q: "Berapa lembar isi satu pack?",
    a: "Setiap pack berisi 25-30 lembar sabun kertas tergantung varian. Cukup untuk 25-30 kali pakai — setara dengan sabun cair 200ml.",
  },
  {
    q: "Apakah ramah lingkungan?",
    a: "100% ramah lingkungan! Setiap lembar fully biodegradable, larut sempurna tanpa microplastic, dan kemasan kami menggunakan material daur ulang. Zero waste, zero guilt.",
  },
  {
    q: "Bisa untuk mandi atau hanya cuci tangan?",
    a: "Matcha Mint dan Sweet Cherry cocok untuk cuci tangan sehari-hari maupun saat bepergian. Keduanya praktis digunakan kapan saja ketika membutuhkan sabun.",
  },
];

export function FAQ() {
  return (
    <section className="section-rsk relative">
      <div className="container-rsk max-w-3xl">
        <SectionHeader
          label="FAQ"
          title="Pertanyaan Umum"
          subtitle="Semua yang perlu kamu ketahui tentang sabun kertas Resikku — dijawab singkat dan jelas."
        />

        <Reveal delay={0.15}>
          <div className="mt-10 glass-card rounded-3xl p-5 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-sage/10 last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left text-sm md:text-base font-heading font-semibold text-ink hover:no-underline hover:text-sage-dark transition-colors [&[data-state=open]]:text-sage-dark">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-ink-secondary leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
