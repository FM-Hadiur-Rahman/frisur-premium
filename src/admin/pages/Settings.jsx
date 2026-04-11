export default function Settings() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
          Einstellungen
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#fff5df]">
          Salon-Einstellungen
        </h2>
      </div>

      <div className="max-w-3xl rounded-[32px] border border-[#c8ae72]/15 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] md:p-8">
        <div className="grid gap-4">
          <input
            type="text"
            defaultValue="Maison Élégance"
            className="h-12 rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none"
          />
          <input
            type="text"
            defaultValue="+49 211 12345678"
            className="h-12 rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none"
          />
          <input
            type="email"
            defaultValue="hello@maison-elegance.de"
            className="h-12 rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none"
          />
          <textarea
            defaultValue="Königsallee 25, 40212 Düsseldorf"
            className="min-h-28 rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#fff5df] outline-none"
          />
          <button
            type="button"
            className="mt-2 h-12 rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] font-medium text-[#23170d] shadow-[0_10px_30px_rgba(183,147,79,0.3)] transition hover:brightness-110"
          >
            Änderungen speichern
          </button>
        </div>
      </div>
    </div>
  );
}
