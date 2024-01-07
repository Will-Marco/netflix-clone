"use client";

import Login from "@/components/shared/Login";
import ManageAccount from "@/components/shared/Manage-account";
import { useGlobalContext } from "@/hook";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { account } = useGlobalContext();
  const { data: session } = useSession();

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;

  return <div>Browse Page</div>;
};

export default Page;
