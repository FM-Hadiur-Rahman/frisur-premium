import useSalonSettings from "../hooks/useSalonSettings";

export default function ContactSection() {
  const { settings } = useSalonSettings();

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="grid gap-8 rounded-[30px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-8 shadow-2xl md:grid-cols-2 md:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#c8ae72]">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#fff5df] md:text-4xl">
            Visit our salon
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-[#cfbea2]">
            Experience a premium salon atmosphere designed for elegance,
            comfort, and unforgettable results.
          </p>
        </div>

        <div className="space-y-4 text-[#eadcbe]">
          <div>
            <p className="text-sm text-[#c8ae72]">Address</p>
            <p className="mt-1">{settings.address}</p>
          </div>

          <div>
            <p className="text-sm text-[#c8ae72]">Phone</p>
            <p className="mt-1">{settings.phone}</p>
          </div>

          <div>
            <p className="text-sm text-[#c8ae72]">Email</p>
            <p className="mt-1">{settings.email}</p>
          </div>

          <div>
            <p className="text-sm text-[#c8ae72]">Opening Hours</p>
            <p className="mt-1">
              Mon–Fri: {settings.openingHours.monday} /{" "}
              {settings.openingHours.friday}
            </p>
            <p>Sat: {settings.openingHours.saturday}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
