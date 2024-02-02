"use client";
import { ENDPOINTS, application } from "@/config/apis";
import client from "@/services/client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReplyIcon from '@mui/icons-material/Reply';
import { TooltipComponent } from "../Tooltip";
import './style.css'
interface IProps {
  data: any[];
  loadMoreMessages: () => void;
  loadingMessages: boolean;
  darkMode: boolean;
  onReply:(e:{id: string; message:string})=>void;
}
const detectLanguage = require("lang-detector");
export const ChatHistory: React.FC<IProps> = ({
  data,
  loadMoreMessages,
  loadingMessages,
  darkMode,
  onReply
}) => {
  const [chatData, setChatData] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatData(data);
  }, [data]);

  const [toBottom, setToBottom] = useState<boolean>(false)
  const [toBottomCounter, setToBottomCounter] = useState<number>(0)

  useEffect(() => {
    if (data.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [data.length, data[data?.length - 1], toBottomCounter]);


  const divRefs: { [key: string]: HTMLDivElement | null | any } = {};
  const scrollToMessage = (key:string, position: string) => {
    setBlinkerHiding(key)
    if (divRefs[key]) {
      divRefs[key].scrollIntoView({ behavior: 'smooth' , block: position});
      setBlinker(key)
    }
    setTimeout(()=>setBlinker(""),500)
  } 
  const [blinker, setBlinker] = useState<string>("");
  const [blinkerHiding, setBlinkerHiding] = useState<string>("");
  return (
    <div className="overflow-y-scroll max-h-full overflow-x-hidden relative">
      {toBottom&&<button onClick={()=>setToBottomCounter(toBottomCounter+1)} className="bg-green-600 w-8 h-8 flex justify-center items-center rounded-full text-white fixed right-4 bottom-20 shadow-2xl">
        <KeyboardArrowDownIcon  />
      </button>}
      <Button onClick={() => loadMoreMessages()} className="w-full m-auto mt-0">
        {!loadingMessages ? (
          <span>Load More...</span>
        ) : (
          <div className="h-5 w-5 border-r-blue-600 border-[2px] rounded-full animate-spin m-auto" />
        )}
      </Button>
      <div className="w-full h-full flex justify-center items-end">
        <div className="w-full h-full">
          {chatData?.map((ele: any, ind: number) => (
            <div key={ind}>
              {ele?.question &&
              <QuestionComponent onReplyClick={(e)=> ele?.reply.message.length>800?scrollToMessage( e,"start"): scrollToMessage(e,"center")} darkMode={darkMode} question={ele?.question} reply={ele.isReplying? ele.reply: null} time={ele?.time} />
              }
              {ele?.answer === "loading" ? (
                <AnswerLoaderSpinner />
                ) : (
                  ele.answer &&
                  ele.answer.length > 0 &&
                  // answer(ele?.answer, ele?.time, darkMode)
                  <span className="!w-full h-max relative" key={ele?._id} ref={(el) => (divRefs[ele?._id] = el)}>
                    <div className={`${blinker===ele?._id? "show-blink":blinkerHiding===ele?._id&&"hide-blink"}`} />
                    <AnswerComponent answer={ele?.answer} darkMode={darkMode} time={ele?.time} onReply={()=>onReply({id: ele?._id, message: ele?.answer})} />
                  </span>
                  )}
            </div>
          ))}
        </div>
        <div ref={ref} />
      </div>
      {/* <MusicPlayer/> */}
    </div>
  );
};

interface IQuestionComponentProps{
  question:string;
  time: string;
  darkMode: boolean;
  reply: any;
  onReplyClick?:(e:any)=>void;
}

const QuestionComponent:React.FC<IQuestionComponentProps> = ({darkMode,question,reply,time, onReplyClick}) => {
  return (
    <div className="m-1 my-3">
      <div className="w-full flex justify-end items-center relative">
        <span
          className={`w-fit max-w-[80%] m-1 flex justify-end items-center flex-col pl-4 p-2 rounded-t-xl rounded-bl-xl ${
            darkMode ? "bg-[#128c7e] text-white" : "bg-[#dcf8c6]"
          }`}
        >
          {reply&& <div className="w-full rounded-xl 2xs:max-h-[150px] md:max-h-[300px] overflow-hidden">
            <AnswerComponent id={reply.reply_id} onReplyClick={onReplyClick} isReply={true} answer={reply?.message} darkMode={darkMode} onReply={()=>null} time={reply.time} />
          </div>}
          <span className={`pl-4 p-0 w-full flex ${reply?"justify-start":"justify-end"} items-center`}>
          {question}
          </span>
        </span>
      </div>
      <span className="text-xs w-full flex justify-end items-center">
        {time}
      </span>
    </div>
  );
};

interface IAnswerComponentProps{
  answer: string;
  time: string;
  darkMode: boolean;
  onReply:()=>void;
  isReply?:boolean;
  onReplyClick?:(e:any)=>void;
  id?:string;
}

const AnswerComponent:React.FC<IAnswerComponentProps> = ({answer, time, darkMode, onReply, isReply, id, onReplyClick}) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false)
  return (
    <div onMouseLeave={(e)=>setIsMouseEntered(false)} onMouseOver={(e)=>setIsMouseEntered(true)} className={`m-1 my-3 ${isReply&& "no-selection"}`}>
      <div className={`${isReply? "w-fit opacity-70 justify-center":"w-full justify-start"} flex items-center relative`}>
        <span
          onClick={()=>isReply&&onReplyClick&&onReplyClick(id)}
          className={`relative w-fit ${isReply?"max-w-full cursor-pointer":"max-w-[80%]"} -my-1 flex justify-end items-center pl-4 p-2 rounded-b-xl ${isReply&& "rounded-l-xl"} rounded-tr-xl ${
            darkMode ? "bg-[#383842] text-white" : "bg-[#ece5dd]"
          } `}
        >
          {isMouseEntered&& !isReply&& <span onClick={onReply} className="absolute !top-[50%] !bottom-[50%] -right-8 !z-[0] ">
            <TooltipComponent title="Reply">
            <ReplyIcon className={`cursor-pointer ${darkMode? "text-gray-200":"text-gray-800"}`}/>
            </TooltipComponent>
          </span>}
          {answer === null ? (
            <AnswerLoaderSpinner />
          ) : answer.includes("```") ? (
            <GetCodeFormat isReply={isReply} code={answer} />
          ) : answer.includes("**") ? (
            <GetPointedParagraph text={answer} />
          ) : (
            <span className="whitespace-break-spaces px-4">
              {answer}
            </span>
          )}
          <span className="text-xs absolute right-1 bottom-1">{time}</span>
        </span>
      </div>
      {!isReply&& <span className="text-xs">{time}</span>}
    </div>
  );
};

