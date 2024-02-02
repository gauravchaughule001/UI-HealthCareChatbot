"use client";
import React from "react";
import './style.css'
const Loader: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    // <div className="absolute top-0 left-0 w-full h-full z-[9999999]">
    //   <div
    //     style={{
    //       backgroundColor: darkMode
    //         ? "rgba(0,0,0, 0.6)"
    //         : "rgba(0,0,0, 0.3)",
    //     }}
    //     className="w-full h-[100%] flex flex-col justify-center items-center"
    //   >
    //     <div className="w-[70px] loader-spinner h-[70px] border-8 rounded-full bg-transparent border-r-[#19C37D]"></div>
    //   </div>
    // </div>
    <div className={`w-full z-[9999999] h-full flex justify-center items-center opacity-50 ${darkMode?"bg-black":"bg-white"}`}>
    <div className="w-[400px] h-[300px] flex justify-center items-center">
          <div className="bar"/>
          <div className="bar bar-2"/>
          <div className="bar bar-3"/>
          <div className="bar bar-4"/>
          <div className="bar bar-5"/>
    </div>
  </div>
  );
};

export default Loader;
