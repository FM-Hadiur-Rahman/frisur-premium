import { useEffect, useMemo, useState } from "react";

const defaultSettings = {
  salonName: "Maison Élégance",
  phone: "+49 211 12345678",
  email: "hello@maison-elegance.de",
  address: "Königsallee 25, 40212 Düsseldorf",
  website: "",
  slotDuration: 30,
  breakBetweenAppointments: 10,
  cancellationHours: 24,
  allowOnlineBooking: true,
  showPrices: true,
  primaryColor: "#d8b46a",
  secondaryColor: "#1b0f14",
  logoPreview: "",
  openingHours: {
    monday: "09:00 - 18:00",
    tuesday: "09:00 - 18:00",
    wednesday: "09:00 - 18:00",
    thursday: "09:00 - 20:00",
    friday: "09:00 - 20:00",
    saturday: "10:00 - 16:00",
    sunday: "Closed",
  },
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [savedSettings, setSavedSettings] = useState(defaultSettings);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("salon-settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSettings(parsed);
      setSavedSettings(parsed);
    }
    setLoading(false);
  }, []);

  const hasChanges = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(savedSettings);
  }, [settings, savedSettings]);

  const updateField = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const updateHour = (day, value) => {
    setSettings((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: value,
      },
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!settings.salonName.trim())
      newErrors.salonName = "Salon name is required.";
    if (!settings.phone.trim()) newErrors.phone = "Phone number is required.";

    if (!settings.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(settings.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!settings.address.trim()) newErrors.address = "Address is required.";

    if (settings.slotDuration < 5) {
      newErrors.slotDuration = "Slot duration must be at least 5 minutes.";
    }

    if (settings.breakBetweenAppointments < 0) {
      newErrors.breakBetweenAppointments = "Break time cannot be negative.";
    }

    if (settings.cancellationHours < 0) {
      newErrors.cancellationHours = "Cancellation time cannot be negative.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSettings((prev) => ({
        ...prev,
        logoPreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!validate()) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    try {
      // Demo persistence
      localStorage.setItem("salon-settings", JSON.stringify(settings));

      // Real backend example:
      // await axios.put("/api/admin/settings", settings);

      setSavedSettings(settings);
      setStatus({ type: "success", message: "Settings saved successfully." });
    } catch (error) {
      setStatus({ type: "error", message: "Failed to save settings." });
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setErrors({});
    setStatus({
      type: "success",
      message: "Settings reset to default values.",
    });
  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6">
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08030a] px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c8a96b]">
          Einstellungen
        </p>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Salon-Einstellungen</h1>
            <p className="mt-2 text-sm text-white/60">
              Verwalten Sie Stammdaten, Buchungseinstellungen und Branding.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="rounded-full border border-amber-400/30 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                Unsaved changes
              </span>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>
        </div>

        {status.message && (
          <div
            className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
              status.type === "success"
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                : "border-red-400/30 bg-red-400/10 text-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <section className="rounded-3xl border border-[#6f4a24]/40 bg-gradient-to-br from-[#2a1714] to-[#11070f] p-6 shadow-[0_0_60px_rgba(216,180,106,0.10)]">
            <h2 className="mb-5 text-xl font-semibold text-[#f3e2bf]">
              Salon Info
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Salon Name"
                value={settings.salonName}
                onChange={(e) => updateField("salonName", e.target.value)}
                error={errors.salonName}
              />

              <Field
                label="Phone"
                value={settings.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                error={errors.phone}
              />

              <Field
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
              />

              <Field
                label="Website"
                value={settings.website}
                onChange={(e) => updateField("website", e.target.value)}
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/70">
                  Address
                </label>
                <textarea
                  rows={3}
                  value={settings.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#d8b46a]/60"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-300">{errors.address}</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-semibold">Booking Settings</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Field
                label="Slot Duration (min)"
                type="number"
                value={settings.slotDuration}
                onChange={(e) =>
                  updateField("slotDuration", Number(e.target.value))
                }
                error={errors.slotDuration}
              />

              <Field
                label="Break Between Appointments (min)"
                type="number"
                value={settings.breakBetweenAppointments}
                onChange={(e) =>
                  updateField(
                    "breakBetweenAppointments",
                    Number(e.target.value),
                  )
                }
                error={errors.breakBetweenAppointments}
              />

              <Field
                label="Cancellation Notice (hours)"
                type="number"
                value={settings.cancellationHours}
                onChange={(e) =>
                  updateField("cancellationHours", Number(e.target.value))
                }
                error={errors.cancellationHours}
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Toggle
                label="Allow online booking"
                checked={settings.allowOnlineBooking}
                onChange={() =>
                  updateField(
                    "allowOnlineBooking",
                    !settings.allowOnlineBooking,
                  )
                }
              />

              <Toggle
                label="Show prices on website"
                checked={settings.showPrices}
                onChange={() => updateField("showPrices", !settings.showPrices)}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-semibold">Opening Hours</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(settings.openingHours).map(([day, value]) => (
                <Field
                  key={day}
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                  value={value}
                  onChange={(e) => updateHour(day, e.target.value)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-semibold">Branding</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Field
                  label="Primary Color"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => updateField("primaryColor", e.target.value)}
                />

                <Field
                  label="Secondary Color"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) =>
                    updateField("secondaryColor", e.target.value)
                  }
                />

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Logo Upload
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="block w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#d8b46a] file:px-3 file:py-2 file:text-black"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="mb-4 text-sm text-white/60">Live Preview</p>
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: `linear-gradient(135deg, ${settings.secondaryColor}, #0a0a0a)`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    {settings.logoPreview ? (
                      <img
                        src={settings.logoPreview}
                        alt="Salon logo"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: settings.primaryColor,
                          color: "#111",
                        }}
                      >
                        M
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold">{settings.salonName}</h3>
                      <p className="text-sm text-white/60">{settings.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl px-4 py-2 text-sm font-medium"
                    style={{
                      backgroundColor: settings.primaryColor,
                      color: "#111",
                    }}
                  >
                    Jetzt buchen
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!hasChanges}
              className="rounded-2xl bg-[#d8b46a] px-6 py-3 font-medium text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Änderungen speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#d8b46a]/60"
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left transition hover:bg-black/30"
    >
      <span className="text-sm text-white/80">{label}</span>
      <span
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-[#d8b46a]" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}
