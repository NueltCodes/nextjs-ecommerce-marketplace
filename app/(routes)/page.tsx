import getBillboard from "@/actions/get-billboard";
import getNewProducts from "@/actions/get-newProducts";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import React from "react";

export const revalidate = 0;
const HomePage = async () => {
  const billboard = await getBillboard("cec43b03-2893-4fdb-a050-933c32bdbbfd");
  const products = await getProducts({ isFeatured: true });
  // const newProducts = await getNewProducts({
  //   isFeatured: true,
  // });

  // console.log(products);
  return (
    <Container>
      <div className="w-full pb-10 mx-auto">
        <Billboard data={billboard} billBoardImage={billboard.imageUrl} />
        <div className="flex mt-10 flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
        {/* New products */}
        <div className="flex mt-10 flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="New Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
