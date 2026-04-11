const prices = [
  {
    title: "Damenhaarschnitt",
    price: "ab 49 €",
    note: "inkl. Beratung & Finish",
  },
  {
    title: "Herrenhaarschnitt",
    price: "ab 29 €",
    note: "inkl. Styling",
  },
  {
    title: "Balayage Deluxe",
    price: "ab 89 €",
    note: "inkl. Farbveredelung",
  },
  {
    title: "Brautstyling",
    price: "ab 119 €",
    note: "inkl. Probetermin optional",
  },
];

export default function PriceOverview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-[#c8ae72]">
          PREISÜBERSICHT
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#fff5df] md:text-4xl">
          Transparente Einstiegspreise
        </h2>
        <p className="mt-4 max-w-2xl text-[#cfbea2]">
          Eine stilvolle Übersicht unserer beliebtesten Leistungen mit
          Einstiegspreisen für Ihre Orientierung.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {prices.map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-[#c8ae72]">
              Einstieg
            </p>
            <h3 className="mt-3 text-xl font-semibold text-[#fff2d2]">
              {item.title}
            </h3>
            <p className="mt-4 text-3xl font-bold text-[#f1ddb0]">
              {item.price}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#cfbea2]">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
