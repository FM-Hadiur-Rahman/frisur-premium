const customers = [
  { id: 1, name: "Anna Müller", phone: "+49 176 111111", visits: 5 },
  { id: 2, name: "Julia Schneider", phone: "+49 176 222222", visits: 2 },
  { id: 3, name: "Daniel Weber", phone: "+49 176 333333", visits: 7 },
];

export default function Customers() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
          Kunden
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#fff5df]">
          Kundenübersicht
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-[28px] border border-[#c8ae72]/15 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]"
          >
            <p className="text-xl font-semibold text-[#fff2d2]">
              {customer.name}
            </p>
            <p className="mt-2 text-sm text-[#cfbea2]">{customer.phone}</p>
            <p className="mt-4 text-sm text-[#c8ae72]">
              Besuche: {customer.visits}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
