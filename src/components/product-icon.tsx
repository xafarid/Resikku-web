import type { ProductIcon } from "@/lib/products";

interface IconProps {
  name: ProductIcon;
  className?: string;
}

const PATHS: Record<ProductIcon, React.ReactNode> = {
  lavender: (
    <>
      <path d="M12 22v-8" />
      <path d="M9 7a3 3 0 0 1 6 0c0 2-3 5-3 5s-3-3-3-5z" />
      <path d="M6 13a2.5 2.5 0 0 1 5 0c0 1.5-2.5 3.5-2.5 3.5S6 14.5 6 13z" />
      <path d="M13 13a2.5 2.5 0 0 1 5 0c0 1.5-2.5 3.5-2.5 3.5S13 14.5 13 13z" />
    </>
  ),
  greentea: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 21 2c-1 4.5-1.5 6-3.1 11.2A7 7 0 0 1 11 20z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  citrus: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="M12 12L4.93 4.93" />
      <path d="M12 12V2" />
      <path d="M12 12l7.07-7.07" />
      <path d="M12 12h10" />
    </>
  ),
  baby: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </>
  ),
  charcoal: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  rose: (
    <>
      <path d="M12 3a5 5 0 0 0-5 5c0 3 5 8 5 8s5-5 5-8a5 5 0 0 0-5-5z" />
      <circle cx="12" cy="8" r="2" />
      <path d="M12 16v6" />
      <path d="M9 19c-2-1-3-3-3-5" />
      <path d="M15 19c2-1 3-3 3-5" />
    </>
  ),
  eucalyptus: (
    <>
      <path d="M7 20h10" />
      <path d="M10 20c0-4 1.5-7 4-9" />
      <path d="M12 11c1-4 4-7 8-7-1 4-4 7-8 7z" />
    </>
  ),
};

export function ProductIconSvg({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

// Brand logo mark — three concentric water-drop circles
export function ResikkuLogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path
        d="M50 18C50 18 72 42 72 58C72 70.2 62.15 80 50 80C37.85 80 28 70.2 28 58C28 42 50 18 50 18Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M50 50C50 50 38 60 38 66C38 72.6 43.4 78 50 78C56.6 78 62 72.6 62 66C62 60 50 50 50 50Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}
