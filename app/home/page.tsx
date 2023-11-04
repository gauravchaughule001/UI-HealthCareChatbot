import { ChatBotComponent } from "@/components/ChatBotComponent";

export default function Home() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className="lg:w-[50%] md:w-[50%] xs:w-full h-[96%]">
          <ChatBotComponent/>
        </div>
    </div>
  )
}
