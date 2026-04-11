import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, TicketPercent, XCircle } from "lucide-react";

const initialCoupons = [
  {
    id: 1,
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minAmount: 30,
    usageLimit: 100,
    usedCount: 12,
    expiresAt: "2026-05-31",
    isActive: true,
  },
  {
    id: 2,
    code: "VIP15",
    type: "fixed",
    value: 15,
    minAmount: 80,
    usageLimit: 30,
    usedCount: 4,
    expiresAt: "2026-06-15",
    isActive: true,
  },
];

const emptyForm = {
  code: "",
  type: "percentage",
  value: "",
  minAmount: "",
  usageLimit: "",
  expiresAt: "",
  isActive: true,
};

export default function Coupons() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const stats = useMemo(() => {
    return {
      total: coupons.length,
      active: coupons.filter((c) => c.isActive).length,
      used: coupons.reduce((sum, c) => sum + c.usedCount, 0),
    };
  }, [coupons]);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount,
      usageLimit: coupon.usageLimit,
      expiresAt: coupon.expiresAt,
      isActive: coupon.isActive,
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.code || !formData.value) {
      alert("Bitte Code und Wert eingeben.");
      return;
    }

    const payload = {
      ...formData,
      value: Number(formData.value),
      minAmount: Number(formData.minAmount || 0),
      usageLimit: Number(formData.usageLimit || 0),
    };

    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === editingCoupon.id ? { ...c, ...payload } : c)),
      );
    } else {
      setCoupons((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...payload,
          usedCount: 0,
        },
      ]);
    }

    setShowModal(false);
    setEditingCoupon(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Diesen Gutschein löschen?");
    if (!confirmed) return;
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleActive = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  };

  return (
    <div className="min-h-screen bg-[#08030a] px-6 pt-10 pb-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c8a96b]">
          Gutscheine
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Rabatte & Gutscheine</h1>
            <p className="mt-2 text-sm text-white/60">
              Verwalten Sie Rabattcodes für Ihre Kundinnen und Kunden.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#d8b46a] px-5 py-3 font-medium text-black"
          >
            <Plus size={18} />
            Neuer Gutschein
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard title="Gesamt" value={stats.total} />
          <StatCard title="Aktiv" value={stats.active} />
          <StatCard title="Verwendet" value={stats.used} />
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f]">
          <div className="grid grid-cols-[1.2fr_120px_120px_140px_140px_120px_180px] gap-4 border-b border-white/10 px-6 py-5 text-xs uppercase tracking-[0.28em] text-[#c8a96b]">
            <div>Code</div>
            <div>Typ</div>
            <div>Wert</div>
            <div>Mindestbetrag</div>
            <div>Ablauf</div>
            <div>Status</div>
            <div className="text-right">Aktionen</div>
          </div>

          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="grid grid-cols-[1.2fr_120px_120px_140px_140px_120px_180px] items-center gap-4 border-b border-white/5 px-6 py-5 last:border-b-0"
            >
              <div className="flex items-center gap-3 font-medium">
                <TicketPercent size={16} className="text-[#d8b46a]" />
                {coupon.code}
              </div>
              <div>{coupon.type === "percentage" ? "%" : "€"}</div>
              <div>
                {coupon.type === "percentage"
                  ? `${coupon.value}%`
                  : `${coupon.value} €`}
              </div>
              <div>{coupon.minAmount} €</div>
              <div>{formatDate(coupon.expiresAt)}</div>
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    coupon.isActive
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {coupon.isActive ? "Aktiv" : "Inaktiv"}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(coupon)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => toggleActive(coupon.id)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  {coupon.isActive ? "Deaktivieren" : "Aktivieren"}
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          title={
            editingCoupon ? "Gutschein bearbeiten" : "Neuen Gutschein erstellen"
          }
          onClose={() => {
            setShowModal(false);
            setEditingCoupon(null);
          }}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Code"
                value={formData.code}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    code: e.target.value.toUpperCase(),
                  }))
                }
              />
              <div>
                <label className="mb-2 block text-sm text-white/70">Typ</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, type: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white"
                >
                  <option value="percentage">Prozent</option>
                  <option value="fixed">Festbetrag</option>
                </select>
              </div>

              <InputField
                label="Wert"
                type="number"
                value={formData.value}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, value: e.target.value }))
                }
              />
              <InputField
                label="Mindestbetrag"
                type="number"
                value={formData.minAmount}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, minAmount: e.target.value }))
                }
              />
              <InputField
                label="Nutzungslimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, usageLimit: e.target.value }))
                }
              />
              <InputField
                label="Ablaufdatum"
                type="date"
                value={formData.expiresAt}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, expiresAt: e.target.value }))
                }
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, isActive: e.target.checked }))
                }
              />
              Gutschein aktiv
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-[#d8b46a] px-5 py-3 font-medium text-black"
              >
                Speichern
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

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white"
      />
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
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("de-DE");
}
