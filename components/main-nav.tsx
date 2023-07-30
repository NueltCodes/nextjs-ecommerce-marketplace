"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category, Product } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import { Plus, Search, X } from "lucide-react";
interface MainNavProps {
  data: Category[];
  products: Product[];
}

const MainNav: React.FC<MainNavProps> = ({ data, products }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const handleInputBlur = () => {
    // Close the search results when the input is blurred (clicked outside)
    setSearchData([]);
  };

  const handleInputFocus = () => {
    // Display the search results when the input is focused
    if (searchTerm.length > 0) {
      const filteredProducts =
        searchTerm.length > 0
          ? products.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : [];

      setSearchData(filteredProducts);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter products based on the search term
    const filteredProducts =
      term.length > 0
        ? products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
          )
        : [];

    setSearchData(filteredProducts);
  };

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 w-full">
      <span
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center  text-sm font-medium transition-colors text-neutral-500 hover:text-black"
      >
        Categries <Plus size={18} />
      </span>

      {open && (
        <ul className="space-y-2">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black",
                  route.active ? "text-black" : "text-neutral-500"
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="w-[60%] relative flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={searchInputRef}
          placeholder="Search products, brand and categories"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {!searchTerm.length && (
          <Search size={15} className="absolute right-5 cursor-pointer" />
        )}

        {searchTerm.length > 0 && (
          <X
            size={15}
            className="absolute right-5 cursor-pointer"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      {/* Display search results */}
      {searchData.length !== 0 && (
        <div className="absolute top-12 mt-2 bg-slate-50 shadow-sm z-[9] w-[50%]">
          {searchData.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div
                className="flex items-center space-x-2 cursor-pointer mb-2 px-4 hover:bg-slate-200"
                onClick={() => {
                  setSearchData([]); // Clear search results when a product is clicked
                }}
              >
                <Image
                  src={product.images?.[0]?.url}
                  width={20}
                  height={50}
                  alt=""
                  className="mr-[10px] w-10 h-10 object-contain"
                />
                <h1 className="text-sm">{product.name}</h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default MainNav;
