const publicCoupons = [
  {
    id: 1,
    code: "WELCOME10",
    title: "Willkommensrabatt",
    description: "10% Rabatt auf Ihren ersten Termin.",
    type: "percentage",
    value: 10,
    isActive: true,
    isPublic: true,
  },
  {
    id: 2,
    code: "COLOR20",
    title: "Color Special",
    description: "20 € Rabatt auf Farbe & Balayage Deluxe.",
    type: "fixed",
    value: 20,
    isActive: true,
    isPublic: true,
  },
  {
    id: 3,
    code: "VIP15",
    title: "VIP Vorteil",
    description: "15 € Rabatt für ausgewählte Stammkundinnen.",
    type: "fixed",
    value: 15,
    isActive: false,
    isPublic: true,
  },
];

export default function PromoBanner() {
  const activeCoupons = publicCoupons.filter(
    (coupon) => coupon.isActive && coupon.isPublic,
  );

  if (activeCoupons.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-6 pt-2 md:pb-8">
      <div className="rounded-[28px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.92),rgba(18,12,17,0.96))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#c8ae72]">
              Exklusive Angebote
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#fff2d2]">
              Aktuelle Gutscheine für Ihren nächsten Besuch
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#cfbea2]">
              Nutzen Sie Ihren Rabattcode direkt bei der Terminanfrage im
              Buchungsformular.
            </p>
          </div>

          <a
            href="#termin"
            className="inline-flex w-fit items-center justify-center rounded-2xl border border-[#c8ae72]/20 bg-[#c8ae72]/10 px-5 py-3 text-sm font-medium text-[#f1ddb0] transition hover:bg-[#c8ae72]/20"
          >
            Jetzt einlösen
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="rounded-[24px] border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#c8ae72]">
                    {coupon.title}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-[#fff2d2]">
                    {coupon.code}
                  </h4>
                </div>

                <div className="rounded-full border border-[#d7ba77]/20 bg-[#d7ba77]/10 px-3 py-1 text-xs font-medium text-[#f1ddb0]">
                  {coupon.type === "percentage"
                    ? `${coupon.value}% Rabatt`
                    : `${coupon.value} € Rabatt`}
                </div>
              </div>

              <p className="text-sm leading-6 text-[#cfbea2]">
                {coupon.description}
              </p>

              <div className="mt-4 rounded-2xl border border-[#c8ae72]/10 bg-[rgba(255,255,255,0.02)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#c8ae72]">
                  Code
                </p>
                <p className="mt-1 text-lg font-semibold tracking-wide text-[#fff5df]">
                  {coupon.code}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
