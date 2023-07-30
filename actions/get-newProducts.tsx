import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getNewProducts = async (query: Query): Promise<Product[]> => {
  // Filter out undefined query parameters
  const filteredQuery: qs.StringifiableRecord = {};
  if (query.colorId) filteredQuery.colorId = query.colorId;
  if (query.sizeId) filteredQuery.sizeId = query.sizeId;
  if (query.categoryId) filteredQuery.categoryId = query.categoryId;
  if (query.isFeatured !== undefined) {
    // Convert boolean to string cause the query expects all to be string so as to avoid errors
    filteredQuery.isFeatured = query.isFeatured.toString();
  }

  const url = qs.stringifyUrl({
    url: URL,
    query: filteredQuery,
  });

  try {
    // Append a timestamp to the URL to avoid caching
    const timestamp = Date.now();
    const res = await fetch(`${url}&timestamp=${timestamp}`);

    // Check if the response is successful (status code within the range of 200-299)
    if (!res.ok) {
      // If the response is not successful, throw an error
      throw new Error("Failed to fetch product data");
    }

    return res.json();
  } catch (error) {
    // Handle network errors or errors during JSON parsing
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getNewProducts;
