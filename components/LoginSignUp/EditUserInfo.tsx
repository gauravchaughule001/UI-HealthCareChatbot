import { loaderComponentState } from "@/config/atoms/loaderComponentState";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import Modal from "../Modal";

interface Props {
  onLogout: () => void;
  open: boolean;
}

const EditUserInfo: React.FC<Props> = ({ onLogout, open }) => {
  const setShowLoader = useSetRecoilState(loaderComponentState);
  const darkMode: boolean =
    localStorage.getItem("theme") === "true" ? true : false;
  const [counter, setCounter] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    username: string;
  }>({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    username: "",
  });
  let token: any = localStorage.getItem("token");
  let userData: any = localStorage.getItem("userInfo");
  useEffect(() => {
    if (token.length > 0) {
      let data = JSON.parse(localStorage.getItem("userInfo") as any);
      if (data) {
        setUserInfo({
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          mobile: data.mobile,
          username: data.username,
        });
      }
      setEditMode(false);
    }
  }, [counter, userData, open]);

  const submitForm = async () => {
    setShowLoader(true);
    try {
      const data: any = localStorage.getItem("userInfo");
      const user_id: any = JSON.parse(data)._id;
      const response: any = await axios.put(
        `http://127.0.0.1:5000/users?user_id=${user_id}`,
        { ...userInfo }
      );
      console.log(response);
      if (response.data.isSuccess) {
        toast("Profile details updated successfully.");
        try {
          const res = await axios.get(
            `http://127.0.0.1:5000/auth/get_user_info`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
        } catch (e) {
          console.log("Error :-> ", e);
        }
        setEditMode(false);
      } else {
        toast("Something went wrong.");
      }
    } catch (e) {
      toast("Something went wrong.");
    } finally {
      setShowLoader(false);
    }
  };

  const isEdited = () => {
    let data = JSON.parse(localStorage.getItem("userInfo") as any);
    const initialData = {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      mobile: data.mobile,
      username: data.username,
    };
    if (
      initialData.firstName === userInfo.firstName &&
      initialData.lastName === userInfo.lastName &&
      initialData.email === userInfo.email &&
      initialData.mobile === userInfo.mobile &&
      initialData.username === userInfo.username
    ) {
      return false;
    } else {
      return true;
    }
  };

  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <div className="w-full h-full p-4 relative">
      <div className="h-[85%] w-[70%] m-auto flex flex-col justify-center items-start">
        <div className="flex justify-center items-center gap-2 my-1">
          <label>
            First Name:
            <input
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
              disabled={!editMode}
              value={userInfo.firstName}
              className={`p-2 outline-none rounded-md w-full border-[1px] ${
                darkMode ? "text-white bg-transparent" : "text-black"
              }`}
            />
          </label>
          <label>
            Last Name:
            <input
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
              disabled={!editMode}
              value={userInfo.lastName}
              className={`p-2 outline-none rounded-md w-full border-[1px] ${
                darkMode ? "text-white bg-transparent" : "text-black"
              }`}
            />
          </label>
        </div>
        <label className="my-1 w-full">
          Email:
          <input
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            disabled={!editMode}
            value={userInfo.email}
            className={`p-2 outline-none rounded-md w-full border-[1px] ${
              darkMode ? "text-white bg-transparent" : "text-black"
            }`}
          />
        </label>
        <label className="my-1">
          Username:
          <input
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
            disabled={!editMode}
            value={userInfo.username}
            className={`p-2 outline-none rounded-md w-full border-[1px] ${
              darkMode ? "text-white bg-transparent" : "text-black"
            }`}
          />
        </label>
      </div>

      <div className="h-[15%] w-full flex justify-center items-center px-[60px] gap-2 font-[600] text-white">
        <button
          onClick={() => (editMode ? submitForm() : setEditMode(true))}
          disabled={editMode ? !isEdited() : false}
          className={`py-3 rounded-md w-[50%] px-5 ${
            editMode && !isEdited() && "cursor-not-allowed"
          } ${editMode ? "bg-green-600" : "bg-gray-600"}`}
        >
          {editMode ? <>Save</> : <>Edit Profile</>}
        </button>
        <button
          onClick={() => {
            if (editMode) {
              setCounter((counter) => counter + 1);
              setEditMode(false);
            } else {
              onLogout();
            }
          }}
          className="py-3 rounded-md w-[50%] px-5 bg-gray-600"
        >
          {editMode ? <>Discard</> : <>Logout</>}
        </button>
      </div>
    </div>
  );
};

export default EditUserInfo;
