import React from "react";
import Loader from "../Loader";
import { useRecoilValue } from "recoil";
import { loaderComponentState } from "@/config/atoms/loaderComponentState";
import { Toaster } from "react-hot-toast";

interface Props {
  children: JSX.Element;
}

const ChildComponent: React.FC<Props> = ({ children }) => {
  const showLoader = useRecoilValue(loaderComponentState);
  return (
    <>
      <Toaster containerClassName="!z-[9999999]" />
      {showLoader && (
        <Loader
          darkMode={localStorage.getItem("theme") === "true" ? true : false}
        />
      )}
      {children}
    </>
  );
};

export default ChildComponent;
