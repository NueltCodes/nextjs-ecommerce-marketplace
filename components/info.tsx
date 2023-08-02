"use client";

import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";
import { useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (data.units <= quantity) {
      toast.error("Product stock limited! please check back");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const onAddToCart = () => {
    cart.addItem(data, quantity); // Add item to cart with the specified quantity
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price * quantity} />{" "}
          {/* Multiply the price with the quantity */}
        </p>
        <div className="flex items-center">
          <button
            onClick={decreaseQuantity}
            className="px-2 py-1 rounded bg-gray-200 text-gray-800"
          >
            -
          </button>
          <span className="px-4 font-bold text-lg">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-2 py-1 rounded bg-gray-200 text-gray-800"
          >
            +
          </button>
        </div>
      </div>

      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Stocks available:</h3>
          <div>({data?.units})</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      {data?.units && data?.units > 1 ? (
        <div className="mt-10 flex items-center gap-x-3">
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        </div>
      ) : (
        <div className="mt-10 flex items-center gap-x-3">
          <Button
            disabled
            onClick={onAddToCart}
            className="flex items-center gap-x-2"
          >
            Item out of stock
            <AiOutlineStock size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Info;
