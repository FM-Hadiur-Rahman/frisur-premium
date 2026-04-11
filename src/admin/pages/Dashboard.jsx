import { Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Scissors,
  Euro,
  ArrowRight,
  Clock3,
  Star,
  Settings,
  Plus,
} from "lucide-react";

const stats = [
  {
    title: "Heutige Termine",
    value: "12",
    description: "Geplante Buchungen für den heutigen Tag.",
    icon: CalendarDays,
  },
  {
    title: "Neue Kunden",
    value: "28",
    description: "Neue Anfragen im aktuellen Monat.",
    icon: Users,
  },
  {
    title: "Leistungen",
    value: "14",
    description: "Aktive Dienstleistungen im Salon-System.",
    icon: Scissors,
  },
  {
    title: "Umsatz Vorschau",
    value: "4.820 €",
    description: "Geschätzter Monatsumsatz auf Basis der Demo-Daten.",
    icon: Euro,
  },
];

const todayAppointments = [
  {
    id: 1,
    time: "09:00",
    customer: "Anna Müller",
    service: "Balayage Deluxe",
    status: "Bestätigt",
  },
  {
    id: 2,
    time: "10:30",
    customer: "Julia Schneider",
    service: "Damenhaarschnitt",
    status: "Bestätigt",
  },
  {
    id: 3,
    time: "12:00",
    customer: "Daniel Weber",
    service: "Herrenhaarschnitt",
    status: "Bestätigt",
  },
  {
    id: 4,
    time: "14:00",
    customer: "Selin Kaya",
    service: "Braut- & Eventstyling",
    status: "Bestätigt",
  },
];

const recentCustomers = [
  {
    id: 1,
    name: "Anna Müller",
    visits: 5,
    phone: "+49 176 111111",
  },
  {
    id: 2,
    name: "Julia Schneider",
    visits: 2,
    phone: "+49 176 222222",
  },
  {
    id: 3,
    name: "Daniel Weber",
    visits: 7,
    phone: "+49 176 333333",
  },
];

const topServices = [
  { id: 1, name: "Balayage Deluxe", bookings: 18 },
  { id: 2, name: "Damenhaarschnitt", bookings: 26 },
  { id: 3, name: "Color + Styling", bookings: 14 },
  { id: 4, name: "Brautstyling", bookings: 8 },
];

