import { Avatar, Tooltip } from "@nextui-org/react";

import { Car, Cog, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userSidebarContext } from "@/app/(dashBoardLayOut)/layout/layout-context";
import { Sidebar } from "./sideber.style";
import { SidebarItem } from "./sidebarItem";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItems } from "./collaps-items";

export const AdminSidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = userSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {" "}
          <Link className="flex" href="/">
            <Cog />
            <p className="font-bold text-inherit px-4">APOLLO GEARS</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/admin-dashboard"}
              href="/admin-dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/admin-dashboard/cars-management"}
                title="cars-manage"
                icon={<Car />}
                href="/admin-dashboard/cars-management"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/users-management"}
                title="users-manage"
                icon={<User />}
                href="/admin-dashboard/users-management"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/manage-all-cars"}
                title="manage-all-cars"
                icon={<Car />}
                href="/admin-dashboard/manage-all-cars"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/rent-all-cars"}
                title="rent-all-cars"
                icon={<Car />}
                href="/admin-dashboard/rent-all-cars"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/bids-all-cars"}
                title="bids-all-cars"
                icon={<Car />}
                href="/admin-dashboard/bids-all-cars"
              />
              <CollapseItems
                icon={<Home />}
                items={["Banks Accounts", "Credit Cards"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<Home />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<Home />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<Home />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<Home />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<Home />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<Home />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<Home />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <Home />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <Home />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
