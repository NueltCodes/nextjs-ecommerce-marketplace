import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  isFeatured?: boolean;
}

const getNewArrivals = async (query: Query = {}): Promise<Product[]> => {
  const sortedQuery = {
    ...query,
    _sort: "createdAt:desc", // Sort by createdAt in descending order
    _limit: 1, // Limit the number of results to 20
  };
  // ...
  console.log(sortedQuery);

  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: sortedQuery,
    });

    const timestamp = Date.now();
    const res = await fetch(`${url}&timestamp=${timestamp}`);

    if (!res.ok) {
      throw new Error("Failed to fetch new arrival products");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching new arrival products:", error);
    throw error;
  }
};
export default getNewArrivals;
