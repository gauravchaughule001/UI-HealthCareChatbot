"use client";
import { useEffect, useState } from "react";
import Login from "../LoginSignUp/Login";
import SignUp from "../LoginSignUp/SignUp";
import { NavbarComponent } from "../NavbarComponent";
import SidebarComponent from "../Sidebar";
import ForgotPassword from "../ForgotPassword";
import Loader from "../Loader";
import { useRecoilValue } from "recoil";
import { loaderComponentState } from "@/config/atoms/loaderComponentState";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const showLoader = useRecoilValue(loaderComponentState);
  let themeMode: string = localStorage.getItem("theme") || "";
  useEffect(() => {
    if (localStorage.getItem("theme") === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [themeMode]);

  const SidebarOptions = [
    {
      label: "Dark Mode",
      onClick: (e: any) => {
        localStorage.setItem("theme", e.target.checked ? "true" : "false");
        setDarkMode(e.target.checked);
      },
      switch: true,
      value: darkMode,
    },
    {
      label: "Info",
      onClick: (e: any) => {
        alert("Info");
      },
      switch: false,
    },
  ];

  const [page, setPage] = useState<"login" | "signup" | "reset">("login");

  const router = useRouter()

  const handleReview = async() => {
    const bodyData = {
      firstName: "Test865",
      middleName: "User56t45",
      lastName: "Use546456r",
      email: "testuser8786@maildrop.cc",
      addressLine1: "441",
      addressLine2: "4th street",
      city: "Washington",
      state: "DC",
      zipcode: "20500",
      phone: "+19195959595",
      accountNumber: "0339685747896",
      amount: 1.0,
      paymentTypeCode: "TEST_PAYMENT",
      externalReferenceNumber: "PRN0002",
      pmList: "TEST_PM_LIST",
      timestamp: 1705590892000
    }
      try{
        const res = await fetch('http://localhost:8081/payment/sso-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData)
        }).then((data)=>data.json()).then((data)=>{
          router.push(`/payment/${data?.token}`)
        })
      }catch(e){
        console.log(":::::::::::::::::::::::::::::::::::::::", e)
        console.error(e)
      }
  }
  return (
    <>
      {showLoader && <Loader darkMode={darkMode} />}
      <div
        className={`flex relative xs:flex-col md:flex-row w-full ${
          darkMode ? "bg-[#383842] text-white" : ""
        } h-full justify-start items-center transition-all -delay-75`}
      >
        <div className="absolute top-0 right-0 xs:hidden md:block 2xs:hidden">
          <NavbarComponent
            onThemeChange={(e: any) => {
              localStorage.setItem(
                "theme",
                e.target.checked ? "true" : "false"
              );
              setDarkMode(e.target.checked);
            }}
          />
        </div>
        <div
          className={`xs:hidden 2xs:hidden sm:hidden md:flex justify-start items-center ${
            darkMode ? "bg-black" : "bg-slate-300"
          } h-full sm:w-[30%]`}
        >
          <div className="flex justify-start items-center shadow-2xl bg-[#128C7E] h-full w-full">
            <span
              className={`w-full h-auto flex ${
                darkMode ? "text-white" : "text-white"
              } justify-end items-center font-[700] text-[40px] transition-all`}
            >
              <span onClick={handleReview} className={`w-fit h-fit py-8 pl-20 ${darkMode?"bg-black":"bg-slate-300 text-black"} rounded-l-full`}>
              Chat
              </span>
            </span>
          </div>
        </div>
        <div
          className={`xs:hidden 2xs:hidden sm:hidden md:flex justify-start items-center transition-all bg-transparent bg-[#cccccc] bg-gradient-to-r ${
            darkMode
              ? "from-[#000000] via-[#1b1b20] to-transparent"
              : "from-slate-300 via-slate-50 to-transparent"
          } h-full w-[20%]`}
        >
          <span className="w-full h-auto flex justify-start items-center transition-all text-[#128C7E] font-[700] text-[40px]">
            Bot
          </span>
        </div>
        <div className="relative h-full xl:w-[30%] md:w-[50%] sm:w-full xs:w-[80%] flex justify-between items-center xs:items-start md:min-h-full sm:!min-h-auto">
          <div className="xs:hidden 2xs:hidden md:flex w-full h-full justify-center items-center">
            {page === "login" ? (
              <Login
                forgotPassword={() => setPage("reset")}
                show={page === "login"}
                onPageChange={() => setPage("signup")}
              />
            ) : page === "signup" ? (
              <SignUp
                show={page === "signup"}
                onPageChange={() => setPage("login")}
              />
            ) : (
              <ForgotPassword onPageChange={() => setPage("login")} />
            )}
          </div>
          <div className="2xs:flex !w-full 2xs:justify-center 2xs:items-center md:hidden">
            <SidebarComponent options={SidebarOptions} darkMode={darkMode}>
            {page === "login" ? (
              <Login
                forgotPassword={() => setPage("reset")}
                show={page === "login"}
                onPageChange={() => setPage("signup")}
              />
            ) : page === "signup" ? (
              <SignUp
                show={page === "signup"}
                onPageChange={() => setPage("login")}
              />
            ) : (
              <ForgotPassword onPageChange={() => setPage("login")} />
            )}
            </SidebarComponent>
          </div>
        </div>
      </div>
    </>
  );
}
