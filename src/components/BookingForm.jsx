import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    service: "",
    time: "",
    message: "",
  });

  const bookedDates = useMemo(
    () => [
      new Date(2026, 3, 14),
      new Date(2026, 3, 16),
      new Date(2026, 3, 18),
      new Date(2026, 3, 21),
    ],
    [],
  );

  const disabledDays = useMemo(() => {
    return [{ before: new Date() }, ...bookedDates];
  }, [bookedDates]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedDate) {
      alert("Bitte wählen Sie zuerst ein freies Datum aus.");
      return;
    }

    const payload = {
      ...form,
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
          Wählen Sie ein verfügbares Datum und senden Sie Ihre Anfrage bequem
          online an unser Studio.
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
                onSelect={setSelectedDate}
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

            <input
              className="h-12 rounded-2xl border border-[#c8ae72]/18 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none"
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />

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
