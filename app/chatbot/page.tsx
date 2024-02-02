"use client";
import React, { useEffect, useState } from "react";
import { ChatBotComponent } from "@/components/ChatBotComponent";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { NavbarComponent } from "@/components/NavbarComponent";
import { RecoilRoot } from "recoil";
import SideMenu from "@/components/Sidebar/SideMenu";
import protectedRoute from "@/components/ProtectedRoutes";
import HistoryBar from "@/components/HistoryBar";
const Home: any = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    setDarkMode(localStorage.getItem("theme") === "true" ? true : false);
  }, []);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div
      className={`w-full h-full flex justify-center items-center relative ${
        darkMode ? "bg-[#292929] text-[#fff]" : ""
      } `}
    >
      <div className="2xs:opacity-0 md:opacity-100">
        <SideMenu darkMode={darkMode} />
        <HistoryBar darkMode={darkMode} />
      </div>
      <div className={`absolute top-0 right-0 md:bg-transparent md:w-fit ${darkMode?"2xs:bg-gray-800 2xs:shadow-black" : "2xs:bg-gray-200 2xs:shadow-gray-300"} z-[100] 2xs:shadow-sm md:shadow-none 2xs:w-full 2xs:flex 2xs:!justify-end 2xs:items-center`}>
        <NavbarComponent
          onThemeChange={(e: any) => {
            localStorage.setItem("theme", e.target.checked ? "true" : "false");
            setDarkMode(e.target.checked);
          }}
        />
      </div>
      <div className="lg:w-[50%] md:w-[50%] xs:w-full h-[96%]">
        <ChatBotComponent darkMode={darkMode} />
      </div>
    </div>
  );
};

export default protectedRoute(Home);
