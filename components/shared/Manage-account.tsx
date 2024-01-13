import { LockKeyhole, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import LoginAccountForm from "../form/Login-account-form";
import CreateAccountForm from "../form/Create-account-form";
import { AccountResponse, AccountProps } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { Skeleton } from "../ui/skeleton";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<"login" | "create">("create");
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [cuttentAccount, setCuttentAccount] = useState<AccountProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const { data: session }: any = useSession();

  useEffect(() => {
    const getAllAccounts = async () => {
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

    getAllAccounts();
  }, [session]);

  const onDelete = async (id: string) => {
    try {
      const isConfirmed = confirm(
        "Are you sure you want to delete this account?"
      );
      if (isConfirmed) {
        const { data } = await axios.delete<AccountResponse>(
          `/api/account?id=${id}`
        );
        if (data.success) {
          setAccounts(accounts.filter((account) => account._id !== id));
          return toast({
            title: "Account deleted successfully",
            description: "Your account has been deleted successfully",
          });
        } else {
          return toast({
            title: "Error",
            description: data.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "An error occurred while deleting your account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-12 text-5xl text-white font-bold ">
          Who&apos;s Watching?
        </h1>
        <ul className="my-12 p-0 flex">
          {isLoading ? (
            [1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} className="w-[155px] h-[200px] max-w-[200px] min-w-[200px] mx-2" />
            ))
          ) : (
            <>
              {accounts &&
                accounts.map((account) => (
                  <li
                    key={account._id}
                    onClick={() => {
                      if (!isDelete) return;
                      setOpen(true);
                      setState("login");
                      setCuttentAccount(account);
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
                          sizes="1"
                        />
                      </div>
                      {!isDelete ? (
                        <div
                          className={"absolute bottom-0 z-10 cursor-pointer"}
                          onClick={() => onDelete(account._id)}
                        >
                          <Trash2 className={"w-8 h-8 text-red-600"} />
                        </div>
                      ) : null}
                    </div>
                    <div className={"flex items-center gap-1"}>
                      <span className={"font-mono font-bold text-xl"}>
                        {account.name}
                      </span>
                      <LockKeyhole />
                    </div>
                  </li>
                ))}
              {accounts && accounts.length < 4 ? (
                <li
                  onClick={() => {
                    setOpen(true), setState("create");
                  }}
                  className="w-[155px] h-[155px] max-w-[200px] min-w-[84px] max-h-[200px] min-h-[84px] flex justify-center items-center bg-[#e5b109] text-xl font-bold border rounded border-black cursor-pointer"
                >
                  Add account
                </li>
              ) : null}
            </>
          )}
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
          {state === "login" && (
            <LoginAccountForm cuttentAccount={cuttentAccount} />
          )}
          {state === "create" && (
            <CreateAccountForm
              uid={session?.user?.uid}
              setOpen={setOpen}
              setAccounts={setAccounts}
              accounts={accounts}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAccount;
