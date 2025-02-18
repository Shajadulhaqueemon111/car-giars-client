/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NavbarWrapper } from "../../(userDashboard)/components/dashboardNavbar/dashboardNavbar";

import { DriverSidebarWrapper } from "../../(userDashboard)/components/sidebar/driverSidebar";

interface page {
  children: React.ReactNode;
}

export const DriverLayOut = ({ children }: any) => {
  return (
    <section className="flex">
      <DriverSidebarWrapper></DriverSidebarWrapper>

      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
};
