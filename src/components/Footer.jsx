export default function Footer() {
  return (
    <footer className="border-t border-[#c8ae72]/10 py-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-[0.08em] text-[#fff3d7]">
            Maison Élégance
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#c8ae72]">
            Luxury Hair Lounge
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#bcae97]">
            Exklusives Styling, hochwertige Pflege und ein Salon-Erlebnis mit
            Eleganz, Komfort und Persönlichkeit.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
            Navigation
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#d9ccb3]">
            <a href="#leistungen" className="hover:text-[#f1ddb0]">
              Leistungen
            </a>
            <a href="#team" className="hover:text-[#f1ddb0]">
              Team
            </a>
            <a href="#arbeiten" className="hover:text-[#f1ddb0]">
              Unsere Arbeiten
            </a>
            <a href="#bewertungen" className="hover:text-[#f1ddb0]">
              Bewertungen
            </a>
            <a href="#kontakt" className="hover:text-[#f1ddb0]">
              Kontakt
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
            Kontakt
          </p>
          <div className="mt-4 space-y-3 text-sm text-[#d9ccb3]">
            <p>Königsallee 25, 40212 Düsseldorf</p>
            <p>+49 211 12345678</p>
            <p>hello@maison-elegance.de</p>
            <p>Mo–Fr: 09:00 – 19:00</p>
            <p>Sa: 10:00 – 17:00</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#c8ae72]/10 px-6 pt-6 text-sm text-[#a99981] md:flex-row md:items-center md:justify-between">
        <p>© 2026 Maison Élégance. Alle Rechte vorbehalten.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#f1ddb0]">
            Datenschutz
          </a>
          <a href="#" className="hover:text-[#f1ddb0]">
            Impressum
          </a>
          <a href="#" className="hover:text-[#f1ddb0]">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
