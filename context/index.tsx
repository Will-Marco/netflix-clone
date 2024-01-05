"use client";

import { createContext, useState } from "react";
import { AccountProps, ChildProps, ContextType } from "@/types";

export const Context = createContext<ContextType | null>(null);

export default function GlobalContext({ children }: ChildProps) {
  const [account, setAccount] = useState<AccountProps | null>(null);

  return (
    <Context.Provider value={{ account, setAccount }}>
      {children}
    </Context.Provider>
  );
}
