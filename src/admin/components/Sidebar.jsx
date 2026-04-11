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
    <aside className="border-r border-[#c8ae72]/10 bg-[rgba(18,13,18,0.9)] px-5 py-6 backdrop-blur-xl">
      <div className="mb-10">
        <p className="text-lg font-semibold tracking-[0.08em] text-[#fff3d7]">
          Maison Élégance
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#c8ae72]">
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
                  ? "bg-gradient-to-r from-[#f1ddb0] via-[#d7ba77] to-[#b6934f] font-medium text-[#23170d]"
                  : "text-[#e7d9bd] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#fff3d7]"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-[24px] border border-[#c8ae72]/15 bg-[rgba(255,255,255,0.03)] p-4">
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
