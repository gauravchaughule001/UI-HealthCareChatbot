import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./SideMenu.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditUserInfo from "../LoginSignUp/EditUserInfo";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import ProfileTab from "./ProfileTab";
import Subscription from "./Subscription";
import Security from "./Security";
import ContactUs from "./ContactUs";

interface Props {
  darkMode: boolean;
}

const SideMenu: React.FC<Props> = ({ darkMode }) => {
  const slideMenu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    open && slideMenu.current?.classList.add("smooth-slide");
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        !logoutModal &&
        slideMenu.current &&
        !slideMenu.current.contains(e.target as Node) &&
        slideMenu.current.classList.toString().includes("smooth-slide")
      ) {
        slideMenu.current?.classList.remove("smooth-slide");
        slideMenu.current?.classList.add("smooth-slide-closed");
        setOpen(false);
      }
    };
    const handleOutsideClickOnDiv = (e: MouseEvent) => {};

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("click", handleOutsideClickOnDiv);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClickOnDiv);
    };
  }, []);

  const [showInput, setShowInput] = useState(false);
  const [ImagePath, setImagePath] = useState("");
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => !open && setCurrentTab(0), 500);
  }, [open]);

  const menuOptions = ["Profile", "Security", "Subscription", "Contact us"];

  return (
    <div
      ref={slideMenu}
      className={`slide-menu ${
        darkMode ? "bg-[#383842]" : "bg-white"
      } z-[9595959]`}
    >
      <button
        onClick={() => {
          if (open) {
            slideMenu.current?.classList.remove("smooth-slide");
            slideMenu.current?.classList.add("smooth-slide-closed");
            setOpen(false);
          } else {
            slideMenu.current?.classList.remove("smooth-slide-closed");
            slideMenu.current?.classList.add("smooth-slide");
            setOpen(true);
          }
        }}
        className={`w-full h-[50px] flex justify-end items-center p-2 border-b-[1px] ${
          darkMode ? "border-b-[#62626e]" : "border-b-[#ddd]"
        }`}
      >
        {open ? (
          <CloseIcon
            className={`${open ? "icon-show" : "icon-hide"}`}
            fontSize="large"
          />
        ) : (
          <MenuIcon
            className={`${open ? "icon-show" : "icon-hide"}`}
            fontSize="large"
          />
        )}
      </button>
      <div className="h-[calc(100%-50px)] w-full flex justify-center items-center">
        <div
          className={`w-[30%] h-full border-r-[1px] ${
            darkMode ? "border-r-[#62626e]" : "border-r-[#ddd]"
          }`}
        >
          <ul className="list-none">
            {menuOptions.map((ele, index) => (
              <li
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`py-2 ${
                  currentTab === index &&
                  (darkMode ? "bg-[#62626e]" : "bg-[#ddd]")
                } relative px-4 ${
                  darkMode ? "hover:bg-[#62626e]" : "hover:bg-[#dfdfdf]"
                } cursor-pointer`}
              >
                {currentTab === index && (
                  <span
                    className={`absolute left-[1px] top-0 rounded-r-md w-[6px] h-full bg-[#128C7E]`}
                  />
                )}
                {ele}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[calc(100%-50px)] w-full">
          {currentTab === 0 ? (
            <ProfileTab open={open} darkMode={darkMode} />
          ) : currentTab === 1 ? (
            <Subscription darkMode={darkMode} />
          ) : currentTab === 2 ? (
            <Security darkMode={darkMode} />
          ) : (
            <ContactUs darkMode={darkMode} />
          )}
        </div>
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

export default SideMenu;
