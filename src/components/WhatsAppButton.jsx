export default function WhatsAppButton() {
  const phoneNumber = "4917612345678";
  const message = encodeURIComponent(
    "Hallo, ich möchte gerne einen Termin bei Maison Élégance anfragen.",
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp Kontakt"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-[#c8ae72]/20 bg-[rgba(18,13,18,0.92)] px-4 py-3 text-[#f8f0e3] shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-1 hover:brightness-110"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg">
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5 fill-current"
          aria-hidden="true"
        >
          <path d="M19.11 17.21c-.3-.15-1.77-.87-2.04-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.52.08-.79.37-.27.3-1.04 1.01-1.04 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.05 4.46.71.3 1.27.48 1.7.62.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35Z" />
          <path d="M27.01 4.98A15.88 15.88 0 0 0 16.02.5C7.47.5.5 7.46.5 16c0 2.73.71 5.4 2.06 7.76L.38 31.5l7.94-2.08A15.43 15.43 0 0 0 16 31.5h.01c8.54 0 15.5-6.96 15.5-15.5 0-4.14-1.61-8.03-4.5-11.02Zm-11 23.9h-.01a12.9 12.9 0 0 1-6.58-1.8l-.47-.28-4.71 1.23 1.26-4.59-.31-.47A12.86 12.86 0 0 1 3.12 16c0-7.11 5.78-12.88 12.9-12.88 3.44 0 6.68 1.34 9.12 3.78a12.8 12.8 0 0 1 3.77 9.11c0 7.11-5.78 12.88-12.89 12.88Z" />
        </svg>
      </span>

      <span className="hidden sm:block">
        <span className="block text-xs uppercase tracking-[0.24em] text-[#c8ae72]">
          WhatsApp
        </span>
        <span className="block text-sm font-medium text-[#fff5df]">
          Jetzt anfragen
        </span>
      </span>
    </a>
  );
}
