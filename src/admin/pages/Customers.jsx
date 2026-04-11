const customers = [
  { id: 1, name: "Anna Müller", phone: "+49 176 111111", visits: 5 },
  { id: 2, name: "Julia Schneider", phone: "+49 176 222222", visits: 2 },
  { id: 3, name: "Daniel Weber", phone: "+49 176 333333", visits: 7 },
];

export default function Customers() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
          Kunden
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#fff5df]">
          Kundenübersicht
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#cfbea2]">
          Übersicht aller Kundinnen und Kunden mit Kontaktdaten und bisherigen
          Besuchen.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-[24px] border border-[#c8ae72]/10 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6"
          >
            <p className="text-2xl font-semibold text-[#fff2d2]">
              {customer.name}
            </p>
            <p className="mt-3 text-sm text-[#eadcbe]">{customer.phone}</p>
            <p className="mt-4 text-sm text-[#c8ae72]">
              Besuche: {customer.visits}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
