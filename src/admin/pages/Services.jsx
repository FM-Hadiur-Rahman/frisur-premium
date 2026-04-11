const services = [
  { id: 1, name: "Damenhaarschnitt", price: "49 €" },
  { id: 2, name: "Herrenhaarschnitt", price: "29 €" },
  { id: 3, name: "Balayage Deluxe", price: "89 €" },
  { id: 4, name: "Braut- & Eventstyling", price: "119 €" },
];

export default function Services() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
          Leistungen
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#fff5df]">
          Leistungen verwalten
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#cfbea2]">
          Verwalten Sie Ihre angebotenen Leistungen und Preise in einer
          übersichtlichen Darstellung.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-[24px] border border-[#c8ae72]/10 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6"
          >
            <p className="text-xl font-semibold text-[#fff2d2]">
              {service.name}
            </p>
            <p className="mt-4 text-3xl font-bold text-[#f1ddb0]">
              {service.price}
            </p>
            <p className="mt-3 text-sm text-[#cfbea2]">
              Basispreis der Leistung
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
