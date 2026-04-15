import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, startOfToday } from "date-fns";
import toast from "react-hot-toast";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5005/api";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState();
  const [services, setServices] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingCoupons, setLoadingCoupons] = useState(true);
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    serviceId: "",
    employeeId: "",
    time: "",
    message: "",
    couponCode: "",
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");

  const allTimeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_BASE}/services`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Leistungen konnten nicht geladen werden.",
          );
        }

        setServices(data.data || []);
      } catch (error) {
        console.error("Services load error:", error);
        toast.error("Leistungen konnten nicht geladen werden.", {
          id: "services-load",
        });
      } finally {
        setLoadingServices(false);
      }
    }

    async function fetchCoupons() {
      try {
        const res = await fetch(`${API_BASE}/coupons`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Gutscheine konnten nicht geladen werden.",
          );
        }

        setCoupons(data.data || []);
      } catch (error) {
        console.error("Coupons load error:", error);
        toast.error("Gutscheine konnten nicht geladen werden.", {
          id: "coupons-load",
        });
      } finally {
        setLoadingCoupons(false);
      }
    }

    fetchServices();
    fetchCoupons();
  }, []);

  const disabledDays = useMemo(() => [{ before: startOfToday() }], []);

  const formattedSelectedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const selectedService = useMemo(() => {
    return (
      services.find(
        (service) => (service._id || service.id) === form.serviceId,
      ) || null
    );
  }, [services, form.serviceId]);

  const availableEmployees = selectedService?.employeeIds || [];
  const servicePrice = selectedService?.price || 0;

  const availableSlots = useMemo(() => {
    return allTimeSlots.filter((slot) => !bookedSlots.includes(slot));
  }, [bookedSlots]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || !servicePrice) return 0;

    if (appliedCoupon.type === "percentage") {
      return Number(((servicePrice * appliedCoupon.value) / 100).toFixed(2));
    }

    if (appliedCoupon.type === "fixed") {
      return Math.min(appliedCoupon.value, servicePrice);
    }

    return 0;
  }, [appliedCoupon, servicePrice]);

  const finalPrice = Math.max(servicePrice - discountAmount, 0);

  useEffect(() => {
    async function fetchBookedSlots() {
      if (!formattedSelectedDate || !form.serviceId) {
        setBookedSlots([]);
        return;
      }

      try {
        setLoadingBookedSlots(true);

        let url = `${API_BASE}/appointments/booked-slots?date=${encodeURIComponent(
          formattedSelectedDate,
        )}&serviceId=${encodeURIComponent(form.serviceId)}`;

        if (form.employeeId) {
          url += `&employeeId=${encodeURIComponent(form.employeeId)}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Gebuchte Uhrzeiten konnten nicht geladen werden.",
          );
        }

        setBookedSlots(data.data || []);
      } catch (error) {
        console.error("Booked slots load error:", error);
        toast.error("Gebuchte Uhrzeiten konnten nicht geladen werden.", {
          id: "booked-slots-load",
        });
        setBookedSlots([]);
      } finally {
        setLoadingBookedSlots(false);
      }
    }

    fetchBookedSlots();
  }, [formattedSelectedDate, form.serviceId, form.employeeId]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "serviceId") {
      setForm((prev) => ({
        ...prev,
        serviceId: value,
        employeeId: "",
        time: "",
        couponCode: "",
      }));
      setAppliedCoupon(null);
      setCouponMessage("");
      return;
    }

    if (name === "employeeId") {
      setForm((prev) => ({
        ...prev,
        employeeId: value,
        time: "",
      }));
      return;
    }

    if (name === "couponCode") {
      setForm((prev) => ({
        ...prev,
        couponCode: value,
      }));
      setAppliedCoupon(null);
      setCouponMessage("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSelectDate(date) {
    setSelectedDate(date);
    setForm((prev) => ({
      ...prev,
      time: "",
    }));
  }

  function handleApplyCoupon() {
    if (!form.couponCode.trim()) {
      setAppliedCoupon(null);
      setCouponMessage("Bitte geben Sie einen Gutscheincode ein.");
      toast.error("Bitte geben Sie einen Gutscheincode ein.");
      return;
    }

    if (!selectedService) {
      setAppliedCoupon(null);
      setCouponMessage("Bitte wählen Sie zuerst eine Leistung aus.");
      toast.error("Bitte wählen Sie zuerst eine Leistung aus.");
      return;
    }

    const code = form.couponCode.trim().toUpperCase();
    const foundCoupon = coupons.find((coupon) => coupon.code === code);

    if (!foundCoupon) {
      setAppliedCoupon(null);
      setCouponMessage("Dieser Gutscheincode ist ungültig.");
      toast.error("Dieser Gutscheincode ist ungültig.");
      return;
    }

    if (!foundCoupon.isActive) {
      setAppliedCoupon(null);
      setCouponMessage("Dieser Gutscheincode ist derzeit nicht aktiv.");
      toast.error("Dieser Gutscheincode ist derzeit nicht aktiv.");
      return;
    }

    if (servicePrice < (foundCoupon.minAmount || 0)) {
      setAppliedCoupon(null);
      setCouponMessage(
        `Dieser Gutschein gilt erst ab ${foundCoupon.minAmount} €.`,
      );
      toast.error(`Dieser Gutschein gilt erst ab ${foundCoupon.minAmount} €.`);
      return;
    }

    if (
      foundCoupon.appliesToService &&
      foundCoupon.appliesToService._id &&
      String(foundCoupon.appliesToService._id) !== String(selectedService._id)
    ) {
      setAppliedCoupon(null);
      setCouponMessage("Dieser Gutschein gilt nicht für diese Leistung.");
      toast.error("Dieser Gutschein gilt nicht für diese Leistung.");
      return;
    }

    setAppliedCoupon(foundCoupon);
    setCouponMessage(
      `Gutschein ${foundCoupon.code} wurde erfolgreich angewendet.`,
    );
    toast.success(`Gutschein ${foundCoupon.code} wurde angewendet.`);
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponMessage("Gutschein wurde entfernt.");
    setForm((prev) => ({
      ...prev,
      couponCode: "",
    }));
    toast.success("Gutschein wurde entfernt.");
  }

  async function refreshBookedSlots(serviceId, employeeId, date) {
    if (!date || !serviceId) return;

    try {
      let url = `${API_BASE}/appointments/booked-slots?date=${encodeURIComponent(
        date,
      )}&serviceId=${encodeURIComponent(serviceId)}`;

      if (employeeId) {
        url += `&employeeId=${encodeURIComponent(employeeId)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Gebuchte Uhrzeiten konnten nicht geladen werden.",
        );
      }

      setBookedSlots(data.data || []);
    } catch (error) {
      console.error("Booked slots refresh error:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Bitte wählen Sie zuerst ein Datum aus.");
      return;
    }

    if (!form.serviceId) {
      toast.error("Bitte wählen Sie eine Leistung aus.");
      return;
    }

    if (!form.time) {
      toast.error("Bitte wählen Sie eine Uhrzeit aus.");
      return;
    }

    const payload = {
      name: form.name,
      contact: form.contact,
      serviceId: form.serviceId,
      employeeId: form.employeeId || "",
      date: formattedSelectedDate,
      time: form.time,
      message: form.message,
      couponCode: appliedCoupon ? appliedCoupon.code : "",
    };

    const submittedTime = form.time;
    const submittedServiceId = form.serviceId;
    const submittedEmployeeId = form.employeeId;
    const submittedDate = formattedSelectedDate;

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Buchung fehlgeschlagen.");
      }

      toast.success("Termin erfolgreich gebucht.");

      setForm({
        name: "",
        contact: "",
        serviceId: "",
        employeeId: "",
        time: "",
        message: "",
        couponCode: "",
      });

      setAppliedCoupon(null);
      setCouponMessage("");
      setBookedSlots([]);

      await refreshBookedSlots(
        submittedServiceId,
        submittedEmployeeId,
        submittedDate,
      );

      setForm((prev) => ({
        ...prev,
        name: "",
        contact: "",
        serviceId: submittedServiceId,
        employeeId: submittedEmployeeId,
        time: "",
        message: "",
        couponCode: "",
      }));
    } catch (error) {
      console.error("Appointment submit error:", error);
      toast.error(error.message || "Ein Fehler ist aufgetreten.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="termin"
      className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-[#c8ae72]">
          TERMINBUCHUNG
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#fff5df] md:text-4xl">
          Buchen Sie Ihren Wunschtermin
        </h2>
        <p className="mt-4 max-w-2xl text-[#cfbea2]">
          Wählen Sie eine Leistung, einen Mitarbeitenden und eine freie Uhrzeit
          für Ihren gewünschten Termin.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
                Verfügbarkeit
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#fff2d2]">
                Freie Termine im Kalender
              </h3>
            </div>

            <div className="rounded-full border border-[#c8ae72]/20 bg-[#c8ae72]/10 px-4 py-2 text-sm text-[#f1ddb0]">
              Live Demo
            </div>
          </div>

          <div className="rounded-[28px] border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-4 md:p-5">
            <div className="booking-calendar">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                disabled={disabledDays}
                showOutsideDays
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-4">
              <div className="mb-2 h-3 w-3 rounded-full bg-[#d7ba77]" />
              <p className="text-sm font-medium text-[#fff2d2]">Ausgewählt</p>
              <p className="mt-1 text-xs leading-5 text-[#c9bba5]">
                Ihr aktuell gewählter Termin
              </p>
            </div>

            <div className="rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-4">
              <div className="mb-2 h-3 w-3 rounded-full bg-[#6f6254]" />
              <p className="text-sm font-medium text-[#fff2d2]">Belegt</p>
              <p className="mt-1 text-xs leading-5 text-[#c9bba5]">
                Dieser Slot ist aktuell nicht frei
              </p>
            </div>

            <div className="rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-4">
              <div className="mb-2 h-3 w-3 rounded-full bg-[#f1ddb0]" />
              <p className="text-sm font-medium text-[#fff2d2]">Heute</p>
              <p className="mt-1 text-xs leading-5 text-[#c9bba5]">
                Aktueller Tag im Kalender
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
              Ausgewähltes Datum
            </p>
            <p className="mt-2 text-lg font-semibold text-[#fff2d2]">
              {selectedDate
                ? format(selectedDate, "dd.MM.yyyy")
                : "Bitte wählen Sie ein verfügbares Datum"}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(18,12,17,0.97))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-8"
        >
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
              Anfrage senden
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#fff2d2]">
              Persönliche Terminanfrage
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#cfbea2]">
              Wählen Sie Ihre gewünschte Leistung und auf Wunsch Ihre bevorzugte
              Fachkraft.
            </p>
          </div>

          <div className="grid gap-4">
            <input
              className="h-12 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none placeholder:text-[#a99a86]"
              name="name"
              placeholder="Vollständiger Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              className="h-12 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none placeholder:text-[#a99a86]"
              name="contact"
              placeholder="Telefon oder E-Mail"
              value={form.contact}
              onChange={handleChange}
              required
            />

            <select
              className="h-12 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none"
              name="serviceId"
              value={form.serviceId}
              onChange={handleChange}
              required
              disabled={loadingServices}
            >
              <option value="" className="text-black">
                {loadingServices
                  ? "Leistungen werden geladen..."
                  : "Bitte Leistung auswählen"}
              </option>

              {services.map((service) => {
                const serviceId = service._id || service.id;

                return (
                  <option
                    key={serviceId}
                    value={serviceId}
                    className="text-black"
                  >
                    {service.name}
                  </option>
                );
              })}
            </select>

            {selectedService ? (
              <>
                <select
                  className="h-12 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none"
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleChange}
                >
                  <option value="" className="text-black">
                    Beliebige verfügbare Fachkraft
                  </option>

                  {availableEmployees.map((employee) => (
                    <option
                      key={employee._id}
                      value={employee._id}
                      className="text-black"
                    >
                      {employee.name}
                      {employee.role ? ` – ${employee.role}` : ""}
                    </option>
                  ))}
                </select>

                <div className="rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#c8ae72]">
                    Gewählte Leistung
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[#fff2d2]">
                        {selectedService.name}
                      </span>
                      <span className="text-xs text-[#c9bba5]">
                        {selectedService.durationMinutes} Minuten ·{" "}
                        {availableEmployees.length || 1} verfügbare Fachkräfte
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-[#f1ddb0]">
                      {servicePrice.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                className="h-12 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] uppercase outline-none placeholder:text-[#a99a86]"
                name="couponCode"
                placeholder="Gutscheincode eingeben"
                value={form.couponCode}
                onChange={handleChange}
                disabled={loadingCoupons}
              />

              <button
                type="button"
                onClick={handleApplyCoupon}
                className="h-12 rounded-2xl border border-[#c8ae72]/20 bg-[#c8ae72]/10 px-5 font-medium text-[#f1ddb0] transition hover:bg-[#c8ae72]/20"
                disabled={loadingCoupons}
              >
                Einlösen
              </button>
            </div>

            {couponMessage ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  appliedCoupon
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                    : "border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] text-[#cfbea2]"
                }`}
              >
                {couponMessage}
              </div>
            ) : null}

            {appliedCoupon ? (
              <div className="flex items-center justify-between rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 py-3">
                <div>
                  <p className="text-sm text-[#fff2d2]">
                    Gutschein aktiv:{" "}
                    <span className="font-semibold">{appliedCoupon.code}</span>
                  </p>
                  <p className="text-xs text-[#c9bba5]">
                    {appliedCoupon.type === "percentage"
                      ? `${appliedCoupon.value}% Rabatt`
                      : `${appliedCoupon.value} € Rabatt`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-sm text-[#e8d39a] transition hover:text-[#fff2d2]"
                >
                  Entfernen
                </button>
              </div>
            ) : null}

            <div className="rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] p-4">
              <p className="mb-3 text-sm text-[#c8ae72]">
                Verfügbare Uhrzeiten
              </p>

              {!selectedDate ? (
                <p className="text-sm text-[#cfbea2]">
                  Bitte wählen Sie zuerst ein Datum aus.
                </p>
              ) : !form.serviceId ? (
                <p className="text-sm text-[#cfbea2]">
                  Bitte wählen Sie zuerst eine Leistung aus.
                </p>
              ) : loadingBookedSlots ? (
                <p className="text-sm text-[#cfbea2]">
                  Uhrzeiten werden geladen...
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            time: slot,
                          }))
                        }
                        className={`rounded-xl px-4 py-2 text-sm transition ${
                          form.time === slot
                            ? "bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] text-[#23170d]"
                            : "border border-[#c8ae72]/20 bg-[rgba(255,255,255,0.03)] text-[#f8f0e3] hover:bg-[#c8ae72]/10"
                        }`}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-[#cfbea2]">
                      Für diese Auswahl sind keine Uhrzeiten mehr verfügbar.
                    </p>
                  )}
                </div>
              )}
            </div>

            {form.time ? (
              <p className="text-sm text-[#e8d39a]">
                Gewählte Uhrzeit:{" "}
                <span className="font-semibold">{form.time}</span>
              </p>
            ) : null}

            <div className="rounded-[24px] border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[#c8ae72]">
                Preisübersicht
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-[#cfbea2]">
                  <span>Leistung</span>
                  <span>{servicePrice.toFixed(2)} €</span>
                </div>

                <div className="flex items-center justify-between text-[#cfbea2]">
                  <span>Rabatt</span>
                  <span>- {discountAmount.toFixed(2)} €</span>
                </div>

                <div className="h-px bg-[#c8ae72]/10" />

                <div className="flex items-center justify-between text-base font-semibold text-[#fff2d2]">
                  <span>Gesamt</span>
                  <span>{finalPrice.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <textarea
              className="min-h-32 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#fff5df] outline-none placeholder:text-[#a99a86]"
              name="message"
              placeholder="Zusätzliche Wünsche oder Nachricht"
              value={form.message}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 h-12 rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] font-medium text-[#23170d] shadow-[0_10px_30px_rgba(183,147,79,0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Wird gesendet..." : "Terminanfrage senden"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
