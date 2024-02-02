import AccordianComponent from "@/components/Accordian";
import InputComponent from "@/components/InputComponent";
import { loaderComponentState } from "@/config/atoms/loaderComponentState";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

interface Props {
  darkMode: boolean;
}

const Security: React.FC<Props> = ({ darkMode }) => {
  const [password, setPassword] = useState<{
    oldPassword: string;
    newPassword: string;
    newPassword2: string;
  }>({
    newPassword: "",
    newPassword2: "",
    oldPassword: "",
  });
  const setShowLoader = useSetRecoilState(loaderComponentState);

  const changePassword = async () => {
    setShowLoader(true);
    try {
      const res = await axios.put(
        `http://127.0.0.1:5000/changepassword`,
        password,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.isSuccess) {
        toast("Password changed successfully");
        setPassword({ newPassword: "", newPassword2: "", oldPassword: "" });
      } else {
        toast("Something went wrong");
      }
    } catch (e: any) {
      if (e?.response?.data?.message) {
        toast(e?.response?.data?.message);
      } else {
        toast("Something went wrong");
      }
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className={`w-full h-full`}>
      <div className="w-full h-[10%] flex justify-center items-center">
        <h1 className="text-center font-[600] text-xl">Security & Privacy</h1>
      </div>
      <div className="h-[90%] w-[90%] mx-auto my-2 max-h-[90%] overflow-y-scroll">
        <AccordianComponent
          defaultOpen
          darkMode={darkMode}
          body={
            <div className="w-[90%] mx-auto my-4 h-fit rounded-md space-y-3">
              <InputComponent
                autoComplete="new-password"
                passwordIconClassName={`${darkMode && "invert"}`}
                type="password"
                outerClassName="!bg-transparent !border-gray-500"
                placeholder="Enter Old Password"
                value={password.oldPassword}
                className={`bg-transparent outline-none w-full ${
                  darkMode ? "text-white" : "text-black"
                }`}
                onChange={(e: any) =>
                  setPassword({ ...password, oldPassword: e.target.value })
                }
              />
              <InputComponent
                autoComplete="new-password"
                passwordIconClassName={`${darkMode && "invert"}`}
                type="password"
                outerClassName="!bg-transparent !border-gray-500"
                placeholder="Enter New Password"
                value={password.newPassword}
                className={`bg-transparent outline-none w-full ${
                  darkMode ? "text-white" : "text-black"
                }`}
                onChange={(e: any) =>
                  setPassword({ ...password, newPassword: e.target.value })
                }
              />
              <InputComponent
                autoComplete="new-password"
                passwordIconClassName={`${darkMode && "invert"}`}
                type="password"
                outerClassName="!bg-transparent !border-gray-500"
                placeholder="Re-enter New Password"
                value={password.newPassword2}
                className={`bg-transparent outline-none w-full ${
                  darkMode ? "text-white" : "text-black"
                }`}
                onChange={(e: any) =>
                  setPassword({ ...password, newPassword2: e.target.value })
                }
              />
              <div className="w-full h-fit flex justify-center items-center mt-6">
                <button
                  onClick={() =>
                    password.newPassword === password.newPassword2
                      ? changePassword()
                      : toast(
                          "New password and Re-entered password must be same."
                        )
                  }
                  className={`w-fit m-auto h-fit px-3 py-2 text-white bg-[#128C7E] rounded-md`}
                >
                  Change Password
                </button>
              </div>
            </div>
          }
          heading="Change Password"
        />
        <AccordianComponent
          darkMode={darkMode}
          body={
            <div className="w-[90%] mx-auto my-4 h-fit border-[1px] rounded-md p-4">
              <p className="text-sm">Change login method to OTP-Based login</p>
            </div>
          }
          heading="Two-factor Authentication"
        />
      </div>
    </div>
  );
};

export default Security;
