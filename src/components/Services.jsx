import { services } from "../data/salonData";

export default function Services() {
  return (
    <section
      id="leistungen"
      className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-[#c8ae72]">
          Services
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#fff5df] md:text-4xl">
          Premium salon services for modern clients
        </h2>
        <p className="mt-4 max-w-2xl text-[#cfbea2]">
          A refined service experience designed for beauty, confidence, and
          comfort.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-[30px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-2xl transition hover:-translate-y-1"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] text-[#23170d] font-bold">
              ✦
            </div>

            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-[#fff2d2]">
                {service.title}
              </h3>
              <span className="rounded-full bg-[#c8ae72]/10 px-3 py-1 text-xs text-[#f1ddb0]">
                {service.price}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#cfbea2]">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
