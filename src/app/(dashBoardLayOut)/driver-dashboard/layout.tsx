import type { Metadata } from "next";
import { DriverLayOut } from "./layout/driverLayOut";

export const metadata: Metadata = {
  title: "Dashboard Applo Gears",
  description: "Wellcome To Appolo Gears DashBoard",
};

export default function DriverDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Driver Dashboard */}
      <DriverLayOut>{children}</DriverLayOut>
    </div>
  );
}
