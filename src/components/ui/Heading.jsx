"use client"
import { Dancing_Script } from "next/font/google";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Heading({ text }) {
  return (
    <div className={`${dancingScript.className} flex flex-row items-center`}>
      <h4 className="text-lg sm:text-2xl md:text-3xl bg-gradient-to-bl from-red-900 via-orange-600 to-red-500 bg-clip-text text-transparent font-bold w-fit">
        {text}
      </h4>
    </div>
  );
}



export const HeadingText = ({ heading, text }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 100, // Offset from the top before animation starts
    });
  }, []);
  return (
    <div className="w-[100%] flex flex-col items-center justify-center">
      <div
        className="flex items-center w-[70%] justify-center"
        data-aos="fade-up"
        data-aos-delay={300}
      >
        {" "}
        <span className="h-[2px] w-[8%] mr-1 border-[1px] rounded-md border-custom-color"></span>{" "}
        <div className="w-auto">
          {" "}
          <div
            className={`${dancingScript.className} flex flex-row items-center`}
          >
            <h4 className="text-lg sm:text-2xl md:text-3xl text-orange-600 font-bold">{text}</h4>
          </div>{" "}
        </div>{" "}
        <span className="h-[2px] w-[8%] border-[1px] ml-1 rounded-md border-custom-color"></span>{" "}
      </div>
      <h2
        className="text-black mb-6 text-2xl sm:text-3xl md:text-4xl font-serif font-bold mt-3 letter-wide"
        data-aos="fade-up"
        data-aos-delay={300}
      >
        {heading}
      </h2>
    </div>
  );
};




export const LoginHeading = ({text}) => {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
      {text}
    </h2>
  )
}


import React from 'react'
export const HeroHeading = ({text1, text2=""}) => {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 font-serif font-bold leading-tight mb-4">
      {text1} <br/> {text2}
    </h1>
  )
}

