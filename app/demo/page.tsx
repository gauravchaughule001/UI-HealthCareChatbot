"use client";
import React, { useState } from "react";
import "./demo.css";

export default function page() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-full !max-h-[100vh] max-w-full w-full flex justify-start items-center bg-black !overflow-y-hidden !overflow-hidden">
      <div className="w-[100vh] h-[100vh] relative">
        <div className="">
          <div className="w-[50vh] h-[50vh] absolute top-[25%] left-[20%] rounded-full z-[2] bg-black" />
          <div className="w-[50vh] h-[50vh] absolute top-[25%] left-[20%] rounded-full z-[3] shadow-inner rotate-90 shadow-red-500 animate-pulse" />
        </div>
        <div className="">
          <div className="w-[20vh] animate-pulse h-[20vh] absolute top-[40%] left-[100%] rounded-full z-[2] bg-black" />
          <div className="w-[20vh] animate-pulse h-[20vh] top-[40%] left-[100%] z-[1000] absolute earth-div">
            <img
              className="animate-pulse"
              src="https://www.freeiconspng.com/thumbs/earth-png/planet-earth-png-8.png"
            />
          <div className="w-[20vh] h-[20vh] absolute top-[0%] left-[0%] rounded-full shadow-inner rotate-90 z-[2000] earth-orange animate-pulse" />
          <div className="w-[20vh] h-[20vh] absolute top-[0%] left-[0%] rounded-full shadow-inner rotate-90 z-[2000] earth-black" />
          </div>
        </div>
      </div>
      <div className="absolute -right-[30%]">
        <div className="relative w-fit h-fit">
          <img
            className="z-[1000] animate-pulse"
            src="https://www.picng.com/upload/mars_planet/png_mars_planet_6486.png"
          />
          <div className="bg-red-600 animate-pulse -top-[250px] blur-[300px] w-[calc(100%+500px)] h-[calc(100%+500px)] rounded-full absolute !z-0 " />
        </div>
      </div>
      <div className="">
      <h1 className="my-text absolute left-0 font-mono">Universe</h1>
      <h1 className="my-text-shadow absolute left-0 font-mono">Universe</h1>
      </div>
      {/* <div className={` ${open?" open ":" close "} h-full bg-red-600 flex justify-center items-center`}>
        <button onClick={()=>setOpen(!open)} className="py-2 px-4 w-[150px] rounded-md bg-blue-600 text-white font-[700]">{open?"Close This":"Open This"}</button>
      </div>
      <div className="flex justify-center items-center flex-col w-full p-4 px-16">
        <input
          className="m-4 w-full p-2 rounded-md bg-white border-gray-500 border-[1px]"
          placeholder="Enter name"
        />
        <input
          className="m-4 w-full p-2 rounded-md bg-white border-gray-500 border-[1px]"
          placeholder="Enter name"
        />
        <input
          className="m-4 w-full p-2 rounded-md bg-white border-gray-500 border-[1px]"
          placeholder="Enter name"
        />
        <div className="py-4 flex justify-center items-center w-full gap-16 xs:flex-wrap md:flex-nowrap">
          <input
            className="w-full p-2 rounded-md bg-white border-gray-500 border-[1px] min-w-[300px]"
            placeholder="Enter name"
          />
          <input
            className="w-full p-2 rounded-md bg-white border-gray-500 border-[1px] min-w-[300px]"
            placeholder="Enter name"
          />
        </div>
        <input
          className="m-4 w-full p-2 rounded-md bg-white border-gray-500 border-[1px]"
          placeholder="Enter name"
        />
      </div> */}
    </div>
  );
}
