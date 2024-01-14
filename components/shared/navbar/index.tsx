"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/constants";
import SearchBar from "./Search-bar";
import { AiOutlineSearch } from "react-icons/ai";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useGlobalContext } from "@/hook";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { account, setAccount } = useGlobalContext();

  const logout = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };

  return (
    <div className="relative">
      <header className="h-[10vh] header hover:bg-black transition-all duration-100">
        <div className="h-full flex items-center space-x-2 md:space-x-10">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={120}
            height={120}
            alt="NETFLIX"
            className="object-contain cursor-pointer"
          />
          <ul className="md:flex md:space-x-4 hidden">
            {MenuItem.map((item) => (
              <li
                key={item.path}
                className="text-[18px] text-[#e5e5e5] cursor-pointer transition duration-[.4s] hover:text-[#b3b3b3]"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm ">
          {showSearchBar ? (
            <SearchBar setShowSearchBar={setShowSearchBar} />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar((prev) => !prev)}
              className="sm:w-6 sm:h-6 sm:inline hidden cursor-pointer"
            />
          )}

          <Popover>
            <PopoverTrigger className="flex items-center gap-2 cursor-pointer">
              <Image
                src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                width={30}
                height={30}
                alt="Current Profile"
                className="max-w-[30px] max-h-[30px] min-w-[20px] min-h-[20px] object-cover rounded"
              />
              <p className="text-lg font-semibold">{account && account.name}</p>
            </PopoverTrigger>
            <PopoverContent>
              <button
                onClick={logout}
                className="w-full h-[56px] mt-4 py-2 text-center text-sm border border-white/40 rounded-md hover:bg-slate-800"
              >
                Sign out of Netflix
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
}
