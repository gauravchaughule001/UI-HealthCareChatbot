import CardComponent from "@/components/CardComponent";
import React from "react"
import { subscriptions } from "./SubscriptionTypes";

interface Props{
    darkMode:boolean;
}

const Subscription:React.FC<Props> = ({darkMode}) => {
  const subscriptionTypes = subscriptions
  return (
    <div className={`w-full h-full`}>
        <div className="w-full h-[10%] flex justify-center items-center">
          <h1 className="text-center font-[600] text-xl">
            Subscription
          </h1>
        </div>
        <div className="max-h-[90%] h-full overflow-y-scroll py-4">
          {subscriptionTypes.map((ele, index:number)=>(
            <div key={index} className="w-fit h-fit m-auto">
            <CardComponent onElementClick={()=>alert(ele.title)} actionButton={ele.actionButton} description={ele.description} title={ele.title} darkMode={darkMode}/>
        </div>
          ))}
          </div>
    </div>
  )
};

export default Subscription;
