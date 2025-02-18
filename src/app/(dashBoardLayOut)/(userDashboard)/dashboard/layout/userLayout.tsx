/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NavbarWrapper } from "../../components/dashboardNavbar/dashboardNavbar";
import { SidebarWrapper } from "../../components/sidebar/userSidebar";

interface page {
  children: React.ReactNode;
}

export const UserLayOut = ({ children }: any) => {
  return (
    <section className="flex">
      <SidebarWrapper></SidebarWrapper>

      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
};
