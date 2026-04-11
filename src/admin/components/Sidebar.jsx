import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/appointments", label: "Termine" },
  { to: "/admin/customers", label: "Kunden" },
  { to: "/admin/services", label: "Leistungen" },
  { to: "/admin/settings", label: "Einstellungen" },
];

export default function Sidebar() {
  return (
    <aside className="border-r border-[#c8ae72]/10 bg-[#120d12] px-4 py-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#fff3d7]">Maison Élégance</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#c8ae72]">
          Admin Panel
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] font-medium text-[#23170d] shadow-[0_8px_24px_rgba(183,147,79,0.18)]"
                  : "text-[#e7d9bd] hover:bg-white/5"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-2xl border border-[#c8ae72]/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[#c8ae72]">
          Status
        </p>
        <p className="mt-2 text-sm font-medium text-[#fff2d2]">
          Demo-System aktiv
        </p>
        <p className="mt-1 text-xs leading-5 text-[#cbbda8]">
          Öffentliches Frontend und Admin können später mit Backend verbunden
          werden.
        </p>
      </div>
    </aside>
  );
}
