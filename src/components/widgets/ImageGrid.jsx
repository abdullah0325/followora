"use client";
import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
const ImageGrid = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      delay: 100,
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-2 p-4 w-[90%] lg:w-[100%] xl:w-[90%]">
      <div className=" w-[48%] h-[50%] ">
        {" "}
        <Image
          src="/images/follower.jpg"
          alt={`Image `}
          width={500}
          height={500}
          className="w-[100%] h-[100%]  shadow-lg "
          data-aos="zoom-in"
        />{" "}
      </div>
      <div className=" w-[48%] h-[40%] mt-auto mr-auto">
        <Image
          src="/images/follower.jpg"
          alt={`Image `}
          width={500}
          height={500}
          className="w-[78%] mt-auto h-[80%] shadow-lg"
          data-aos="zoom-in"
        />{" "}
      </div>
      <div className=" w-[48%] h-[50%] ">
        <Image
          src="/images/follower.jpg"
          alt={`Image `}
          width={500}
          height={500}
          className="w-[78%] mb-auto ml-auto h-[85%] shadow-lg"
          data-aos="zoom-in"
        />{" "}
      </div>{" "}
      <div className=" w-[48%] h-[50%] ">
        {" "}
        <Image
          src="/images/follower.jpg"
          alt={`Image `}
          width={500}
          height={500}
          className="w-[100%] h-[100%]  shadow-lg "
          data-aos="zoom-in"
        />
      </div>
    </div>
  );
};

export default ImageGrid;
