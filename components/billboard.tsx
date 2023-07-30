"use client";
import { BillboardImage, Billboard as BillboardTypes } from "@/types";
import { data } from "autoprefixer";
import image from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";
interface BillboardProps {
  data: BillboardTypes;
  billBoardImage: BillboardImage[]; // Change this to string
}

const Billboard: React.FC<BillboardProps> = ({ data, billBoardImage }) => {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % billBoardImage.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [billBoardImage]);

  const currentImage = billBoardImage[imageIndex]?.url || "";

  console.log(data);
  return (
    <div className="p-4 sm:p-6 lg:p-8  overflow-hidden">
      <div
        className="-m-8 relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover transition-all duration-1000 ease-in-out "
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 30,
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
        }}
      >
        <div className="h-full w-full flex flex-col justify-end items-center text-center gap-y-8">
          <div className="font-bold bg-white rounded p-2 text-lg sm:text-5xl lg:text-2xl sm:max-w-xl max-w-xs">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
