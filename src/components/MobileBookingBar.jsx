export default function MobileBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#c8ae72]/15 bg-[rgba(18,13,18,0.94)] px-4 py-3 backdrop-blur-xl md:hidden">
      <a
        href="#termin"
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] text-sm font-semibold text-[#23170d] shadow-[0_10px_30px_rgba(183,147,79,0.3)] transition hover:brightness-110"
      >
        Termin buchen
      </a>
    </div>
  );
}
