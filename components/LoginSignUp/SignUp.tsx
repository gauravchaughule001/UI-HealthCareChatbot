import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import toast from "react-hot-toast";
import { Transition } from "@tailwindui/react";

const SignUp: React.FC<{ onPageChange?: () => void; show: boolean }> = ({
  onPageChange,
  show,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    username: string;
    password: string;
  }>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    username: "",
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

  const createUser = async () => {
    if (!isDataValid()) {
      setErrors({
        email: true,
        firstName: true,
        lastName: true,
        mobile: true,
        username: true,
        
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/users`,
        { ...userData },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("JGJHJHhgstrhtrhetrhe5hht", response);
      toast("Registration successfull");
      setTimeout(() => onPageChange && onPageChange(), 300);
    } catch (e: any) {
      if (Object.hasOwn(e?.response?.data, "errors")) {
        toast(e?.response?.data?.message);
      } else {
        toast("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDataValid = () => {
    return (
      userData.firstName.length &&
      userData.lastName.length &&
      userData.email.length &&
      userData.mobile.length &&
      userData.password.length &&
      userData.username.length
    );
  };

  return (
    <div className="w-full 2xs:flex 2xs:flex-col 2xs:justify-center 2xs:items-center">
      <span className="my-4 font-[700] text-2xl">Sign up</span>
      <div className="w-[90%] p-2">
        <div className="flex 2xs:flex-col md:flex-row justify-center items-center md:gap-2">
          <input
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
            className={`text-black p-2 w-full outline-none ${
              errors.firstName ? "border-red-600" : "border-[#128C7E]"
            } border-[1px] rounded-md my-2`}
            placeholder="First Name"
          />
          <input
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
            className={`text-black p-2 w-full outline-none ${
              errors.lastName ? "border-red-600" : "border-[#128C7E]"
            } border-[1px] rounded-md my-2`}
            placeholder="Last Name"
          />
        </div>
        <input
          value={userData.mobile}
          maxLength={10}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setUserData({ ...userData, mobile: e.target.value });
            }
          }}
          className={`text-black p-2 w-full outline-none ${
            errors.mobile ? "border-red-600" : "border-[#128C7E]"
          } border-[1px] rounded-md my-2`}
          placeholder="Enter Mobile Number"
        />
        <input
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className={`text-black p-2 w-full outline-none ${
            errors.email ? "border-red-600" : "border-[#128C7E]"
          } border-[1px] rounded-md my-2`}
          placeholder="Enter Email"
        />
        <input
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          className={`text-black p-2 w-full outline-none ${
            errors.username ? "border-red-600" : "border-[#128C7E]"
          } border-[1px] rounded-md my-2`}
          placeholder="Enter new username"
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
        <button className="p-4 bg-[#128C7E] rounded-md w-full text-white my-2">
          {!isLoading ? (
            <span onClick={createUser}>Sign up</span>
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

export default SignUp;
