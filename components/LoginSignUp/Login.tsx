import React, { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import client from "@/services/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Transition } from "@tailwindui/react";
import { useSetRecoilState } from "recoil";
import { loaderComponentState } from "@/config/atoms/loaderComponentState";
import axios from "axios";

const Login:React.FC<{onPageChange?:()=>void; show:boolean; forgotPassword?:()=>void}>=({onPageChange, show, forgotPassword})=>{
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState<string>("password");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setShowLoader = useSetRecoilState(loaderComponentState)
  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    try {
      const response = await client.post(`http://127.0.0.1:5000/auth/login`, {
        username: userName,
        password: password,
      });
      if (response?.data?.isSuccess) {
        setShowLoader(true)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.userData));
        router.push("/chatbot");
      }
    } catch (e: any) {
      if (e?.response?.data?.message === "Invalid credentials") {
        toast("Invalid credentials");
      }else if(e?.code==="ERR_NETWORK"){
        toast("Server not responding, Please try after some time :)")
      }else{
        toast("An error occured, Please try after some time :)")
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full 2xs:flex 2xs:flex-col 2xs:justify-center 2xs:items-center"
    >
      <span className="my-4 font-[700] text-2xl">Login</span>
      <div className="w-[90%] p-2">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="text-black p-2 w-full outline-none border-[#128C7E] border-[1px] rounded-md my-2"
          placeholder="Enter Username"
        />
        <div className="flex justify-center items-center text-black bg-white p-2 w-full outline-none border-[#128C7E] border-[1px] rounded-md my-2">
          <input
            value={password}
            type={inputType}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full bg-white outline-none active:bg-white"
            placeholder="Enter Password"
          />
          <span
            className="cursor-pointer"
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
          >
            {inputType === "password" ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </span>
        </div>
        <button className="p-4 bg-[#128C7E] rounded-md w-full text-white my-2">
          {!isLoading ? (
            <span onClick={login}>Login</span>
          ) : (
            <div className="h-4 w-4 border-4 m-auto rounded-full border-gray-600 animate-spin border-r-gray-300" />
          )}
        </button>
        <div className="flex md:flex-row 2xs:flex-col 2xs:justify-start md:justify-between items-center my-2">
          <p className="my-2 text-sm">
            Click here to{" "}
            <span onClick={()=>onPageChange&& onPageChange()} className="text-[#128C7E] underline cursor-pointer">
              Sign Up
            </span>
          </p>
          <p onClick={()=>forgotPassword&& forgotPassword()} className="my-2 text-sm text-[#128C7E] underline cursor-pointer">
            Forgot password
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login
