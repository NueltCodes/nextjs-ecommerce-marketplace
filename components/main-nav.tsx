"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category, Product } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Fragment } from "react";
import { Combobox, Menu, Transition } from "@headlessui/react";

interface MainNavProps {
  data: Category[];
  products: Product[];
}

const MainNav: React.FC<MainNavProps> = ({ data, products }) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState(data[0]);
  const [query, setQuery] = useState("");

  // const routes = data.map((route) => ({
  //   href: `/category/${route.id}`,
  //   label: route.name,
  //   active: pathname === `/category/${route.id}`,
  // }));

  const router = useRouter();

  const filteredCategory =
    query === ""
      ? data
      : data.filter((route) =>
          route?.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  console.log(filteredCategory);
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
    <nav className="sm:ml-6 ml-0 flex relative first-letter:gap-x-2 items-center space-x-4 lg:space-x-6 w-full">
      {/* Display search results */}
      {searchData.length !== 0 && (
        <div className="absolute top-12 mt-2 bg-slate-50 shadow-sm z-[9] overflow-y-scroll h-[50vh] w-[100%]">
          {searchData.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div
                className="flex items-center space-x-2 cursor-pointer mb-2 px-4 hover:bg-slate-200"
                onClick={() => {
                  setSearchTerm(""); // Clear the search term
                  setSearchData([]); // Clear the search results
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
      <div className="z-[999]">
        <Menu as="div" className="relative inline-block text-left z-[999]">
          <div>
            <Menu.Button className="group inline-flex w-full justify-center rounded-md bg-black bg-opacity-70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <span className="hidden sm:block">Categories</span>
              <ChevronDownIcon
                className="group-hover:translate-y-1 sm:ml-2 ml-0 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="flex flex-col h-[200px] absolute z-50 overflow-y-scroll text-[14px]">
              {data.map((route) => (
                /* Use the `active` state to conditionally style the active item. */
                <Menu.Item key={route.id} as={Fragment}>
                  {({ active }) => (
                    <a
                      href={`/category/${route.id}`}
                      className={`${
                        active
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      } px-2 py-2`}
                    >
                      {route.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="w-[100%] relative flex items-center gap-2">
        <div className="w-[100%] block 570px:hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            ref={searchInputRef}
            placeholder="Search products"
            className="flex h-10 w-full rounded-md border-zinc-400 border-2 focus:border-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm  file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {searchTerm.length > 0 ? (
            <X
              size={15}
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setSearchTerm(""); // Clear the search term
                setSearchData([]); // Clear the search results
              }}
            />
          ) : (
            <Search
              size={15}
              className="absolute right-3 top-3 cursor-pointer"
            />
          )}
        </div>
        <div className="w-[100%] hidden 570px:block">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            ref={searchInputRef}
            placeholder="Search products, brand and categories"
            className="flex h-10 w-full rounded-md border-zinc-400 border-2 focus:border-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm  file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {!searchTerm.length && (
            <Search
              size={15}
              className="absolute right-3 top-3 cursor-pointer"
            />
          )}

          {searchTerm.length > 0 && (
            <X
              size={15}
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setSearchTerm(""); // Clear the search term
                setSearchData([]); // Clear the search results
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
