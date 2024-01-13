"use client";

import { createContext, useEffect, useState } from "react";
import { AccountProps, ChildProps, ContextType } from "@/types";

export const Context = createContext<ContextType | null>(null);

export default function GlobalContext({ children }: ChildProps) {
  const [account, setAccount] = useState<AccountProps | null>(null);
  const [pageLoader, setPageLoader] = useState(true);

  useEffect(() => {
    setAccount(JSON.parse(sessionStorage.getItem("account")!));
  }, []);

  return (
    <Context.Provider
      value={{ account, setAccount, pageLoader, setPageLoader }}
    >
      {children}
    </Context.Provider>
  );
}
