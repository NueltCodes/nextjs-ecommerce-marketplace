"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex gap-x-1 py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="mt-1 py-1 sm:py-0 flex items-center text-sm">
            <p className="text-gray-500 font-semibold">
              <span className="text-gray-800 font-bold">Color:</span>{" "}
              {data.color.name}
            </p>
            <p className="ml-4 text-gray-500 border-l-2 border-gray-200 pl-4 font-semibold">
              <span className="text-gray-800 font-bold">Size: </span>
              {data.size.name}
            </p>
          </div>
          <Currency data={data} value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
