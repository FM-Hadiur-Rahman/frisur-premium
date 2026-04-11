const appointments = [
  {
    id: 1,
    date: "12.04.2026",
    time: "09:00",
    customer: "Anna Müller",
    service: "Balayage Deluxe",
    status: "Bestätigt",
  },
  {
    id: 2,
    date: "12.04.2026",
    time: "10:30",
    customer: "Julia Schneider",
    service: "Damenhaarschnitt",
    status: "Offen",
  },
  {
    id: 3,
    date: "12.04.2026",
    time: "14:00",
    customer: "Daniel Weber",
    service: "Herrenhaarschnitt",
    status: "Bestätigt",
  },
];

export default function Appointments() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
          Termine
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#fff5df]">
          Terminverwaltung
        </h2>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-[#c8ae72]/15 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
        <div className="grid grid-cols-5 border-b border-[#c8ae72]/10 px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#c8ae72]">
          <p>Datum</p>
          <p>Uhrzeit</p>
          <p>Kunde</p>
          <p>Leistung</p>
          <p>Status</p>
        </div>

        <div className="divide-y divide-[#c8ae72]/10">
          {appointments.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 px-6 py-5 text-sm text-[#eadcbe]"
            >
              <p>{item.date}</p>
              <p>{item.time}</p>
              <p>{item.customer}</p>
              <p>{item.service}</p>
              <p>{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
