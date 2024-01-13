"use client";

import Loader from "@/components/shared/Loader";
import Login from "@/components/shared/Login";
import ManageAccount from "@/components/shared/Manage-account";
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

  return <div>Browse Page</div>;
};

export default Page;
