"use client";
import "regenerator-runtime";
import { useEffect, useRef, useState } from "react";
import { ChatHistory } from "../ChatHistory";
import client from "@/services/client";
import { application } from "@/config/apis";
import Loader from "../Loader";
import { BsFillMicFill } from "react-icons/bs";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseArrowIcon from "@mui/icons-material/pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTheme } from "@mui/material/styles";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import moment from "moment";
import { TbMessageChatbot } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { loaderComponentState } from "@/config/atoms/loaderComponentState";
import { AiFillCloseCircle } from "react-icons/ai";
import TextInputComponent from "../TextInputComponent";
export const ChatBotComponent: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const [userInput, setUserInput] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const setShowLoader = useSetRecoilState(loaderComponentState);
  

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async (showLoader?: boolean) => {
    // showLoader && setLoader(true);
    try {
      const res = await client.get(
        `${application.baseUrl}/chat?number=${messagesCount}`,
        {
          timeout: 10000,
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTimeout(() => setData(res?.data?.data), 100);
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoadingMoreMessages(false);
      setLoader(false);
      setShowLoader(false);
    }
  };

  const sendMessage = async (voiceMessage?: string) => {
    try {
      let currentTime: string = moment(Date.now())
        .format("LTS")
        .substring(0, moment(Date.now()).format("LTS").lastIndexOf(":"));
      if (
        currentTime.indexOf(":") == 1 &&
        currentTime.split(":")[1].length == 1
      ) {
        currentTime =
          "0" + currentTime.split(":")[0] + ":0" + currentTime.split(":")[1];
      } else if (currentTime.indexOf(":") == 1) {
        currentTime = "0" + currentTime;
      } else if (currentTime.split(":")[1].length == 1) {
        currentTime =
          currentTime.split(":")[0] + ":0" + currentTime.split("")[1];
      }
      setData([
        ...data,
        {
          question: voiceMessage || userInput,
          answer: null,
          time: currentTime,
          _id: "",
          isReplying: reply.id.length? true: false,
          ...(reply.id.length&&{reply:{
            message: reply.message,
            reply_id: reply.id,
            time:""
          }})
        },
      ]);
      setUserInput("");
      let ifReplying = reply
      setReply({id:"", message:""})
      const response: any = await client.post(
        `${application.baseUrl}/chat`,
        {
          question: voiceMessage || userInput,
          ...(ifReplying.message.length>0?{isReplying: true, replyId: ifReplying.id}: {isReplying: false})
        },
        {
          timeout: 30000,
          headers: {authorization: `Bearer ${localStorage.getItem("token")}`},
        }
      );
      await getChats(true);
      return response;
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        router.push("/");
      }
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      setTimeout(() => sendMessage(transcript), 300);
    }
  }, [transcript, listening]);
  const [loadingMoreMessages, setLoadingMoreMessages] =
    useState<boolean>(false);
  const [messagesCount, setmessagesCount] = useState<number>(100);

  const [formats, setFormats] = useState<any>([]);
  const [fontStyles, setFontStyles] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color: string;
  }>({ bold: false, italic: false, underline: false, color: "#00000" });
  const [reply, setReply] = useState<{id:string; message:string}>({id:"", message:""})
  return (
    <div
      className={`w-full ${
        formats.filter((ele: any) => ele.includes("color")).length &&
        "text-[" +
          formats
            .filter((ele: any) => ele.includes("color"))[0]
            ?.replaceAll("color-", "") +
          "]"
      } h-full ${formats.includes("bold") && "font-[700]"} ${
        formats.includes("underlined") && "underline"
      } ${formats.includes("italic") && "italic"}`}
    >
      {/* <img className={`absolute top-0 left-0 opacity-50 max-h-full rotate-180 !z-[0] w-full ${darkMode?"":"invert"}`} src="bg.jpg"/> */}
      <div className="h-full max-h-[93%] relative">
        {loader ? (
          <Loader darkMode={darkMode} />
        ) : !data?.length ? (
          <div className="flex flex-col justify-center items-center space-y-6 h-full w-full text-gray-500">
            <div>
              <TbMessageChatbot className="text-[100px] text-[#128C7E]" />
            </div>
            <div className="text-xl">Say Hi to start conversation</div>
          </div>
        ) : (
          <ChatHistory
            onReply={(e)=>setReply({id:e.id, message:e.message})}
            darkMode={darkMode}
            loadingMessages={loadingMoreMessages}
            loadMoreMessages={() => {
              setmessagesCount(messagesCount + 10);
              setLoadingMoreMessages(true);
              setTimeout(() => getChats(), 500);
            }}
            data={data}
          />
        )}
        {reply.message.length>0&& <div className={`w-[98%] left-[1%] rounded-t-xl border-2 overflow-y-hidden ${darkMode?"border-gray-600 bg-gray-800 bg-opacity-80" : "border-gray-400 bg-[#ddd]"} border-b-0 max-h-36 min-h-12 pt-4 px-4 absolute bottom-0`}>
          <div className="relative">
            <AiFillCloseCircle onClick={()=>{
              setReply({id:"", message:""})
              }} fontSize={24} className="absolute -right-4 -top-4 cursor-pointer"/>
          <p className="truncate whitespace-break-spaces">{reply.message}</p>
          </div>
        </div>}
      </div>
      {/* <FontSwitcher formats={formats} onChange={(e: any) =>{
        setFormats(e)
        }} /> */}
      {/* <div className="flex justify-between items-center h-[7%] border-[2px] rounded-md 2xs:w-[95%] 2xs:m-auto 2xs:border-[1px] 2xs:rounded-full md:w-full md:border-[2px] md:rounded-md">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-full p-2 outline-none px-4 bg-transparent"
          placeholder="Enter a message..."
          autoFocus
        />
        <div className="flex justify-center items-center gap-2">
          <div
            className={`w-fit h-full flex justify-center items-center ${
              !listening && "pr-2 mb-[1px]"
            }`}
          >
            <div
              onClick={() =>
                listening
                  ? SpeechRecognition.stopListening()
                  : SpeechRecognition.startListening()
              }
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
            onClick={() => userInput.length > 0 && sendMessage()}
            className={`font-[700] w-fit px-4 h-full ${
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
                fill={`${userInput ? "#19C37D" : "grey"}`}
              ></path>
            </svg>
          </button>
        </div>
      </div> */}
      <div className="h-[7%] w-full relative">
      <div className={`absolute bottom-0 w-full h-auto rounded-md z-[999999] ${darkMode?"bg-[#292929]" : "bg-[#FFFFFF]"}`}>
        <TextInputComponent onChange={setUserInput} userInput={userInput} onSendMessage={()=> userInput.length > 0 && sendMessage()} listening={listening} onMicClick={()=>
        listening
        ? SpeechRecognition.stopListening()
        : SpeechRecognition.startListening()} />
      </div>
      </div>

    </div>
  );
};

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();
  return (
    <div className="rounded-md w-full h-full flex justify-center items-center">
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Mac Miller
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label="play/pause"
            >
              {!isPlaying ? (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PauseArrowIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          className={`mix-blend-darken rounded-full ${
            isPlaying && "animate-spin"
          }`}
          component="img"
          sx={{ width: 151 }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIO5biRN0utHQWqQSd7uZHAeBCyOz7WbkrTQ&usqp=CAU"
          alt="Live from space album cover"
        />
      </Card>
    </div>
  );
};

const FontSwitcher: React.FC<{
  onChange: (e: any) => void;
  formats: string[];
}> = ({ onChange, formats }) => {
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    onChange(newFormats);
  };
  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
    >
      <ToggleButton value="bold" aria-label="bold">
        <FormatBoldIcon />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <FormatUnderlinedIcon />
      </ToggleButton>
      <ToggleButton value={"color-#ff0000"} aria-label="color">
        <FormatColorFillIcon />
        <ArrowDropDownIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
