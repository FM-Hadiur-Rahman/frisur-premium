import { team } from "../data/salonData";

export default function Team() {
  return (
    <section
      id="team"
      className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-[#c8ae72]">
          Team
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#fff5df] md:text-4xl">
          Lernen Sie unsere Styling-Expertinnen und -Experten kennen
        </h2>
        <p className="mt-4 max-w-2xl text-[#cfbea2]">
          Erfahrene Profis mit Leidenschaft für Präzision, Eleganz und ein
          exklusives Salon-Erlebnis.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <div
            key={member.name}
            className="group overflow-hidden rounded-[30px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] shadow-2xl transition duration-300 hover:-translate-y-1"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d12] via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#fff2d2]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-[#c8ae72]">{member.role}</p>
              <p className="mt-4 text-sm leading-6 text-[#cfbea2]">
                {member.info}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
