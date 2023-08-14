"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category, Product } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import { CheckIcon, ChevronsUpDownIcon, Plus, Search, X } from "lucide-react";
import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

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
    <nav className="ml-6 flex gap-x-2 items-center space-x-4 lg:space-x-6 w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-8 md:w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus:border-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 z-40 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(route: any) => route.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-[150px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
              {filteredCategory?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCategory.map((route) => (
                  <Combobox.Option
                    key={route.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 z-40 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={route}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                          onClick={() => router.push(`/category/${route.id}`)}
                        >
                          {route.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
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
            <Search
              size={15}
              className="absolute right-3 top-3 cursor-pointer"
            />
          ) : (
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

        {/* Display search results */}
        {searchData.length !== 0 && (
          <div className="absolute top-12 mt-2 bg-slate-50 shadow-sm z-[9] overflow-y-scroll w-[100%]">
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
      </div>
    </nav>
  );
};

export default MainNav;
