"use client";
import React, { MouseEventHandler } from "react";
import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  // const handleClick = () => {
  //   router.push(`/product/${data?.id}`);
  // };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-1.5"
    >
      {/* Image & actions */}
      <div className=" rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          layout="responsive"
          width={200}
          height={200}
          className="card-image  object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden">
          {data.name}
        </p>
        <div className="flex items-center gap-x-3">
          <p className="text-lg text-gray-500 font-medium">
            {data.category?.name}
          </p>
          <p className="text-[16px] text-green-600">
            {" "}
            <span>Stocks </span>({data?.units})
          </p>
        </div>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
