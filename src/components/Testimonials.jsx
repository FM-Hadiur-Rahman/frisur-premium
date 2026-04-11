import { reviews } from "../data/salonData";

export default function Testimonials() {
  return (
    <section
      id="bewertungen"
      className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#c8ae72]">
            Reviews
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#fff5df] md:text-4xl">
            What our clients say
          </h2>
        </div>

        <div className="rounded-full border border-[#c8ae72]/20 bg-[#c8ae72]/10 px-4 py-2 text-sm text-[#f1ddb0]">
          4.9 average rating
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-[30px] border border-[#c8ae72]/20 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-2xl"
          >
            <div className="mb-4 text-[#d7ba77]">★★★★★</div>
            <p className="leading-7 text-[#e6d8bc]">“{review.text}”</p>
            <p className="mt-5 font-medium text-[#fff2d2]">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
