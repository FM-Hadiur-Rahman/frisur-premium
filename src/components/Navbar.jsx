import useSalonSettings from "../hooks/useSalonSettings";

export default function Navbar() {
  const { settings } = useSalonSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-[#c8ae72]/15 bg-[#120d12]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-lg font-semibold tracking-[0.08em] text-[#fff3d7]">
            {settings.salonName || "Maison Élégance"}
          </p>
          <p className="text-xs uppercase tracking-[0.22em] text-[#c8ae72]">
            {settings.tagline || "Luxury Hair Lounge"}
          </p>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-[#e7d9bd] md:flex">
          <a href="#leistungen" className="transition hover:text-[#f6e7c1]">
            Leistungen
          </a>
          <a href="#team" className="transition hover:text-[#f6e7c1]">
            Team
          </a>
          <a href="#arbeiten" className="transition hover:text-[#f6e7c1]">
            Arbeiten
          </a>
          <a href="#bewertungen" className="transition hover:text-[#f6e7c1]">
            Bewertungen
          </a>
          <a href="#kontakt" className="transition hover:text-[#f6e7c1]">
            Kontakt
          </a>
        </nav>

        <a
          href="#termin"
          className="rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] px-5 py-3 text-sm font-medium text-[#23170d] shadow-[0_10px_30px_rgba(183,147,79,0.3)] transition hover:brightness-110"
        >
          Termin buchen
        </a>
      </div>
    </header>
  );
}