const quickActions = [
  {
    label: "Neuen Termin hinzufügen",
    to: "/admin/appointments",
    icon: Plus,
  },
  {
    label: "Leistungen bearbeiten",
    to: "/admin/services",
    icon: Scissors,
  },
  {
    label: "Kundenübersicht öffnen",
    to: "/admin/customers",
    icon: Users,
  },
  {
    label: "Salon-Einstellungen aktualisieren",
    to: "/admin/settings",
    icon: Settings,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#08030a] px-6 pt-10 pb-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c8a96b]">
          Übersicht
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-semibold">
            Willkommen im Salon-Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
            Verwalten Sie Termine, Kundendaten, Leistungen und wichtige
            Einstellungen Ihres Studios in einer zentralen Übersicht.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_1.15fr]">
          <div className="space-y-6">
            <SectionCard
              title="Heute anstehend"
              right={
                <Link
                  to="/admin/appointments"
                  className="inline-flex items-center gap-2 text-sm text-[#d8b46a] transition hover:text-[#edd39b]"
                >
                  Alle Termine
                  <ArrowRight size={16} />
                </Link>
              }
            >
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </SectionCard>

            <div className="grid gap-6 lg:grid-cols-2">
              <SectionCard
                title="Letzte Kunden"
                right={
                  <Link
                    to="/admin/customers"
                    className="inline-flex items-center gap-2 text-sm text-[#d8b46a] transition hover:text-[#edd39b]"
                  >
                    Alle Kunden
                    <ArrowRight size={16} />
                  </Link>
                }
              >
                <div className="space-y-3">
                  {recentCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{customer.name}</p>
                        <p className="truncate text-sm text-white/45">
                          {customer.phone}
                        </p>
                      </div>

                      <div className="rounded-full border border-[#d8b46a]/20 bg-[#d8b46a]/10 px-3 py-1 text-xs text-[#e7c98a]">
                        {customer.visits} Besuche
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title="Top Leistungen"
                right={
                  <Link
                    to="/admin/services"
                    className="inline-flex items-center gap-2 text-sm text-[#d8b46a] transition hover:text-[#edd39b]"
                  >
                    Verwalten
                    <ArrowRight size={16} />
                  </Link>
                }
              >
                <div className="space-y-3">
                  {topServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{service.name}</p>
                        <p className="text-sm text-white/45">
                          Beliebte Leistung
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                        <Star size={13} />
                        {service.bookings} Buchungen
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>

          <div className="space-y-6">
            <SectionCard title="Schnellzugriff">
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.label}
                      to={action.to}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 transition hover:border-[#d8b46a]/25 hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-[#d8b46a]/15 bg-[#d8b46a]/10 p-2 text-[#e7c98a]">
                          <Icon size={18} />
                        </div>
                        <span className="text-sm text-white/85">
                          {action.label}
                        </span>
                      </div>

                      <ArrowRight
                        size={16}
                        className="text-white/35 transition group-hover:text-[#e7c98a]"
                      />
                    </Link>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard title="Tagesstatus">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <MiniStatusCard
                  icon={Clock3}
                  label="Nächster Termin"
                  value="09:00 Uhr"
                  subtext="Anna Müller"
                />
                <MiniStatusCard
                  icon={Users}
                  label="Kunden heute"
                  value="12"
                  subtext="inkl. 3 Neukunden"
                />
                <MiniStatusCard
                  icon={Scissors}
                  label="Beliebteste Leistung"
                  value="Damenhaarschnitt"
                  subtext="diesen Monat"
                />
                <MiniStatusCard
                  icon={Euro}
                  label="Tagesumsatz"
                  value="640 €"
                  subtext="geschätzter Stand"
                />
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] p-6 shadow-[0_0_50px_rgba(216,180,106,0.06)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.28em] text-[#c8a96b]">
          {item.title}
        </div>

        <div className="rounded-2xl border border-[#d8b46a]/15 bg-[#d8b46a]/10 p-2 text-[#e5c687]">
          <Icon size={18} />
        </div>
      </div>

      <div className="text-5xl font-semibold tracking-tight">{item.value}</div>
      <p className="mt-4 text-sm leading-6 text-white/60">{item.description}</p>
    </div>
  );
}

function SectionCard({ title, right, children }) {
  return (
    <div className="rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] p-5 shadow-[0_0_50px_rgba(216,180,106,0.05)] md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#c8a96b]">
          {title}
        </h2>
        {right}
      </div>
      {children}
    </div>
  );
}

function AppointmentRow({ appointment }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="min-w-[64px] rounded-2xl border border-[#d8b46a]/15 bg-[#d8b46a]/10 px-3 py-2 text-center">
          <p className="text-xl font-semibold">{appointment.time}</p>
        </div>

        <div>
          <p className="font-medium">{appointment.customer}</p>
          <p className="mt-1 text-sm text-white/55">{appointment.service}</p>
        </div>
      </div>

      <span className="inline-flex w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
        {appointment.status}
      </span>
    </div>
  );
}

function MiniStatusCard({ icon, label, value, subtext }) {
  const Icon = icon;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-xl border border-[#d8b46a]/15 bg-[#d8b46a]/10 p-2 text-[#e7c98a]">
          <Icon size={16} />
        </div>
        <p className="text-sm text-white/55">{label}</p>
      </div>

      <p className="text-lg font-semibold">{value}</p>
      <p className="mt-1 text-sm text-white/45">{subtext}</p>
    </div>
  );
}
