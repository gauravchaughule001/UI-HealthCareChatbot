"use client";
import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const VoiceAssistant = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  console.log("transcript: ", transcript);
  const api_Key = "sk-dC0nfpm221hmvw53VEBUT3BlbkFJX0TJF931jTgF8Dszwtssss";
  async function chatGPT3(message: any) {
    const data = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: transcript,
          },
        ],
        modal: "gpt-3.5-turbo",
      }),
    }).then((res) => res.json());
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
  }

  useEffect(() => {
    if (!listening && transcript) {
      chatGPT3(transcript).then((response) => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
      });
    }
  }, [transcript, listening]);
  return (
    <div className="flex flex-col items-center h-full">
      {listening ? <p>GO ahed..</p> : <p>click he button</p>}
      <button
        onClick={() => {
          SpeechRecognition.startListening();
        }}
      >
        Ask me{" "}
      </button>
      {transcript && <div>{transcript}</div>}
    </div>
  );
};

export default VoiceAssistant;
