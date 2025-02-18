import type { Metadata } from "next";
import { UserLayOut } from "./layout/userLayout";

export const metadata: Metadata = {
  title: "Dashboard Applo Gears",
  description: "Wellcome To Appolo Gears DashBoard",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* User Dashboard */}
      <UserLayOut>{children}</UserLayOut>
    </div>
  );
}
