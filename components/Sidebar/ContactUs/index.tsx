import { loaderComponentState } from "@/config/atoms/loaderComponentState";
import { Rating } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { BsChevronDown } from "react-icons/bs";

interface Props {
  darkMode: boolean;
}

const ContactUs: React.FC<Props> = ({ darkMode }) => {
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const setShowLoader = useSetRecoilState(loaderComponentState);
  const [rating, setRating] = useState<number | null>(0);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/share-feedback`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res)
      setFeedbacks(res?.data?.feedbacks?.reverse());
    } catch (e) {
      console.log(e);
      toast("Something went wrong!");
    }
  };

  const submitFeedback = async () => {
    setShowLoader(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:5000/share-feedback`,
        { feedback: feedback, rating: rating },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFeedback("")
      setRating(null)
      getFeedbacks()
      toast(res.data.message);
    } catch (e: any) {
      if (e.response.data.message) {
        toast(e.response.data.message);
      } else {
        toast("Something went wrong! Please try again.");
      }
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <div className={`w-full max-h-full h-full overflow-y-scroll`}>
      <h1 className="text-center text-xl mb-2">Share a feedback</h1>
      <p className="text-sm font-[300] px-8 pb-6">
        Write a feedback that can help us improve the user experience and
        interface. Your feedback will be important for us to optimize our
        performance and deliver services faster than now.
      </p>
      <div className="!w-full flex justify-center items-center">
        <textarea
          minLength={20}
          className={`${
            darkMode
              ? " text-white min-h-7 border-gray-400"
              : "text-black border-gray-400 "
          } border-[1px] bg-transparent p-2 rounded-md outline-none`}
          cols={40}
          rows={8}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-start items-center gap-2 p-3 px-8 font-[500]">
        Rate Us :
        <Rating
          value={rating as any}
          ratedColor="amber"
          unratedColor="amber"
          className="flex justify-center items-center"
          onChange={(e) => setRating(parseInt(e.toString()))}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={()=>feedback.length>20? submitFeedback():toast("Feedback must be of minimum 20 characters.")}
          className={`w-[160px] bg-[#128C7E] ${
            darkMode ? "text-white" : "text-gray-100"
          } font-[500] py-2 text-center rounded-md`}
        >
          Submit
        </button>
      </div>
      <div className="px-2 my-2">
      <Accordion className={`${darkMode && " !bg-[#2a2a31] !text-gray-200"}`}>
        <AccordionSummary
          expandIcon={<BsChevronDown color={` ${darkMode?"#E5E7EB":"#2a2a31"} `} strokeWidth={1}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >Recent Feedbacks
        </AccordionSummary>
        <AccordionDetails>
        {feedbacks.length>0?feedbacks.map((element:any, index:number)=>(<div key={index} className={`border-t-[1px] ${darkMode?"border-gray-700":"border-gray-300"} w-full mt-2`}>
          <div className={`w-fit my-2`}>
            <p className="text-xs font-[600]">{element.date.substring(0, element.date.lastIndexOf(":"))}</p>
            <div className="flex justify-start items-center w-full">
            <Rating
              key={index}
              readonly
              className="flex justify-center items-center my-2"
              value={element.rating}
              />
            </div>
            <p className={`text-sm ${darkMode?"text-gray-300":"text-gray-600"}`}>{element.feedback}</p>
          </div>
        </div>)):
        
        <div className="flex justify-center items-center h-[100px] w-full font-[600] text-lg">You haven't posted any feedback yet.</div>}
              </AccordionDetails>
            </Accordion>
      </div>
    </div>
  );
};

export default ContactUs;
