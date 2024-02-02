import EditUserInfo from "@/components/LoginSignUp/EditUserInfo";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useRouter } from "next/navigation";

interface Props {
  darkMode: boolean;
  open:boolean;
}

const ProfileTab: React.FC<Props> = ({ darkMode , open }) => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [showInput, setShowInput] = useState(false);
  const [ImagePath, setImagePath] = useState("");
  const router = useRouter();
  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center w-full h-[40%]">
        <div
          onMouseOver={() => setShowInput(true)}
          onMouseOut={() => setShowInput(false)}
          className="relative w-[160px] rounded-full h-[160px]"
        >
          <img
            className={`h-[160px] w-[160px] rounded-full border-[${
              darkMode ? "#62626e" : "#ddd"
            }] border-[2px] aspect-square`}
            alt=""
            src={
              ImagePath ||
              "https://media.licdn.com/dms/image/C4D03AQGspbrb17Jcxw/profile-displayphoto-shrink_800_800/0/1661442957262?e=2147483647&v=beta&t=Tb7pwwtXhBKlRaWMrmQtTh1KZ5kHe8y7wMZxmmEsCLk"
            }
          />
          <div
            className={`h-[160px] w-[160px] prof-pic-change ${
              showInput ? "prof-pic-change-active" : "prof-pic-change-hidden"
            } absolute top-0 left-0 rounded-full border-[${
              darkMode ? "#62626e" : "#ddd"
            }] text-white border-[2px] flex justify-center items-center text-center`}
          >
            <AddAPhotoIcon fontSize="large" />
          </div>
          <input
            onChange={(event: any) => {
              const file = event.target.files[0]; // Get the first file from the input
              if (file) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  const imagePath = e.target.result;
                  setImagePath(imagePath);
                };

                reader.readAsDataURL(file); // Read the file as a data URL
              }
            }}
            type="file"
          />
        </div>
      </div>
      <div className="h-[65%]">
        <EditUserInfo open={open} onLogout={() => {
          setLogoutModal(true)}} />
      </div>
      <Modal
        preventOutsideClickHide
        darkMode={darkMode}
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
      >
        <div>
          <img
            className={`${darkMode ? "invert" : ""} opacity-80 m-auto my-2`}
            alt=""
            height={80}
            width={80}
            src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2048-libuexip.png"
          />
          <p
            className={`text-lg my-2 font-[500] ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Are you sure want to logout?
          </p>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => {
                window.localStorage.setItem("token", "");
                router.push("/");
              }}
              className="w-full py-2.5 rounded-md  bg-red-600 text-white"
            >
              Confirm
            </button>
            <button
              onClick={() => setLogoutModal(false)}
              className="w-full py-2.5 rounded-md  bg-gray-500 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileTab;
