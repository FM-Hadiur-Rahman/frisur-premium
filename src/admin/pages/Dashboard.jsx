import { useEffect, useMemo, useState } from "react";
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

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5005/api";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("token");

        const appointmentRes = await fetch(`${API_BASE}/appointments`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        const appointmentData = await appointmentRes.json();

        if (!appointmentRes.ok) {
          throw new Error(
            appointmentData.message || "Termine konnten nicht geladen werden.",
          );
        }

        const serviceRes = await fetch(`${API_BASE}/services`);
        const serviceData = await serviceRes.json();

        if (!serviceRes.ok) {
          throw new Error(
            serviceData.message || "Leistungen konnten nicht geladen werden.",
          );
        }

        setAppointments(appointmentData.data || []);
        setServices(serviceData.data || []);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const todayString = new Date().toISOString().split("T")[0];

  const todaysAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => appointment.date === todayString,
    );
  }, [appointments, todayString]);

  const recentAppointments = useMemo(() => {
    return [...appointments].slice(0, 4);
  }, [appointments]);

  const customerMap = useMemo(() => {
    const map = new Map();

    appointments.forEach((appointment) => {
      const key = appointment.contact || appointment.customerName;

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          name: appointment.customerName,
          phone: appointment.contact,
          visits: 1,
        });
      } else {
        map.get(key).visits += 1;
      }
    });

    return Array.from(map.values()).slice(0, 3);
  }, [appointments]);

  const topServices = useMemo(() => {
    const counts = {};

    appointments.forEach((appointment) => {
      const serviceName =
        appointment.service?.name || appointment.serviceName || "Unbekannt";
      counts[serviceName] = (counts[serviceName] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, bookings], index) => ({
        id: index + 1,
        name,
        bookings,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 4);
  }, [appointments]);

  const totalRevenue = useMemo(() => {
    return appointments.reduce(
      (sum, appointment) => sum + Number(appointment.finalPrice || 0),
      0,
    );
  }, [appointments]);

  const stats = [
    {
      title: "Heutige Termine",
      value: todaysAppointments.length,
      description: "Geplante Buchungen für den heutigen Tag.",
      icon: CalendarDays,
    },
    {
      title: "Neue Kunden",
      value: customerMap.length,
      description: "Kundinnen und Kunden aus aktuellen Anfragen.",
      icon: Users,
    },
    {
      title: "Leistungen",
      value: services.length,
      description: "Aktive Dienstleistungen im Salon-System.",
      icon: Scissors,
    },
    {
      title: "Umsatz Vorschau",
      value: `${totalRevenue.toFixed(2)} €`,
      description: "Berechnet auf Basis eingegangener Anfragen.",
      icon: Euro,
    },
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
                {loading ? (
                  <p className="text-sm text-white/60">
                    Termine werden geladen...
                  </p>
                ) : recentAppointments.length > 0 ? (
                  recentAppointments.map((appointment) => (
                    <AppointmentRow
                      key={appointment._id || appointment.id}
                      appointment={{
                        time: appointment.time,
                        customer: appointment.customerName,
                        service:
                          appointment.service?.name ||
                          appointment.serviceName ||
                          "Unbekannt",
                        status: formatStatus(appointment.status),
                      }}
                    />
                  ))
                ) : (
                  <p className="text-sm text-white/60">
                    Noch keine Buchungen vorhanden.
                  </p>
                )}
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
                  {customerMap.length > 0 ? (
                    customerMap.map((customer) => (
                      <div
                        key={customer.id}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {customer.name}
                          </p>
                          <p className="truncate text-sm text-white/45">
                            {customer.phone}
                          </p>
                        </div>

                        <div className="rounded-full border border-[#d8b46a]/20 bg-[#d8b46a]/10 px-3 py-1 text-xs text-[#e7c98a]">
                          {customer.visits} Besuche
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/60">
                      Noch keine Kundendaten vorhanden.
                    </p>
                  )}
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
                  {topServices.length > 0 ? (
                    topServices.map((service) => (
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
                    ))
                  ) : (
                    <p className="text-sm text-white/60">
                      Noch keine Leistungsdaten vorhanden.
                    </p>
                  )}
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
                  value={recentAppointments[0]?.time || "—"}
                  subtext={
                    recentAppointments[0]?.customerName || "Noch kein Termin"
                  }
                />
                <MiniStatusCard
                  icon={Users}
                  label="Kunden heute"
                  value={todaysAppointments.length}
                  subtext="basierend auf echten Buchungen"
                />
                <MiniStatusCard
                  icon={Scissors}
                  label="Beliebteste Leistung"
                  value={topServices[0]?.name || "—"}
                  subtext="aus aktuellen Anfragen"
                />
                <MiniStatusCard
                  icon={Euro}
                  label="Tagesumsatz"
                  value={`${totalRevenue.toFixed(2)} €`}
                  subtext="basierend auf Buchungswerten"
                />
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatStatus(status) {
  const map = {
    pending: "Offen",
    confirmed: "Bestätigt",
    completed: "Abgeschlossen",
    cancelled: "Storniert",
  };

  return map[status] || status || "Offen";
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
  const statusClass =
    appointment.status === "Bestätigt"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
      : appointment.status === "Storniert"
        ? "border-red-500/20 bg-red-500/10 text-red-300"
        : "border-yellow-500/20 bg-yellow-500/10 text-yellow-300";

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

      <span
        className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs ${statusClass}`}
      >
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
