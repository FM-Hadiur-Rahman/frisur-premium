import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Search,
  Plus,
  Filter,
  Trash2,
  Pencil,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    date: "2026-04-12",
    time: "09:00",
    customer: "Anna Müller",
    phone: "+49 176 11111111",
    service: "Balayage Deluxe",
    stylist: "Sophie",
    status: "confirmed",
    notes: "First visit",
  },
  {
    id: 2,
    date: "2026-04-12",
    time: "10:30",
    customer: "Julia Schneider",
    phone: "+49 176 22222222",
    service: "Damenhaarschnitt",
    stylist: "Mila",
    status: "pending",
    notes: "",
  },
  {
    id: 3,
    date: "2026-04-12",
    time: "14:00",
    customer: "Daniel Weber",
    phone: "+49 176 33333333",
    service: "Herrenhaarschnitt",
    stylist: "Emma",
    status: "cancelled",
    notes: "Cancelled by customer",
  },
  {
    id: 4,
    date: "2026-04-13",
    time: "11:00",
    customer: "Leonie Fischer",
    phone: "+49 176 44444444",
    service: "Color + Styling",
    stylist: "Sophie",
    status: "confirmed",
    notes: "",
  },
];

const emptyForm = {
  date: "",
  time: "",
  customer: "",
  phone: "",
  service: "",
  stylist: "",
  status: "pending",
  notes: "",
};

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase()) ||
        item.stylist.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      const matchesDate = dateFilter ? item.date === dateFilter : true;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, search, statusFilter, dateFilter]);

  const stats = useMemo(() => {
    const today = "2026-04-12"; // later replace with dynamic current date
    const todayAppointments = appointments.filter((a) => a.date === today);

    return {
      total: todayAppointments.length,
      confirmed: todayAppointments.filter((a) => a.status === "confirmed")
        .length,
      pending: todayAppointments.filter((a) => a.status === "pending").length,
      cancelled: todayAppointments.filter((a) => a.status === "cancelled")
        .length,
    };
  }, [appointments]);

  const openCreateModal = () => {
    setEditingAppointment(null);
    setFormData(emptyForm);
    setShowFormModal(true);
  };

  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      date: appointment.date,
      time: appointment.time,
      customer: appointment.customer,
      phone: appointment.phone,
      service: appointment.service,
      stylist: appointment.stylist,
      status: appointment.status,
      notes: appointment.notes,
    });
    setShowFormModal(true);
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();

    if (
      !formData.date ||
      !formData.time ||
      !formData.customer ||
      !formData.service
    ) {
      alert("Please fill in the required fields.");
      return;
    }

    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === editingAppointment.id ? { ...item, ...formData } : item,
        ),
      );
    } else {
      setAppointments((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    setShowFormModal(false);
    setEditingAppointment(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Do you really want to delete this appointment?",
    );
    if (!confirmed) return;
    setAppointments((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#08030a] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c8a96b]">
          Termine
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Terminverwaltung</h1>
            <p className="mt-2 text-sm text-white/60">
              Verwalten, filtern und aktualisieren Sie alle Salontermine.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#d8b46a] px-5 py-3 font-medium text-black transition hover:brightness-110"
          >
            <Plus size={18} />
            Neuer Termin
          </button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Heute gesamt" value={stats.total} />
          <StatCard title="Bestätigt" value={stats.confirmed} />
          <StatCard title="Offen" value={stats.pending} />
          <StatCard title="Storniert" value={stats.cancelled} />
        </div>

        <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={18}
            />
            <input
              type="text"
              placeholder="Suche nach Kunde, Leistung oder Stylist..."
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
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] shadow-[0_0_60px_rgba(216,180,106,0.08)]">
          <div className="hidden md:grid grid-cols-7 gap-4 border-b border-white/10 px-6 py-5 text-xs uppercase tracking-[0.28em] text-[#c8a96b]">
            <div>Datum</div>
            <div>Uhrzeit</div>
            <div>Kunde</div>
            <div>Leistung</div>
            <div>Stylist</div>
            <div>Status</div>
            <div className="text-right">Aktionen</div>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-medium">Keine Termine gefunden</p>
              <p className="mt-2 text-sm text-white/55">
                Passen Sie die Filter an oder erstellen Sie einen neuen Termin.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                {filteredAppointments.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-7 gap-4 border-b border-white/5 px-6 py-5 last:border-b-0"
                  >
                    <div>{formatDate(item.date)}</div>
                    <div>{item.time}</div>
                    <div>
                      <div className="font-medium">{item.customer}</div>
                      <div className="text-xs text-white/45">{item.phone}</div>
                    </div>
                    <div>{item.service}</div>
                    <div>{item.stylist}</div>
                    <div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <ActionButton
                        onClick={() => setSelectedAppointment(item)}
                        icon={<Eye size={16} />}
                        label="Ansehen"
                      />
                      <ActionButton
                        onClick={() => openEditModal(item)}
                        icon={<Pencil size={16} />}
                        label="Bearbeiten"
                      />
                      <ActionButton
                        onClick={() => updateStatus(item.id, "confirmed")}
                        icon={<CheckCircle2 size={16} />}
                        label="Bestätigen"
                      />
                      <ActionButton
                        danger
                        onClick={() => handleDelete(item.id)}
                        icon={<Trash2 size={16} />}
                        label="Löschen"
                      />
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
                      <div>
                        <h3 className="font-semibold">{item.customer}</h3>
                        <p className="text-sm text-white/55">{item.service}</p>
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
                        <span className="text-white/45">Stylist:</span>{" "}
                        {item.stylist}
                      </p>
                      <p>
                        <span className="text-white/45">Telefon:</span>{" "}
                        {item.phone}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <ActionButton
                        onClick={() => setSelectedAppointment(item)}
                        icon={<Eye size={16} />}
                        label="Ansehen"
                      />
                      <ActionButton
                        onClick={() => openEditModal(item)}
                        icon={<Pencil size={16} />}
                        label="Bearbeiten"
                      />
                      <ActionButton
                        danger
                        onClick={() => handleDelete(item.id)}
                        icon={<Trash2 size={16} />}
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
            <DetailRow label="Telefon" value={selectedAppointment.phone} />
            <DetailRow
              label="Datum"
              value={formatDate(selectedAppointment.date)}
            />
            <DetailRow label="Uhrzeit" value={selectedAppointment.time} />
            <DetailRow label="Leistung" value={selectedAppointment.service} />
            <DetailRow label="Stylist" value={selectedAppointment.stylist} />
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
              onClick={() => {
                updateStatus(selectedAppointment.id, "confirmed");
                setSelectedAppointment((prev) =>
                  prev ? { ...prev, status: "confirmed" } : null,
                );
              }}
              className="rounded-xl bg-emerald-500/20 px-4 py-2 text-sm text-emerald-200"
            >
              Bestätigen
            </button>
            <button
              onClick={() => {
                updateStatus(selectedAppointment.id, "cancelled");
                setSelectedAppointment((prev) =>
                  prev ? { ...prev, status: "cancelled" } : null,
                );
              }}
              className="rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-200"
            >
              Stornieren
            </button>
          </div>
        </Modal>
      )}

      {showFormModal && (
        <Modal
          onClose={() => {
            setShowFormModal(false);
            setEditingAppointment(null);
          }}
          title={
            editingAppointment ? "Termin bearbeiten" : "Neuen Termin erstellen"
          }
        >
          <form onSubmit={handleSaveAppointment} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Datum"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
              />
              <InputField
                label="Uhrzeit"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
              />
              <InputField
                label="Kunde"
                value={formData.customer}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, customer: e.target.value }))
                }
              />
              <InputField
                label="Telefon"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
              <InputField
                label="Leistung"
                value={formData.service}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, service: e.target.value }))
                }
              />
              <InputField
                label="Stylist"
                value={formData.stylist}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, stylist: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#d8b46a]/60"
              >
                <option value="pending">Offen</option>
                <option value="confirmed">Bestätigt</option>
                <option value="cancelled">Storniert</option>
                <option value="completed">Abgeschlossen</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Notizen
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#d8b46a]/60"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-[#d8b46a] px-5 py-3 font-medium text-black"
              >
                {editingAppointment
                  ? "Änderungen speichern"
                  : "Termin erstellen"}
              </button>
            </div>
          </form>
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
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20",
    pending: "bg-amber-500/20 text-amber-300 border border-amber-500/20",
    cancelled: "bg-red-500/20 text-red-300 border border-red-500/20",
    completed: "bg-sky-500/20 text-sky-300 border border-sky-500/20",
  };

  const labels = {
    confirmed: "Bestätigt",
    pending: "Offen",
    cancelled: "Storniert",
    completed: "Abgeschlossen",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function ActionButton({ icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
        danger
          ? "border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20"
          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
      }`}
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </button>
  );
}

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#d8b46a]/60"
      />
    </div>
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
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70"
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
