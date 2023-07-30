import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  try {
    const timestamp = Date.now();

    const res = await fetch(`${URL}/${id}?timestamp=${timestamp}`);

    if (!res.ok) {
      // Handle non-successful HTTP response (status code outside the range of 200-299)
      throw new Error("Failed to fetch product data");
    }

    return res.json();
  } catch (error) {
    // Handle network errors or errors during JSON parsing
    console.error("Error fetching product:", error);
    throw error;
  }
};

export default getProduct;
