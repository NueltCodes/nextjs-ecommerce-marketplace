"use client";
import { BillboardImage, Billboard as BillboardTypes } from "@/types";

import { useEffect, useState } from "react";
interface BillboardProps {
  data: BillboardTypes;
  billBoardImage: BillboardImage[]; // Changed this to string
}

const Billboard: React.FC<BillboardProps> = ({ data, billBoardImage }) => {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % billBoardImage.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [billBoardImage]);

  const currentImage = billBoardImage[imageIndex]?.url || "";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div
        className="relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover rounded-md transition-all"
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 30,
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
        }}
      >
        <div className="h-full w-full flex flex-col justify-end items-center text-center gap-y-8">
          <div
            className="font-bold  rounded p-2 text-lg sm:text-5xl lg:text-5xl text-white sm:max-w-xl max-w-xs
          "
            style={{
              // Add inline style to create the glassmorphism effect
              background: "rgba(255, 255, 255, 0.2)", // Very transparent white background
              backdropFilter: "blur(10px)", // Add a blur effect to the background
              borderRadius: "8px", // Optional: Add some border-radius to soften the edges
              padding: "1rem", // Optional: Add padding to the content
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow effect
            }}
          >
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
