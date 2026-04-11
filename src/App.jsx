import { Navigate, Route, Routes } from "react-router-dom";

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
import PromoBanner from "./components/PromoBanner";

import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Appointments from "./admin/pages/Appointments";
import Customers from "./admin/pages/Customers";
import AdminServices from "./admin/pages/Services";
import Settings from "./admin/pages/Settings";
import Coupons from "./admin/pages/Coupons";

function PublicSite() {
  return (
    <div className="min-h-screen pb-20 text-[#f8f0e3] md:pb-0">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(200,174,114,0.14),transparent_24%),radial-gradient(circle_at_left,rgba(127,76,58,0.12),transparent_22%),linear-gradient(180deg,#120d12_0%,#1a1217_45%,#0d0a0f_100%)]" />
      <Navbar />
      <main>
        <Hero />
        <PromoBanner />

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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />

      <Route
        path="/admin/login"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="customers" element={<Customers />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/admin/coupons" element={<Coupons />} />
      </Route>
    </Routes>
  );
}
