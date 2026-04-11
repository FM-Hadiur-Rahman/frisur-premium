import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Phone,
  User,
  Eye,
  Pencil,
  Trash2,
  XCircle,
  CalendarDays,
} from "lucide-react";

const initialCustomers = [
  {
    id: 1,
    name: "Anna Müller",
    phone: "+49 176 111111",
    email: "anna.mueller@email.de",
    visits: 5,
    lastVisit: "2026-04-10",
    favoriteService: "Balayage Deluxe",
    notes: "Bevorzugt warme Farbtöne.",
  },
  {
    id: 2,
    name: "Julia Schneider",
    phone: "+49 176 222222",
    email: "julia.schneider@email.de",
    visits: 2,
    lastVisit: "2026-04-08",
    favoriteService: "Damenhaarschnitt",
    notes: "",
  },
  {
    id: 3,
    name: "Daniel Weber",
    phone: "+49 176 333333",
    email: "daniel.weber@email.de",
    visits: 7,
    lastVisit: "2026-04-11",
    favoriteService: "Herrenhaarschnitt",
    notes: "Kommt oft freitags.",
  },
  {
    id: 4,
    name: "Leonie Fischer",
    phone: "+49 176 444444",
    email: "leonie.fischer@email.de",
    visits: 1,
    lastVisit: "2026-04-05",
    favoriteService: "Color + Styling",
    notes: "",
  },
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  visits: 0,
  lastVisit: "",
  favoriteService: "",
  notes: "",
};

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [visitFilter, setVisitFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const q = search.toLowerCase().trim();

      const matchesSearch =
        !q ||
        customer.name.toLowerCase().includes(q) ||
        customer.phone.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        customer.favoriteService.toLowerCase().includes(q);

      let matchesVisits = true;

      if (visitFilter === "new") matchesVisits = customer.visits <= 1;
      if (visitFilter === "returning")
        matchesVisits = customer.visits >= 2 && customer.visits <= 4;
      if (visitFilter === "loyal") matchesVisits = customer.visits >= 5;

      return matchesSearch && matchesVisits;
    });
  }, [customers, search, visitFilter]);

  const stats = useMemo(() => {
    return {
      total: customers.length,
      newCustomers: customers.filter((c) => c.visits <= 1).length,
      loyalCustomers: customers.filter((c) => c.visits >= 5).length,
      totalVisits: customers.reduce((sum, c) => sum + c.visits, 0),
    };
  }, [customers]);

  const openCreateModal = () => {
    setEditingCustomer(null);
    setFormData(emptyForm);
    setShowFormModal(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      visits: customer.visits,
      lastVisit: customer.lastVisit,
      favoriteService: customer.favoriteService,
      notes: customer.notes,
    });
    setShowFormModal(true);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Bitte Name und Telefonnummer ausfüllen.");
      return;
    }

    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === editingCustomer.id
            ? {
                ...customer,
                ...formData,
                visits: Number(formData.visits) || 0,
              }
            : customer,
        ),
      );
    } else {
      setCustomers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          visits: Number(formData.visits) || 0,
        },
      ]);
    }

    setShowFormModal(false);
    setEditingCustomer(null);
    setFormData(emptyForm);
  };

  const handleDeleteCustomer = (id) => {
    const confirmed = window.confirm(
      "Möchten Sie diesen Kunden wirklich löschen?",
    );
    if (!confirmed) return;

    setCustomers((prev) => prev.filter((customer) => customer.id !== id));

    if (selectedCustomer?.id === id) {
      setSelectedCustomer(null);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setVisitFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#08030a] px-6 pt-10 pb-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c8a96b]">
          Kunden
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Kundenübersicht</h1>
            <p className="mt-2 text-sm text-white/60">
              Übersicht aller Kundinnen und Kunden mit Kontaktdaten und
              bisherigen Besuchen.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#d8b46a] px-5 py-3 font-medium text-black transition hover:brightness-110"
          >
            <Plus size={18} />
            Neuer Kunde
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Gesamt" value={stats.total} />
          <StatCard title="Neue Kunden" value={stats.newCustomers} />
          <StatCard title="Treue Kunden" value={stats.loyalCustomers} />
          <StatCard title="Besuche gesamt" value={stats.totalVisits} />
        </div>

        <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 lg:grid-cols-[1.5fr_240px_auto]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={18}
            />
            <input
              type="text"
              placeholder="Suche nach Name, Telefon, E-Mail oder Service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-white outline-none focus:border-[#d8b46a]/60"
            />
          </div>

          <select
            value={visitFilter}
            onChange={(e) => setVisitFilter(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#d8b46a]/60"
          >
            <option value="all">Alle Kunden</option>
            <option value="new">Neue Kunden</option>
            <option value="returning">Wiederkehrend</option>
            <option value="loyal">Treue Kunden</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            Zurücksetzen
          </button>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center">
            <p className="text-lg font-medium">Keine Kunden gefunden</p>
            <p className="mt-2 text-sm text-white/55">
              Passen Sie die Suche an oder legen Sie einen neuen Kunden an.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] p-6 shadow-[0_0_50px_rgba(216,180,106,0.06)]"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-2xl font-semibold">
                      {customer.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-white/65">
                      <Phone size={15} />
                      <span className="truncate">{customer.phone}</span>
                    </div>
                  </div>

                  <div className="rounded-full border border-[#d8b46a]/20 bg-[#d8b46a]/10 px-3 py-1 text-xs text-[#e7c98a]">
                    {customer.visits} Besuche
                  </div>
                </div>

                <div className="space-y-2 text-sm text-white/70">
                  <p className="truncate">
                    <span className="text-white/45">E-Mail:</span>{" "}
                    {customer.email || "—"}
                  </p>
                  <p className="truncate">
                    <span className="text-white/45">Lieblingsservice:</span>{" "}
                    {customer.favoriteService || "—"}
                  </p>
                  <p>
                    <span className="text-white/45">Letzter Besuch:</span>{" "}
                    {customer.lastVisit ? formatDate(customer.lastVisit) : "—"}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <ActionButton
                    onClick={() => setSelectedCustomer(customer)}
                    icon={<Eye size={15} />}
                    label="Ansehen"
                  />
                  <ActionButton
                    onClick={() => openEditModal(customer)}
                    icon={<Pencil size={15} />}
                    label="Bearbeiten"
                  />
                  <ActionButton
                    danger
                    onClick={() => handleDeleteCustomer(customer.id)}
                    icon={<Trash2 size={15} />}
                    label="Löschen"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCustomer && (
        <Modal onClose={() => setSelectedCustomer(null)} title="Kundendetails">
          <div className="space-y-3 text-sm text-white/80">
            <DetailRow label="Name" value={selectedCustomer.name} />
            <DetailRow label="Telefon" value={selectedCustomer.phone} />
            <DetailRow label="E-Mail" value={selectedCustomer.email || "—"} />
            <DetailRow label="Besuche" value={selectedCustomer.visits} />
            <DetailRow
              label="Letzter Besuch"
              value={
                selectedCustomer.lastVisit
                  ? formatDate(selectedCustomer.lastVisit)
                  : "—"
              }
            />
            <DetailRow
              label="Lieblingsservice"
              value={selectedCustomer.favoriteService || "—"}
            />
            <DetailRow label="Notizen" value={selectedCustomer.notes || "—"} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCustomer(null);
                openEditModal(selectedCustomer);
              }}
              className="rounded-xl bg-[#d8b46a]/20 px-4 py-2 text-sm text-[#f1d79b]"
            >
              Bearbeiten
            </button>
          </div>
        </Modal>
      )}

      {showFormModal && (
        <Modal
          onClose={() => {
            setShowFormModal(false);
            setEditingCustomer(null);
          }}
          title={
            editingCustomer ? "Kunde bearbeiten" : "Neuen Kunden erstellen"
          }
        >
          <form onSubmit={handleSaveCustomer} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
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
                label="E-Mail"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <InputField
                label="Besuche"
                type="number"
                min="0"
                value={formData.visits}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, visits: e.target.value }))
                }
              />
              <InputField
                label="Letzter Besuch"
                type="date"
                value={formData.lastVisit}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastVisit: e.target.value,
                  }))
                }
              />
              <InputField
                label="Lieblingsservice"
                value={formData.favoriteService}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    favoriteService: e.target.value,
                  }))
                }
              />
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
                className="rounded-2xl bg-[#d8b46a] px-5 py-3 font-medium text-black transition hover:brightness-110"
              >
                {editingCustomer ? "Änderungen speichern" : "Kunde erstellen"}
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

function ActionButton({ icon, label, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2 text-sm transition ${
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
