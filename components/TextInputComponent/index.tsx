"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsFillMicFill } from "react-icons/bs";

interface ITextInputComponent extends React.HTMLProps<HTMLTextAreaElement> {
  listening?:boolean;
  onMicClick?:(e:any)=>void;
  onSendMessage?:()=>void;
  userInput?:any;
}

const TextInputComponent: React.FC<ITextInputComponent> = ({
  onChange,
  listening,
  onMicClick,
  onSendMessage,
  userInput,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(()=>{
    adjustTextareaHeight()
  },[])

  const handleTyping = (event: any) => {
    onChange&& onChange(event.target.value)
    adjustTextareaHeight(); // Adjust textarea height when typing
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      yourFunction();
      event.preventDefault();
    } else if (event.key === "Enter" && event.shiftKey) {
      onChange&& onChange(userInput + "\t" as any);
      adjustTextareaHeight();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "10px"; // Reset the height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to the scrollHeight
    }
  };

  const yourFunction = () => {
    onSendMessage&& onSendMessage()
  };

  return (
    <div className="input-wrapper w-full">
      <div className="flex justify-center items-end border-[#ccc] border-2 rounded-lg w-full">
        <div
          className="h-fit w-full"
          style={{padding: "8px" }}
        >
          <textarea
            placeholder="Enter a message..."
            ref={textareaRef}
            value={userInput}
            onChange={handleTyping}
            onKeyDown={handleEnter}
            className="outline-none w-full bg-transparent"
            style={{
              maxHeight: "200px",
              resize: "none",
              overflowY: "auto",
              boxSizing: "border-box",
              height: "23px"
            }}
          />
        </div>
        <div
            className={`w-fit h-full flex py-2 justify-center items-center ${
              !listening && "pr-2 mb-[1px]"
            }`}
          >
            <div
              onClick={onMicClick}
              className={`p-1 cursor-pointer rounded-full relative z-30 hover:bg-gray-200 transition-opacity ${
                listening && ""
              }`}
            >
              {listening && (
                <BsFillMicFill
                  className={`text-2xl !z-20 ${
                    listening && "absolute left-[25%] top-[20%]"
                  } text-[#808080]`}
                />
              )}
              <div
                className={`${
                  listening && "bg-red-600 p-5 rounded-full animate-ping z-0"
                }`}
              >
                <BsFillMicFill
                  className={`text-2xl !z-20 ${
                    listening && "absolute left-[20%] animate-none top-[20%]"
                  } text-[#808080]`}
                />
              </div>
            </div>
          </div>
          <button
            onClick={()=>onSendMessage&&onSendMessage()}
            className={`font-[700] w-fit px-4 py-3 h-full ${
              userInput ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="icon-sm m-1 md:m-0"
              height={25}
              width={25}
            >
              <path
                d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                fill={`${userInput.length ? "#19C37D" : "grey"}`}
              ></path>
            </svg>
          </button>
      </div>
    </div>
  );
};

export default TextInputComponent;
