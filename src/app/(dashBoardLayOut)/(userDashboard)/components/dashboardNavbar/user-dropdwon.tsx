// import { logOut } from "@/app/(withComonLayout)/actions/auth";
// import { useAuth } from "@/lib/AuthProviders";

import { ThemeSwitcher } from "@/app/(commonLayOut)/components/pages/shared/ThemeSwicher";
import { logOut } from "@/app/(commonLayOut)/login";
import { useUser } from "@/context/AuthContext";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const UserDropdown = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const logOutUser = async () => {
    await logOut();
    setUser(null);
    router.push("/login");
  };
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          {/* <p>{user?.email}</p> */}
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          onClick={logOutUser}
          key="logout"
          color="danger"
          className="text-danger "
        >
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <ThemeSwitcher></ThemeSwitcher>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
