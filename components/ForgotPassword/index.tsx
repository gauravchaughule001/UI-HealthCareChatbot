"use client";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
interface Props {
  onPageChange: () => void;
}

const ForgotPassword: React.FC<Props> = ({ onPageChange }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    otp: string;
    email: string;
    password: string;
  }>({
    otp: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    firstName: boolean;
    lastName: boolean;
    mobile: boolean;
    email: boolean;
    username: boolean;
  }>({
    firstName: false,
    lastName: false,
    mobile: false,
    email: false,
    username: false,
  });
  const [inputType, setInputType] = useState<string>("password");
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false);

  const resetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/resetpassword`,
        { ...userData },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("JGJHJHhgstrhtrhetrhe5hht", response);
      if((await response).data.isSuccess){
          toast("Password Reset successfully");
      }
    } catch (e: any) {
      toast(e.response.data.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/forgotpassword`,
        { email: userData.email },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("JGJHJHhgstrhtrhetrhe5hht", response);
      if ((await response).data.isSuccess) {
        toast("OTP sent successfully");
        setIsOTPSent(true);
      }
    } catch (e: any) {
      toast(e.response.data.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full 2xs:flex 2xs:flex-col 2xs:justify-center 2xs:items-center">
      <span className="my-4 font-[700] text-2xl">Forgot password</span>
      <div className="w-[90%] p-2">
        <input
          disabled={isOTPSent}
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className={`text-black p-2 w-full outline-none ${
            errors.email ? "border-red-600" : "border-[#128C7E]"
          } border-[1px] rounded-md my-2`}
          placeholder="Enter Email"
        />
        {isOTPSent&&
          <>
            <input
              maxLength={4}
              value={userData.otp}
              onChange={(e) =>
                setUserData({ ...userData, otp: e.target.value })
              }
              className={`text-black p-2 w-full outline-none ${
                errors.username ? "border-red-600" : "border-[#128C7E]"
              } border-[1px] rounded-md my-2`}
              placeholder="Enter OTP"
            />
            <div className="flex justify-center items-center text-black bg-white p-2 w-full outline-none border-[#128C7E] border-[1px] rounded-md my-2">
              <input
                value={userData.password}
                type={inputType}
                autoComplete="new-password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full h-full bg-white outline-none active:bg-white"
                placeholder="Choose a new Password"
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
          </>
        }
        <button className="p-4 bg-[#128C7E] rounded-md w-full text-white my-2">
          {!isLoading ? (
            <span onClick={() => (isOTPSent ? resetPassword() : sendOTP())}>
              {isOTPSent ? "Reset Password" : "Send OTP"}
            </span>
          ) : (
            <div className="h-4 w-4 border-4 m-auto rounded-full border-gray-600 animate-spin border-r-gray-300" />
          )}
        </button>
        <div className="flex justify-between items-center my-2">
          <p className="my-2 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => onPageChange && onPageChange()}
              className="text-[#128C7E] underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
