/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NavbarWrapper } from "../../(userDashboard)/components/dashboardNavbar/dashboardNavbar";
import { AdminSidebarWrapper } from "../../(userDashboard)/components/sidebar/adminSidebar";

interface page {
  children: React.ReactNode;
}

export const AdminLayOut = ({ children }: any) => {
  return (
    <section className="flex">
      <AdminSidebarWrapper></AdminSidebarWrapper>

      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
};
