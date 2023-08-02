"use client";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { Product } from "@/types";
import { Star, StarIcon, StarOff, X } from "lucide-react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "./ui/button";

interface ReviewFormProps {
  data: Product;
  userId: string | null;
}

const CreateReviewForm: React.FC<ReviewFormProps> = ({ data, userId }) => {
  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(userId);
  const reviewHandler = useCallback(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        rating,
        comment,
        productId: data?.id,
        userId: userId,
      })
      .then(() => {
        toast.success("Reviewd!");
        router.refresh();
        setRating(1);
        setComment("");
        setOpen(false);
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging purposes

        toast.error("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [comment, data?.id, rating, router, userId]);

  return (
    <div className="border-t border-neutral-200 bg-white">
      <h5
        className={
          "text-[#000] text-[15px] px-1 pb-2 pt-3.5 leading-5 font-[600] text-center 800px:text-[20px]"
        }
      >
        Product Reviews
      </h5>
      {/* {review && review.length > 0 && (
      <div className="w-full min-h-[40vh] border border-neutral-300 p-2 rounded-lg flex flex-col items-center py-3 overflow-y-scroll">
        {review.map((rev) => (
          <div key={rev.id} className="w-full flex items-start my-2">
            <Image
              src={rev.user?.image}
              alt="User Image"
              width="45"
              height="45"
              className="rounded-full"
            />
            <div className="pl-2">
              <div className="flex-col flex sm:flex-row w-full sm:items-center items-start">
                <h1 className="font-[500] mr-3">{rev.user.name}</h1>
                <Ratings rating={rev.rating} />
              </div>
              <p>{rev.comment}</p>
            </div>
          </div>
        ))}
      </div>
    )} */}
      {/* <div className="w-full flex justify-center">
      {review && review.length === 0 && (
        <>
          <h5 className="font-semibold text-[22px] text-black">
            No Reviews yet for this Home!
          </h5>
          <h5 className="text-[#222222] text-[16px]">
            Be the first to review by makinng your reservation
          </h5>
        </>
      )}
    </div> */}
      <Button
        disabled={loading}
        onClick={() => {
          setOpen(true);
        }}
      >
        Write a review
      </Button>
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="sm:w-[75%] w-[90%]  h-[80vh] overflow-y-scroll overflow-hidden bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <X size={30} onClick={() => setOpen(false)} />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full sm:flex-row sm:gap-16 gap-5 flex flex-col">
              <div className="flex gap-1">
                <Image
                  src={data.images?.[0]?.url}
                  alt="Image"
                  height="80"
                  width="80"
                />
                <div>
                  <div className="pl-3 text-[20px]">{data.name}</div>
                  <h4 className="pl-3 text-[20px]">${data.price}</h4>
                </div>
              </div>
              {/* <div>
              <div className="flex items-center gap-1">
                <Image
                  src={listing.user.image}
                  alt="Image"
                  height="40"
                  width="40"
                  className="rounded-full"
                />
                <div className="pl-3 text-[20px]">{listing.user.name}</div>
              </div>
            </div> */}
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              {/* <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the place? write your expression about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea> */}
            </div>
            <Button
              disabled={loading}
              onClick={() => rating > 1 && reviewHandler()}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReviewForm;
