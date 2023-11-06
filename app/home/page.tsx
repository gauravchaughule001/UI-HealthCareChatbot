import Assistant from "@/components/Assistant";
import { ChatBotComponent } from "@/components/ChatBotComponent";
import VoiceAssistant from "@/components/VoiceAssistant";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[50%] h-[96%]">
        {/* <VoiceAssistant /> */}
        {/* <Assistant /> */}
        <ChatBotComponent />
      </div>
    </div>
  );
}
