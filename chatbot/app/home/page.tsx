import { ChatBotComponent } from "@/components/ChatBotComponent";

export default function Home() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className="w-[50%] h-[96%]">
          <ChatBotComponent/>
        </div>
    </div>
  )
}
