"use client";

import { Common, Loader, Login, ManageAccount } from "@/components/shared";
import { useGlobalContext } from "@/hook";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Page = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    setPageLoader(false);
  }, [setPageLoader]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common />;
};

export default Page;
