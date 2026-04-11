export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#c8ae72]/10 bg-[rgba(15,11,18,0.75)] px-4 py-4 backdrop-blur-xl md:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
            Salon Verwaltung
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#fff5df]">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#eadcbe] md:block">
            Heute: 5 Termine
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] font-semibold text-[#23170d]">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
