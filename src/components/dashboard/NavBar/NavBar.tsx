"use client";

import { IconButton, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { logout } = useAuth();

  return (
    <div className="h-full w-[20%] bg-zinc-800 fixed flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="pl-4 my-4">
          <Typography className="text-white text-4xl font-bold">
            Dashboard
          </Typography>
        </div>
        <Link href="/dashboard/weather">
          <div
            className={`h-[50px] pl-4 flex items-center hover:bg-blue-700 ${
              isActive("/dashboard/weather") ? "bg-blue-900" : ""
            }`}
          >
            <Typography className="text-white text-xl font-bold">
              Weather
            </Typography>
          </div>
        </Link>
        <Link href="/dashboard/users">
          <div
            className={`h-[50px] pl-4 flex items-center hover:bg-blue-700 ${
              isActive("/dashboard/users") ? "bg-blue-900" : ""
            }`}
          >
            <Typography className="text-white text-xl font-bold">
              Users
            </Typography>
          </div>
        </Link>
      </div>
      <div
        className="flex items-center justify-center w-full hover:bg-blue-700 cursor-pointer"
        onClick={logout}
      >
        <Typography className="text-white text-xl font-bold">
          Sign Out
        </Typography>
        <IconButton>
          <LogoutIcon className="text-white text-4xl" />
        </IconButton>
      </div>
    </div>
  );
}
