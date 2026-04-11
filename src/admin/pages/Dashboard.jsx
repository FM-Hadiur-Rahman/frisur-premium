import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
          Übersicht
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#fff5df]">
          Willkommen im Salon-Dashboard
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#cfbea2]">
          Verwalten Sie Termine, Kundendaten, Leistungen und wichtige
          Einstellungen Ihres Studios in einer zentralen Übersicht.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Heutige Termine"
          value="12"
          subtitle="Geplante Buchungen für den heutigen Tag."
        />
        <StatCard
          title="Neue Kunden"
          value="28"
          subtitle="Neue Anfragen und Kundinnen im aktuellen Monat."
        />
        <StatCard
          title="Leistungen"
          value="14"
          subtitle="Aktive Dienstleistungen im Salon-System."
        />
        <StatCard
          title="Umsatz Vorschau"
          value="4.820 €"
          subtitle="Geschätzter Monatsumsatz auf Basis der Demo-Daten."
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-[#c8ae72]/15 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[#c8ae72]">
            Heute anstehend
          </p>

          <div className="mt-6 space-y-4">
            {[
              ["09:00", "Anna Müller", "Balayage Deluxe"],
              ["10:30", "Julia Schneider", "Damenhaarschnitt"],
              ["12:00", "Daniel Weber", "Herrenhaarschnitt"],
              ["14:00", "Selin Kaya", "Braut- & Eventstyling"],
            ].map(([time, name, service]) => (
              <div
                key={`${time}-${name}`}
                className="flex items-center justify-between rounded-2xl border border-[#c8ae72]/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
              >
                <div>
                  <p className="text-lg font-semibold text-[#fff2d2]">{time}</p>
                  <p className="mt-1 text-sm text-[#eadcbe]">{name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#c8ae72]">{service}</p>
                  <p className="mt-1 text-xs text-[#cbbda8]">Bestätigt</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[#c8ae72]/15 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[#c8ae72]">
            Schnellzugriff
          </p>

          <div className="mt-6 grid gap-4">
            {[
              "Neuen Termin hinzufügen",
              "Leistungen bearbeiten",
              "Kundenübersicht öffnen",
              "Salon-Einstellungen aktualisieren",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 py-4 text-left text-sm text-[#eadcbe] transition hover:bg-[rgba(255,255,255,0.05)]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
