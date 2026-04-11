import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const servicePrices = {
  "Signature Damenhaarschnitt": 79,
  "Executive Herrenhaarschnitt": 49,
  "Farbe & Balayage Deluxe": 189,
  "Braut- & Eventstyling": 249,
};

const demoCoupons = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minAmount: 30,
    isActive: true,
  },
  {
    code: "VIP15",
    type: "fixed",
    value: 15,
    minAmount: 80,
    isActive: true,
  },
  {
    code: "COLOR20",
    type: "fixed",
    value: 20,
    minAmount: 150,
    isActive: true,
    service: "Farbe & Balayage Deluxe",
  },
];

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    service: "",
    time: "",
    message: "",
    couponCode: "",
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");

  const bookedDates = useMemo(
    () => [
      new Date(2026, 3, 14),
      new Date(2026, 3, 16),
      new Date(2026, 3, 18),
      new Date(2026, 3, 21),
    ],
    [],
  );

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

  const bookedTimeSlots = {
    "2026-04-12": ["09:00", "09:30"],
    "2026-04-13": ["10:00", "10:30", "11:00"],
    "2026-04-15": ["14:00", "14:30"],
    "2026-04-17": ["09:00", "11:30", "16:00"],
    "2026-04-19": ["10:30", "15:00"],
    "2026-04-20": ["09:00", "12:00", "14:30"],
  };

  const disabledDays = useMemo(() => {
    return [{ before: new Date() }, ...bookedDates];
  }, [bookedDates]);

  const formattedSelectedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const unavailableSlots = formattedSelectedDate
    ? bookedTimeSlots[formattedSelectedDate] || []
    : [];

  const availableSlots = allTimeSlots.filter(
    (slot) => !unavailableSlots.includes(slot),
  );

  const servicePrice = form.service ? servicePrices[form.service] || 0 : 0;

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

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "service") {
      setAppliedCoupon(null);
      setCouponMessage("");
    }

    if (name === "couponCode") {
      setAppliedCoupon(null);
      setCouponMessage("");
    }
  }

  function handleSelectDate(date) {
    setSelectedDate(date);
    setForm((prev) => ({ ...prev, time: "" }));
  }

  function handleApplyCoupon() {
    if (!form.couponCode.trim()) {
      setAppliedCoupon(null);
      setCouponMessage("Bitte geben Sie einen Gutscheincode ein.");
      return;
    }

    if (!form.service) {
      setAppliedCoupon(null);
      setCouponMessage("Bitte wählen Sie zuerst eine Leistung aus.");
      return;
    }

    const code = form.couponCode.trim().toUpperCase();

    const foundCoupon = demoCoupons.find((coupon) => coupon.code === code);

    if (!foundCoupon) {
      setAppliedCoupon(null);
      setCouponMessage("Dieser Gutscheincode ist ungültig.");
      return;
    }

    if (!foundCoupon.isActive) {
      setAppliedCoupon(null);
      setCouponMessage("Dieser Gutscheincode ist derzeit nicht aktiv.");
      return;
    }

    if (servicePrice < foundCoupon.minAmount) {
      setAppliedCoupon(null);
      setCouponMessage(
        `Dieser Gutschein gilt erst ab ${foundCoupon.minAmount} €.`,
      );
      return;
    }

    if (foundCoupon.service && foundCoupon.service !== form.service) {
      setAppliedCoupon(null);
      setCouponMessage(
        `Dieser Gutschein gilt nur für: ${foundCoupon.service}.`,
      );
      return;
    }

    setAppliedCoupon(foundCoupon);
    setCouponMessage(
      `Gutschein ${foundCoupon.code} wurde erfolgreich angewendet.`,
    );
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponMessage("Gutschein wurde entfernt.");
    setForm((prev) => ({ ...prev, couponCode: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedDate) {
      alert("Bitte wählen Sie zuerst ein freies Datum aus.");
      return;
    }

    if (!form.time) {
      alert("Bitte wählen Sie eine verfügbare Uhrzeit aus.");
      return;
    }

    const payload = {
      ...form,
      coupon: appliedCoupon ? appliedCoupon.code : null,
      originalPrice: servicePrice,
      discount: discountAmount,
      totalPrice: finalPrice,
      date: format(selectedDate, "dd.MM.yyyy"),
    };

    console.log("Demo-Terminanfrage:", payload);
    alert("Demo: Ihre Terminanfrage wurde erfolgreich gesendet.");
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
          Wählen Sie ein verfügbares Datum und eine freie Uhrzeit und senden Sie
          Ihre Anfrage bequem online an unser Studio.
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
                Dieser Tag ist nicht verfügbar
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
              Tragen Sie Ihre Daten ein und wir melden uns schnellstmöglich bei
              Ihnen zurück.
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
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">
                Bitte Leistung auswählen
              </option>
              <option value="Signature Damenhaarschnitt" className="text-black">
                Signature Damenhaarschnitt
              </option>
              <option
                value="Executive Herrenhaarschnitt"
                className="text-black"
              >
                Executive Herrenhaarschnitt
              </option>
              <option value="Farbe & Balayage Deluxe" className="text-black">
                Farbe & Balayage Deluxe
              </option>
              <option value="Braut- & Eventstyling" className="text-black">
                Braut- & Eventstyling
              </option>
            </select>

            {form.service ? (
              <div className="rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-[#c8ae72]">
                  Gewählte Leistung
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-[#fff2d2]">{form.service}</span>
                  <span className="text-lg font-semibold text-[#f1ddb0]">
                    {servicePrice.toFixed(2)} €
                  </span>
                </div>
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                className="h-12 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] uppercase outline-none placeholder:text-[#a99a86]"
                name="couponCode"
                placeholder="Gutscheincode eingeben"
                value={form.couponCode}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={handleApplyCoupon}
                className="h-12 rounded-2xl border border-[#c8ae72]/20 bg-[#c8ae72]/10 px-5 font-medium text-[#f1ddb0] transition hover:bg-[#c8ae72]/20"
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
                      Für dieses Datum sind keine Uhrzeiten mehr verfügbar.
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
              className="mt-2 h-12 rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] font-medium text-[#23170d] shadow-[0_10px_30px_rgba(183,147,79,0.3)] transition hover:brightness-110"
            >
              Terminanfrage senden
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
