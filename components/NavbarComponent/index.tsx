"use client";
import React, { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { AiFillInfoCircle } from "react-icons/ai";
export const NavbarComponent: React.FC<{ onThemeChange: (e: any) => void }> = ({
  onThemeChange,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const router = useRouter();
  let themeMode = window.localStorage.getItem("theme");
  let accessToken = window.localStorage.getItem("token");
  useEffect(() => {
    if (window.localStorage.getItem("theme") === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
    if (accessToken && accessToken?.length) {
      setIsLoggedIn(true);
    }
  }, [themeMode, accessToken]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="flex justify-center 2xs:justify-end items-center gap-2 sticky w-full top-4 right-8 !z-[99998]">
      <div className="mx-4">
        <span className="text-sm font-[600]">
          <DarkModeIcon /> Dark Mode
        </span>
        <Switch
          color="default"
          checked={darkMode}
          {...label}
          onChange={(e) => onThemeChange(e)}
        />
      </div>
      {isLoggedIn ? (
        <div
          onClick={() => {
            window.localStorage.setItem("token", "");

            router.push("/");
          }}
          className="p-2 mr-4 rounded-full hover:bg-gray-500 flex justify-center items-center transition-all cursor-pointer"
        >
          <LogoutIcon />
        </div>
      ) : (
        <div className="p-2 mr-4 rounded-full hover:bg-gray-500 flex justify-center items-center transition-all cursor-pointer">
          <AiFillInfoCircle className={`text-2xl`} />
        </div>
      )}
    </div>
  );
};
