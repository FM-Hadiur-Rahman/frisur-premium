import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5005/api";

const fallbackSettings = {
  salonName: "Maison Élégance",
  phone: "+49 211 12345678",
  email: "hello@maison-elegance.de",
  address: "Königsallee 25, 40212 Düsseldorf",
  website: "",
  tagline: "Luxury Hair Lounge",
  description:
    "Exklusives Styling, hochwertige Pflege und ein Salon-Erlebnis mit Eleganz, Komfort und Persönlichkeit.",
  openingHours: {
    monday: "09:00 - 18:00",
    tuesday: "09:00 - 18:00",
    wednesday: "09:00 - 18:00",
    thursday: "09:00 - 20:00",
    friday: "09:00 - 20:00",
    saturday: "10:00 - 16:00",
    sunday: "Closed",
  },
};

export default function useSalonSettings() {
  const [settings, setSettings] = useState(fallbackSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(`${API_BASE}/settings`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load settings");
        }

        setSettings((prev) => ({
          ...prev,
          ...data.data,
          openingHours: {
            ...prev.openingHours,
            ...(data.data?.openingHours || {}),
          },
        }));
      } catch (error) {
        console.error("Public settings load error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading };
}
