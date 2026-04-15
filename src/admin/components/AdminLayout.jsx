import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0f0b12] text-[#f8f0e3]">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        <Sidebar />

        <main className="min-w-0 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
