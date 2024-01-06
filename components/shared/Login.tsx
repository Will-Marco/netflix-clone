import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src={
            "https://repository-images.githubusercontent.com/299409710/b42f7780-0fe1-11eb-8460-e459acd20fb4"
          }
          alt="background"
          fill
        />
      </div>
      <div className="w-3/12 h-[35vh] px-8 py-4 bg-black/50 rounded-md relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Login</h1>
          <Button
            className="w-full h-[56px] mt-4 flex items-center gap-2 bg-red-800 text-white hover:bg-red-700 active:bg-red-900"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </Button>
          <Button
            className="w-full h-[56px] mt-4 flex items-center gap-2 bg-red-800 text-white hover:bg-red-700 active:bg-red-900"
            onClick={() => signIn("github")}
          >
            <FaGithub className="text-2xl" />
            Sign in with Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
