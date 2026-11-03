import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-ivory text-ink transition-colors dark:bg-[#0c1613] dark:text-cream">
      <Outlet />
    </div>
  );
}
