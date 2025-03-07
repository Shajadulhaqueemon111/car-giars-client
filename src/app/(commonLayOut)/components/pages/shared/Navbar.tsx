"use client";

import { useRouter } from "next/navigation";
import { Cog } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwicher";

import { logOut } from "@/app/(commonLayOut)/login";
import { useUser } from "@/context/AuthContext";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const NavbarPage = () => {
  const { user, fetchUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    await fetchUser();
    router.push("/login");
  };

  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/admin-dashboard",
    driver: "/driver-dashboard",
  };

  // useEffect(() => {
  //   if (user?.role) {
  //     const targetRoute = routeMap[user.role] || "/dashboard";

  //     if (pathname !== targetRoute && pathname !== "/") {
  //       router.push(targetRoute);
  //     }
  //   }
  // }, [user?.role]); // Onl// Run when user.role changes

  return (
    <Navbar maxWidth="2xl">
      <NavbarBrand>
        <Link className="flex" href="/">
          <Cog />
          <p className="font-bold text-inherit px-4">APOLLO GEARS</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/cars">
            Cars
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/aboute">aboute</Link>
        </NavbarItem>
        <NavbarItem>
          <NavbarItem>
            {user ? (
              <Link href={routeMap[user.role] ?? "/dashboard"}>Dashboard</Link>
            ) : null}
          </NavbarItem>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user?.email ? (
          <NavbarItem>
            <Button onClick={handleLogout} color="primary" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarPage;
