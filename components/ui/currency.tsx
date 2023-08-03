"use client";

import { formatter } from "@/lib/utils";
import { Product } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number;
  data?: Product | null;
}

const Currency: React.FC<CurrencyProps> = ({ data, value = 0 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const totalPrice = (data?.quantity ?? 0) * (data?.price ?? 0);

  return (
    <div>
      {data ? (
        <div className="flex items-center gap-1">
          <div className="font-semibold">{formatter.format(Number(value))}</div>
          <div>
            <X size={15} />
          </div>
          <div className="font-semibold">{data?.quantity}</div> =
          <div className="font-semibold">{formatter.format(totalPrice)}</div>
        </div>
      ) : (
        <div className="font-semibold">{formatter.format(Number(value))}</div>
      )}
    </div>
  );
};

export default Currency;
