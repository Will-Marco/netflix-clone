"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/constants";
import SearchBar from "./Search-bar";
import { AiOutlineSearch } from "react-icons/ai";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useGlobalContext } from "@/hook";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MoviePopup from "../movie/Movie-popup";
import { AccountProps, AccountResponse } from "@/types";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { account, setAccount, setPageLoader } = useGlobalContext();
  const { data: session }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    const getAllAccounts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<AccountResponse>(
          `/api/account?uid=${session.user.uid}`
        );
        data.success && setAccounts(data.data as AccountProps[]);
      } catch (error) {
        return toast({
          title: "Error",
          description: "An error occurred while fetching your accounts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    getAllAccounts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };

  return (
    <div className="relative">
      <header
        className={cn(
          "h-[10vh] header hover:bg-black transition-all duration-400 ease-in-out",
          isScrolled && "bg-black"
        )}
      >
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
                onClick={() => {
                  router.push(item.path);
                  setPageLoader(true);
                }}
                className="text-[18px] text-[#e5e5e5] cursor-pointer transition duration-[.4s] hover:text-[#b3b3b3]"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <MoviePopup />

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
              {isLoading ? (
                <div className={"flex flex-col space-y-4"}>
                  {[1, 2].map((_, i) => (
                    <Skeleton className={"w-full h-14"} key={i} />
                  ))}
                </div>
              ) : (
                accounts &&
                accounts.map((account) => (
                  <div
                    className={
                      "cursor-pointer flex gap-3 h-14 hover:bg-slate-800 rounded-md items-center px-4 py-2"
                    }
                    key={account._id}
                    onClick={() => {
                      setAccount(null);
                      sessionStorage.removeItem("account");
                    }}
                  >
                    <img
                      src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                      alt="Current Profile"
                      className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                    />
                    <p>{account.name}</p>
                  </div>
                ))
              )}

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
