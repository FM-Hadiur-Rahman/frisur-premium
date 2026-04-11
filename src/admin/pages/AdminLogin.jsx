import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5005/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login fehlgeschlagen.");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.data));

      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.message || "Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(200,174,114,0.08),transparent_20%),linear-gradient(180deg,#0f0b12_0%,#151018_100%)] px-6">
      <div className="w-full max-w-md rounded-[32px] border border-[#c8ae72]/15 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <p className="text-sm uppercase tracking-[0.24em] text-[#c8ae72]">
          Admin Login
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#fff5df]">
          Willkommen zurück
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#cfbea2]">
          Melden Sie sich an, um Termine, Kunden und Leistungen zu verwalten.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={form.email}
            onChange={handleChange}
            className="h-12 rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none placeholder:text-[#a99a86]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            value={form.password}
            onChange={handleChange}
            className="h-12 rounded-2xl border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] px-4 text-[#fff5df] outline-none placeholder:text-[#a99a86]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 rounded-2xl bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] font-medium text-[#23170d] shadow-[0_10px_30px_rgba(183,147,79,0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Anmeldung..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
