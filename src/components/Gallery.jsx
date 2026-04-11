import img1 from "../assets/stylist-1.jpg";
import img2 from "../assets/stylist-2.jpg";
import img3 from "../assets/stylist-3.jpg";
import img4 from "../assets/stylist-4.jpg";
import img5 from "../assets/stylist-5.jpg";
import img6 from "../assets/stylist-6.jpg";

export default function Gallery() {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <section
      id="arbeiten"
      className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-[#c8ae72]">
          UNSERE ARBEITEN
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#fff5df] md:text-4xl">
          Inspiration & Ergebnisse
        </h2>
        <p className="mt-4 max-w-2xl text-[#cfbea2]">
          Entdecken Sie ausgewählte Arbeiten aus unserem Salon – moderne Looks,
          elegante Farben und präzise Schnitte.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-[24px]"
          >
            <img
              src={img}
              alt="Salon Arbeit"
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#120d12]/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="absolute bottom-4 left-4 opacity-0 transition group-hover:opacity-100">
              <p className="text-sm text-[#f1ddb0]">Premium Styling</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
