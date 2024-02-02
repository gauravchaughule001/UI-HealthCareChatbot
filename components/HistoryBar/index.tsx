import React, { useState, useRef } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./HistoryBar.css";
import { HistoryData } from "./Data";

interface Props {
  darkMode: boolean;
}

const HistoryBar: React.FC<Props> = ({ darkMode }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelStyle = panelRef.current?.classList;
  const [open, setOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={panelRef}
      className={`!z-[959] panel ${darkMode ? "bg-[#383842]" : "bg-white"}`}
    >
      <div className={` flex justify-between items-center w-full h-full`}>
        <div className={`w-full max-h-full ml-[60px] overflow-y-scroll h-full ${darkMode?"bg-[#282830]":"bg-[#e4e4e4]"} ${darkMode?"border-r-[#474753]":"border-r-[#ddd]"} border-r-[1px]`}>
          <div className={`sticky w-full left-4 h-12 ${darkMode?"history-start-fade":"history-start-fade-light"} left-[0px] !-top-4 z-[10]`}/>
          <div className={`pb-4 relative w-full h-full ${darkMode? "text-white" : "text-black"}`}>
            {[...HistoryData, ...HistoryData].map((ele, index) => (
              <div
                key={index}
                style={{ transitionDelay: `${index * 100}ms` }}
                // ref={historyRef}
                className={` ${index===0?"mt-0 border-b-[1px] border-b-white":index!=HistoryData.length*2-1?"border-b-[1px] border-b-white":""} transition-opacity text-sm p-1 py-2 ${darkMode?"hover:bg-[#474753]":"hover:bg-[#bdbdbd]"} cursor-pointer ${
                  open ? "duration-500" : "duration-200"
                } ${open ? "opacity-100" : "opacity-0"}`}
              >
                {ele}
              </div>
            ))}
            <div className={`w-full h-12 sticky !left-[0px] ${darkMode?"history-end-fade":"history-end-fade-light"} !-bottom-[2px]`}/>
          </div>
        </div>
        <button
          className="w-[58px] h-full flex justify-center items-center"
          ref={triggerRef}
          onClick={() => {
            if (open) {
              panelRef.current?.classList.remove("panel-open");
              panelRef.current?.classList.add("panel-closed");
              triggerRef.current?.classList.remove("expand-icon-open");
              triggerRef.current?.classList.add("expand-icon-closed");
              historyRef.current?.classList.remove("history-open");
              historyRef.current?.classList.add("history-closed");
              setOpen(false);
            } else {
              panelRef.current?.classList.remove("panel-closed");
              panelRef.current?.classList.add("panel-open");
              triggerRef.current?.classList.remove("expand-icon-closed");
              triggerRef.current?.classList.add("expand-icon-open");
              historyRef.current?.classList.remove("history-closed");
              historyRef.current?.classList.add("history-open");
              setOpen(true);
            }
          }}
        >
          <NavigateNextIcon fontSize="large" color="inherit" />
        </button>
      </div>
    </div>
  );
};

export default HistoryBar;