interface CodeComponentProps {
  code: string;
  isReply?:boolean
}

const GetCodeFormat: React.FC<CodeComponentProps> = ({ code , isReply}) => {
  const [language, setLanguage] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    setLanguage(`${detectLanguage(code.split("```")[1]).toLowerCase()}`);
  }, []);
  const [theme, setTheme] = useState<any>(atomOneDark);

  const codeDivRef = useRef(null);

  const copyCodeToClipboard = () => {
    const codeDiv: any = codeDivRef.current;
    if (codeDiv) {
      const codeText = codeDiv.textContent || codeDiv.innerText;
      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          console.log("Code copied to clipboard!");
        })
        .catch((err) => {
          console.error("Unable to copy code to clipboard", err);
        });
    }
  };
  useEffect(()=>{
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", codeDivRef)
  },[])
  return (
    <div className=" w-full h-full rounded-md">
      {code.split("```")[0]}
      <div
        className={`rounded-md ${
          theme === atomOneDark
            ? "bg-[#282C34] text-[#F8F8FF]"
            : "bg-[#F8F8FF] text-[#282C34]"
        }`}
      >
        {!isReply&& <div className="flex justify-between items-center p-2 font-[700]">
          <div className="flex justify-center items-center text-xs cursor-pointer">
            <div
              onClick={() =>
                setTheme(theme === atomOneDark ? docco : atomOneDark)
              }
              className="flex justify-center items-center gap-2"
            >
              {theme === atomOneDark ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
              <span>Change Theme</span>
            </div>
          </div>
          <div
            onClick={() => {
              !checked && setChecked(true);
              !checked && copyCodeToClipboard();
              setTimeout(() => setChecked(false), 2500);
            }}
            className="flex justify-center items-center gap-2 text-xs cursor-pointer"
          >
            {checked ? (
              <AssignmentTurnedInIcon fontSize={"small"} />
            ) : (
              <ContentCopyIcon fontSize={"small"} />
            )}
            <span>Copy Code</span>
          </div>
        </div>}
        <div ref={codeDivRef}>
          <SyntaxHighlighter
            wrapLongLines
            customStyle={{ overflowX: "scroll", borderRadius: "6px" }}
            language={language}
            style={theme}
            
            // showLineNumbers
          >
            {code.split("```")[1].startsWith('\n')? code.split("```")[1].substring(1,code.length-1):code.split("```")[1]}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="whitespace-pre-line">
      {code.split("```").length>1&& code.split("```").map((ele:any, ind:any)=>ind>=2 && ele!=`\n` && ele.length>0 &&ele)}
      </div>
    </div>
  );
};

interface IPointedParagraphProps {
  text: string;
}
const GetPointedParagraph: React.FC<IPointedParagraphProps> = ({ text }) => {
  const [textarray, setTextArray] = useState<string[]>([]);
  useEffect(() => {
    const dataArray = text.split(`\n`);
    setTextArray(dataArray);
    console.log(dataArray);
  }, []);
  return (
    <div>
      {textarray.map((ele: string, index: number) => (
        <div key={index} className="my-4">
          {index != 0 && isNaN(parseInt(ele.charAt(0))) && ele.length ? (
            <span className="px-12">{ele}</span>
          ) : (
            <>
              {index > 0 ? (
                <>
                  <span className="">{ele.split("**")[0]}</span>
                  <span className="font-[700]">{ele.split("**")[1]}</span>
                  <span className="">{ele.split("**")[2]}</span>
                </>
              ) : (
                ele
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const AnswerLoaderSpinner = () => {
  return (
    <div>
      <div className="border-l-[#19C37D] mx-4 animate-spin border-4 rounded-full h-6 w-6 my-2" />
    </div>
  );
};
