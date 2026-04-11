import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(200,174,114,0.08),transparent_20%),linear-gradient(180deg,#0f0b12_0%,#151018_100%)] text-[#f8f0e3]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex min-h-screen flex-col">
          <Topbar />
          <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
