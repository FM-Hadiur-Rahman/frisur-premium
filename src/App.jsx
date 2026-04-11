import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PriceOverview from "./components/PriceOverview";
import Team from "./components/Team";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import MobileBookingBar from "./components/MobileBookingBar";

export default function App() {
  return (
    <div className="min-h-screen pb-20 text-[#f8f0e3] md:pb-0">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(200,174,114,0.14),transparent_24%),radial-gradient(circle_at_left,rgba(127,76,58,0.12),transparent_22%),linear-gradient(180deg,#120d12_0%,#1a1217_45%,#0d0a0f_100%)]" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <PriceOverview />
        <Team />
        <Gallery />
        <Testimonials />
        <BookingForm />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBookingBar />
    </div>
  );
}
