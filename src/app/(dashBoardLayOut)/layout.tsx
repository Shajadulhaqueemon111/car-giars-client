import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Dashboard Applo Gears",
  description: "Wellcome To Appolo Gears DashBoard",
};

export default function CommonDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Dashboard Navbar */}
      <Toaster />
      {children}
    </div>
  );
}
