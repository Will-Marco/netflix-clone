"use client";

import Login from "@/components/shared/Login";
import { useGlobalContext } from "@/hook";
import React from "react";

const Page = () => {
  const { account } = useGlobalContext();

  if (account === null) return <Login />;

  return <div>Browse Page</div>;
};

export default Page;
