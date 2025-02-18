/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { createContext, useContext } from "react";

interface SidebarContext {
  collapsed: boolean;
  setCollapsed: () => void;
}
export const SidebarContext = createContext<SidebarContext>({
  collapsed: false,
  setCollapsed: () => void {},
});

export const userSidebarContext = () => {
  return useContext(SidebarContext);
};
