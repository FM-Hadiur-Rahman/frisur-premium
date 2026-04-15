import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCcw,
  Power,
  UserRound,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5005/api";

const defaultForm = {
  name: "",
  role: "",
  email: "",
  phone: "",
  image: "",
  bio: "",
  isActive: true,
  workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
};

const workingDayOptions = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function fetchEmployees() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/employees/admin`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Employees could not be loaded");
      }

      setEmployees(data.data || []);
    } catch (error) {
      console.error("Employee fetch error:", error);
      alert(error.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const activeCount = useMemo(
    () => employees.filter((item) => item.isActive).length,
    [employees],
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function toggleWorkingDay(day) {
    setForm((prev) => {
      const exists = prev.workingDays.includes(day);

      return {
        ...prev,
        workingDays: exists
          ? prev.workingDays.filter((item) => item !== day)
          : [...prev.workingDays, day],
      };
    });
  }

  function resetForm() {
    setForm(defaultForm);
    setEditingId("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE}/employees/${editingId}`
        : `${API_BASE}/employees`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            (editingId
              ? "Employee could not be updated"
              : "Employee could not be created"),
        );
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error("Employee submit error:", error);
      alert(error.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(employee) {
    setEditingId(employee._id);
    setForm({
      name: employee.name || "",
      role: employee.role || "",
      email: employee.email || "",
      phone: employee.phone || "",
      image: employee.image || "",
      bio: employee.bio || "",
      isActive: employee.isActive ?? true,
      workingDays: employee.workingDays || [],
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Do you really want to delete this employee?",
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/employees/${id}`, {
        method: "DELETE",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Employee could not be deleted");
      }

      fetchEmployees();
    } catch (error) {
      console.error("Delete employee error:", error);
      alert(error.message || "Delete failed");
    }
  }

  async function handleToggleStatus(id) {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/employees/${id}/toggle-status`, {
        method: "PATCH",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Status could not be updated");
      }

      fetchEmployees();
    } catch (error) {
      console.error("Toggle status error:", error);
      alert(error.message || "Status update failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#08030a] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c8a96b]">
              Admin
            </div>
            <h1 className="text-4xl font-semibold">Mitarbeiter verwalten</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
              Mitarbeiter hinzufügen, bearbeiten, aktivieren oder deaktivieren.
            </p>
          </div>

          <button
            onClick={fetchEmployees}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#d8b46a]/20 bg-[#d8b46a]/10 px-4 py-3 text-sm text-[#e7c98a] transition hover:bg-[#d8b46a]/15"
          >
            <RefreshCcw size={16} />
            Aktualisieren
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <SummaryCard label="Gesamt" value={employees.length} />
          <SummaryCard label="Aktiv" value={activeCount} />
          <SummaryCard label="Inaktiv" value={employees.length - activeCount} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_1.5fr]">
          <div className="rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] p-6 shadow-[0_0_50px_rgba(216,180,106,0.05)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-[#d8b46a]/15 bg-[#d8b46a]/10 p-2 text-[#e5c687]">
                <Plus size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {editingId
                    ? "Mitarbeiter bearbeiten"
                    : "Neuen Mitarbeiter anlegen"}
                </h2>
                <p className="text-sm text-white/50">
                  Name, Rolle, Kontaktdaten und Verfügbarkeit pflegen.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Rolle"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="z. B. Stylist, Barber, Colorist"
              />

              <Input
                label="E-Mail"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                label="Telefon"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <Input
                label="Bild URL"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />

              <div>
                <label className="mb-2 block text-sm text-white/70">Bio</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-[#d8b46a]/35"
                  placeholder="Kurzbeschreibung des Mitarbeiters"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Arbeitstage
                </label>
                <div className="flex flex-wrap gap-2">
                  {workingDayOptions.map((day) => {
                    const active = form.workingDays.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleWorkingDay(day)}
                        className={`rounded-full border px-3 py-2 text-xs transition ${
                          active
                            ? "border-[#d8b46a]/25 bg-[#d8b46a]/12 text-[#e7c98a]"
                            : "border-white/10 bg-black/20 text-white/55 hover:bg-white/5"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                Mitarbeiter aktiv
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#d8b46a] px-5 py-3 text-sm font-medium text-[#1a1208] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus size={16} />
                  {submitting
                    ? "Speichern..."
                    : editingId
                      ? "Änderungen speichern"
                      : "Mitarbeiter erstellen"}
                </button>

                {editingId ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/75 transition hover:bg-white/5"
                  >
                    Abbrechen
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] p-6 shadow-[0_0_50px_rgba(216,180,106,0.05)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-[#d8b46a]/15 bg-[#d8b46a]/10 p-2 text-[#e5c687]">
                <UserRound size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Mitarbeiterliste</h2>
                <p className="text-sm text-white/50">
                  Alle Mitarbeiter mit Status und Schnellaktionen.
                </p>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-white/60">
                Mitarbeiter werden geladen...
              </p>
            ) : employees.length === 0 ? (
              <p className="text-sm text-white/60">
                Noch keine Mitarbeiter vorhanden.
              </p>
            ) : (
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div
                    key={employee._id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex min-w-0 gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                          {employee.image ? (
                            <img
                              src={employee.image}
                              alt={employee.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-white/35">
                              <UserRound size={22} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-lg font-medium">
                              {employee.name}
                            </h3>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-xs ${
                                employee.isActive
                                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                  : "border-red-500/20 bg-red-500/10 text-red-300"
                              }`}
                            >
                              {employee.isActive ? "Aktiv" : "Inaktiv"}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-[#d8b46a]">
                            {employee.role || "Keine Rolle"}
                          </p>

                          <div className="mt-2 space-y-1 text-sm text-white/55">
                            {employee.email ? <p>{employee.email}</p> : null}
                            {employee.phone ? <p>{employee.phone}</p> : null}
                            {employee.bio ? (
                              <p className="line-clamp-2">{employee.bio}</p>
                            ) : null}
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {(employee.workingDays || []).map((day) => (
                              <span
                                key={day}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/75 transition hover:bg-white/5"
                        >
                          <Pencil size={15} />
                          Bearbeiten
                        </button>

                        <button
                          onClick={() => handleToggleStatus(employee._id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#d8b46a]/20 bg-[#d8b46a]/10 px-3 py-2 text-sm text-[#e7c98a] transition hover:bg-[#d8b46a]/15"
                        >
                          <Power size={15} />
                          {employee.isActive ? "Deaktivieren" : "Aktivieren"}
                        </button>

                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/15"
                        >
                          <Trash2 size={15} />
                          Löschen
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] p-5 shadow-[0_0_50px_rgba(216,180,106,0.05)]">
      <p className="text-xs uppercase tracking-[0.28em] text-[#c8a96b]">
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-[#d8b46a]/35"
      />
    </div>
  );
}
