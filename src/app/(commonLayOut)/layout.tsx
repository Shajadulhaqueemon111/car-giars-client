import type { Metadata } from "next";

import NavbarPage from "./components/pages/shared/Navbar";
import Footer from "./components/pages/shared/Footer";

export const metadata: Metadata = {
  title: "Applo Gears",
  description: "Wellcome To Appolo Gears",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarPage></NavbarPage>
      {children}
      <Footer></Footer>
    </div>
  );
}
