import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  MoreHorizontal,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5005/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(true);

  const todayKey = useMemo(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Termine konnten nicht geladen werden.",
        );
      }

      setAppointments(data.data || []);
    } catch (error) {
      console.error("Appointments load error:", error);
      alert(error.message || "Fehler beim Laden der Termine.");
    } finally {
      setLoading(false);
    }
  }

  const normalizedAppointments = useMemo(() => {
    return appointments.map((item) => ({
      id: item._id || item.id,
      date: item.date,
      time: item.time,
      customer: item.customerName || item.customer || "—",
      phone: item.contact || item.phone || "—",
      service: item.service?.name || item.serviceName || item.service || "—",
      status: item.status || "pending",
      notes: item.message || item.notes || "",
      originalItem: item,
    }));
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return normalizedAppointments.filter((item) => {
      const q = search.toLowerCase().trim();

      const matchesSearch =
        !q ||
        item.customer.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      const matchesDate = dateFilter ? item.date === dateFilter : true;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [normalizedAppointments, search, statusFilter, dateFilter]);

  const stats = useMemo(() => {
    const todayAppointments = normalizedAppointments.filter(
      (a) => a.date === todayKey,
    );

    return {
      total: todayAppointments.length,
      confirmed: todayAppointments.filter((a) => a.status === "confirmed")
        .length,
      pending: todayAppointments.filter((a) => a.status === "pending").length,
      cancelled: todayAppointments.filter((a) => a.status === "cancelled")
        .length,
    };
  }, [normalizedAppointments, todayKey]);

  async function updateStatus(id, newStatus) {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Status konnte nicht aktualisiert werden.",
        );
      }

      setAppointments((prev) =>
        prev.map((item) =>
          (item._id || item.id) === id ? { ...item, status: newStatus } : item,
        ),
      );

      setSelectedAppointment((prev) =>
        prev && prev.id === id ? { ...prev, status: newStatus } : prev,
      );

      setOpenMenuId(null);
    } catch (error) {
      console.error("Update status error:", error);
      alert(error.message || "Status konnte nicht aktualisiert werden.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Möchten Sie diesen Termin wirklich löschen?",
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Termin konnte nicht gelöscht werden.");
      }

      setAppointments((prev) =>
        prev.filter((item) => (item._id || item.id) !== id),
      );

      setSelectedAppointment((prev) => (prev?.id === id ? null : prev));
      setOpenMenuId(null);
    } catch (error) {
      console.error("Delete appointment error:", error);
      alert(error.message || "Termin konnte nicht gelöscht werden.");
    }
  }

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFilter("");
  };

  return (
    <div className="min-h-screen bg-[#08030a] px-6 pt-10 pb-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c8a96b]">
          Termine
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Terminverwaltung</h1>
            <p className="mt-2 text-sm text-white/60">
              Verwalten, filtern und aktualisieren Sie alle Salontermine.
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Heute gesamt" value={stats.total} />
          <StatCard title="Bestätigt" value={stats.confirmed} />
          <StatCard title="Offen" value={stats.pending} />
          <StatCard title="Storniert" value={stats.cancelled} />
        </div>

        <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 lg:grid-cols-[1.5fr_260px_240px_auto]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={18}
            />
            <input
              type="text"
              placeholder="Suche nach Kunde, Leistung oder Telefon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-white outline-none focus:border-[#d8b46a]/60"
            />
          </div>

          <div className="relative">
            <Filter
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={18}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-white outline-none focus:border-[#d8b46a]/60"
            >
              <option value="all">Alle Status</option>
              <option value="confirmed">Bestätigt</option>
              <option value="pending">Offen</option>
              <option value="cancelled">Storniert</option>
              <option value="completed">Abgeschlossen</option>
            </select>
          </div>

          <div className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={18}
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-white outline-none focus:border-[#d8b46a]/60"
            />
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            Zurücksetzen
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] shadow-[0_0_60px_rgba(216,180,106,0.08)]">
          <div className="hidden md:grid grid-cols-[120px_90px_1.45fr_1.2fr_130px_190px] gap-4 border-b border-white/10 px-6 py-5 text-xs uppercase tracking-[0.28em] text-[#c8a96b]">
            <div>Datum</div>
            <div>Uhrzeit</div>
            <div>Kunde</div>
            <div>Leistung</div>
            <div>Status</div>
            <div className="text-right">Aktionen</div>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-white/60">
              Termine werden geladen...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-medium">Keine Termine gefunden</p>
              <p className="mt-2 text-sm text-white/55">
                Passen Sie die Filter an oder warten Sie auf neue Buchungen.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                {filteredAppointments.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[120px_90px_1.45fr_1.2fr_130px_190px] items-center gap-4 border-b border-white/5 px-6 py-5 last:border-b-0"
                  >
                    <div>{formatDate(item.date)}</div>
                    <div>{item.time}</div>

                    <div className="min-w-0">
                      <div className="truncate font-medium">
                        {item.customer}
                      </div>
                      <div className="truncate text-xs text-white/45">
                        {item.phone}
                      </div>
                    </div>

                    <div className="truncate">{item.service}</div>

                    <div>
                      <StatusBadge status={item.status} />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <ActionButton
                        onClick={() => setSelectedAppointment(item)}
                        icon={<Eye size={15} />}
                        label="Ansehen"
                      />

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((prev) =>
                              prev === item.id ? null : item.id,
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
                        >
                          <MoreHorizontal size={15} />
                          <span>Mehr</span>
                        </button>

                        {openMenuId === item.id && (
                          <div className="absolute right-0 top-11 z-20 w-52 rounded-2xl border border-white/10 bg-[#140911] p-2 shadow-2xl">
                            <DropdownItem
                              onClick={() => updateStatus(item.id, "confirmed")}
                              label="Als bestätigt markieren"
                            />
                            <DropdownItem
                              onClick={() => updateStatus(item.id, "pending")}
                              label="Als offen markieren"
                            />
                            <DropdownItem
                              onClick={() => updateStatus(item.id, "completed")}
                              label="Als abgeschlossen markieren"
                            />
                            <DropdownItem
                              onClick={() => updateStatus(item.id, "cancelled")}
                              label="Stornieren"
                              danger
                            />
                            <DropdownItem
                              onClick={() => handleDelete(item.id)}
                              label="Löschen"
                              danger
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 p-4 md:hidden">
                {filteredAppointments.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {item.customer}
                        </h3>
                        <p className="truncate text-sm text-white/55">
                          {item.service}
                        </p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>

                    <div className="space-y-1 text-sm text-white/70">
                      <p>
                        <span className="text-white/45">Datum:</span>{" "}
                        {formatDate(item.date)}
                      </p>
                      <p>
                        <span className="text-white/45">Zeit:</span> {item.time}
                      </p>
                      <p>
                        <span className="text-white/45">Telefon:</span>{" "}
                        {item.phone}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <ActionButton
                        onClick={() => setSelectedAppointment(item)}
                        icon={<Eye size={15} />}
                        label="Ansehen"
                      />
                      <ActionButton
                        onClick={() => updateStatus(item.id, "confirmed")}
                        icon={<CheckCircle2 size={15} />}
                        label="Bestätigen"
                      />
                      <ActionButton
                        danger
                        onClick={() => handleDelete(item.id)}
                        icon={<Trash2 size={15} />}
                        label="Löschen"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedAppointment && (
        <Modal
          onClose={() => setSelectedAppointment(null)}
          title="Termin Details"
        >
          <div className="space-y-3 text-sm text-white/80">
            <DetailRow label="Kunde" value={selectedAppointment.customer} />
            <DetailRow
              label="Telefon / E-Mail"
              value={selectedAppointment.phone}
            />
            <DetailRow
              label="Datum"
              value={formatDate(selectedAppointment.date)}
            />
            <DetailRow label="Uhrzeit" value={selectedAppointment.time} />
            <DetailRow label="Leistung" value={selectedAppointment.service} />
            <DetailRow
              label="Status"
              value={<StatusBadge status={selectedAppointment.status} />}
            />
            <DetailRow
              label="Notizen"
              value={selectedAppointment.notes || "—"}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => updateStatus(selectedAppointment.id, "confirmed")}
              className="rounded-xl bg-emerald-500/20 px-4 py-2 text-sm text-emerald-200"
            >
              Bestätigen
            </button>
            <button
              onClick={() => updateStatus(selectedAppointment.id, "completed")}
              className="rounded-xl bg-sky-500/20 px-4 py-2 text-sm text-sky-200"
            >
              Abschließen
            </button>
            <button
              onClick={() => updateStatus(selectedAppointment.id, "cancelled")}
              className="rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-200"
            >
              Stornieren
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-white/55">{title}</p>
      <h3 className="mt-2 text-3xl font-semibold">{value}</h3>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    confirmed:
      "border border-emerald-500/20 bg-emerald-500/20 text-emerald-300",
    pending: "border border-amber-500/20 bg-amber-500/20 text-amber-300",
    cancelled: "border border-red-500/20 bg-red-500/20 text-red-300",
    completed: "border border-sky-500/20 bg-sky-500/20 text-sky-300",
  };

  const labels = {
    confirmed: "Bestätigt",
    pending: "Offen",
    cancelled: "Storniert",
    completed: "Erledigt",
  };

  return (
    <span
      className={`inline-flex w-fit whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status]}`}
    >
      {labels[status] || status}
    </span>
  );
}

function ActionButton({ icon, label, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-2.5 py-1.5 text-xs transition ${
        danger
          ? "border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20"
          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function DropdownItem({ label, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
        danger
          ? "text-red-300 hover:bg-red-500/10"
          : "text-white/80 hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
      <span className="text-white/50">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#140911] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            <XCircle size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE");
}
