/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { SidebarContext } from "./layout-context";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handelSidebarToggol = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      <SidebarContext.Provider
        value={{ collapsed: sidebarOpen, setCollapsed: handelSidebarToggol }}
      >
        {children}
      </SidebarContext.Provider>
    </div>
  );
};

export default DashboardLayout;
