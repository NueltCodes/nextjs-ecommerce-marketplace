import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import { Store, StoreIcon } from "lucide-react";

const Navbar = async () => {
  const categories = await getCategories();
  const products = await getProducts({ isFeatured: true });

  return (
    <div className="border-b pt-1 w-full">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex justify-between gap-x-2 h-16 items-center w-full">
          <div className="w-auto md:w-[30%] lg:w-[25%]">
            <Link href="/" className="w-full flex items-center">
              <StoreIcon className="mr-1 cursor-pointer" size={25} />
              <p className="font-bold text-sm md:text-sm lg:text-lg md:block hidden">
                Daa_Market Place
              </p>
            </Link>
          </div>
          <MainNav data={categories} products={products} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
