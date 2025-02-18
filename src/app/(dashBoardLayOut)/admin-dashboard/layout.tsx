import type { Metadata } from "next";
import { AdminLayOut } from "./layout/adminLayout";

export const metadata: Metadata = {
  title: "Dashboard Applo Gears",
  description: "Wellcome To Appolo Gears DashBoard",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminLayOut> {children}</AdminLayOut>
    </div>
  );
}
