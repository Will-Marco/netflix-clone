import { LockKeyhole, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import LoginAccountForm from "../form/Login-account-form";
import CreateAccountForm from "../form/Create-account-form";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<"login" | "create">("create");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-12 text-5xl text-white font-bold ">
          Who&apos;s Watching?
        </h1>
        <ul className="my-12 p-0 flex">
          <li
            onClick={() => {
              setOpen(true), setState("login");
            }}
            className="max-w-[200px] min-w-[200px] w-[155px] flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <div className="w-[155px] h-[155px] max-w-[200px] min-w-[84px] max-h-[200px] min-h-[84px] relative object-cover rounded">
                <Image
                  src={
                    "https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                  }
                  alt="account"
                  fill
                />
              </div>
              {!isDelete ? (
                <div className={"absolute bottom-0 z-10 cursor-pointer"}>
                  <Trash2 className={"w-8 h-8 text-red-600"} />
                </div>
              ) : null}
            </div>
            <div className={"flex gap-2"}>
              <span className={"text-2xl font-mono font-bold"}>Will</span>
              <LockKeyhole />
            </div>
          </li>
          <li
            onClick={() => {
              setOpen(true), setState("create");
            }}
            className="w-[155px] h-[155px] max-w-[200px] min-w-[84px] max-h-[200px] min-h-[84px] flex justify-center items-center bg-[#e5b109] text-xl font-bold border rounded border-black cursor-pointer"
          >
            Add account
          </li>
        </ul>
        <Button
          onClick={() => setIsDelete((prev) => !prev)}
          className="px-[1.5em] py-[0.5em] inline-flex tracking-wide bg-transparent text-sm !text-white border rounded-none border-gray-100 cursor-pointer hover:bg-transparent"
        >
          Manage Profiles
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {state === "login" && <LoginAccountForm />}
          {state === "create" && <CreateAccountForm />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAccount;
