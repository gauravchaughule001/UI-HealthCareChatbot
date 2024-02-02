'use client'
import React from 'react'
export default function page() {
    const theme = localStorage.getItem("theme")==="true"?true:false
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme?"bg-gray-900":"bg-[#ddd]"}`}>
    <div className={`max-w-md w-full p-6 rounded-lg ${theme?"bg-gray-800 text-gray-300":"bg-[#cecece] text-black"} shadow-lg text-center`}>
      <h1 className="text-5xl font-bold mb-6">500 Internal Server Error</h1>
      <p className="text-xl  mb-8">Oops! Something went wrong on our end.</p>
      <div className="mb-8">
        <img
          className={`mx-auto h-40 ${theme&&"invert"}`}
          src="https://static.thenounproject.com/png/970831-200.png" // Replace with your SVG file or use an appropriate URL
          alt="Disconnected server"
        />
      </div>
      <p className="text-lg mb-6">
        Our team of experts is working on it.
        <br />
        Please try again later.
      </p>
      <div className="flex justify-center">
        <button
          className="bg-teal-500 hover:bg-teal-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        //   onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    </div>
  </div>
  )
}
