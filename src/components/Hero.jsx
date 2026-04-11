import { motion } from "framer-motion";
import heroImage from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col justify-center"
      >
        <div className="mb-5 inline-flex w-fit rounded-full border border-[#c8ae72]/20 bg-[#c8ae72]/10 px-4 py-2 text-sm text-[#f0ddb1]">
          Premium Demo-Frontend für exklusive Friseursalons
        </div>

        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[#fff5df] md:text-6xl">
          Luxus, Stil und ein Salon-Erlebnis mit unverwechselbarer Eleganz
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-[#d7c6ac] md:text-lg">
          Eine edle Demo-Website für hochwertige Friseursalons mit
          Premium-Leistungen, stilvollem Ambiente, Kundenbewertungen und
          exklusiver Terminbuchung.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#termin"
            className="rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] px-6 py-4 font-medium text-[#23170d] shadow-lg transition hover:brightness-110"
          >
            Jetzt Termin anfragen
          </a>

          <a
            href="#leistungen"
            className="rounded-2xl border border-[#c8ae72]/30 px-6 py-4 font-medium text-[#f2e6c8] transition hover:bg-[#c8ae72]/10"
          >
            Preise ansehen
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            "Persönliche Beratung",
            "Premium-Produkte",
            "Online-Terminbuchung",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full border border-[#c8ae72]/20 bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#eadcbe]"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-[36px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-3 shadow-2xl">
          <div className="relative overflow-hidden rounded-[30px]">
            <img
              src={heroImage}
              alt="Luxuriöser Friseursalon"
              className="h-[540px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120d12]/75 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-8 left-8 right-8">
            <div className="rounded-[24px] border border-[#c8ae72]/20 bg-[rgba(18,13,18,0.78)] px-5 py-4 backdrop-blur-md">
              <p className="text-sm text-[#c8ae72]">Maison Élégance</p>
              <p className="mt-1 text-xl font-semibold text-[#fff5df]">
                Exklusives Styling in luxuriösem Ambiente
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -left-6 top-8 rounded-[22px] border border-[#c8ae72]/20 bg-[rgba(18,13,18,0.9)] px-5 py-4 shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c8ae72]">
            Bewertung
          </p>
          <p className="mt-2 text-2xl font-bold text-[#fff2d2]">4,9/5</p>
          <p className="text-sm text-[#cfbea2]">Über 320 Rezensionen</p>
        </div>

        <div className="absolute -right-5 top-16 rounded-[22px] border border-[#c8ae72]/20 bg-[rgba(18,13,18,0.9)] px-5 py-4 shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c8ae72]">
            Heute
          </p>
          <p className="mt-2 text-lg font-semibold text-[#fff2d2]">
            Noch 2 Termine frei
          </p>
          <p className="text-sm text-[#cfbea2]">Balayage • Schnitt • Styling</p>
        </div>

        <div className="absolute -bottom-5 left-10 rounded-[22px] border border-[#c8ae72]/20 bg-[rgba(18,13,18,0.9)] px-5 py-4 shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c8ae72]">
            Öffnungszeiten
          </p>
          <p className="mt-2 text-lg font-semibold text-[#fff2d2]">
            Mo–Fr 09:00–19:00
          </p>
          <p className="text-sm text-[#cfbea2]">Sa 10:00–17:00</p>
        </div>

        <div className="absolute right-8 bottom-24 rounded-[22px] border border-[#c8ae72]/20 bg-[rgba(18,13,18,0.9)] px-5 py-4 shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c8ae72]">
            Instagram
          </p>
          <p className="mt-2 text-lg font-semibold text-[#fff2d2]">
            @maison_elegance
          </p>
          <p className="text-sm text-[#cfbea2]">
            Folgen Sie uns für Inspiration
          </p>
        </div>
      </motion.div>
    </section>
  );
}
