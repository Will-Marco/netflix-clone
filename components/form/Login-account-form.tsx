import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import PinInput from "react-pin-input";

const LoginAccountForm = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");

  const onSubmit = (value: string) => {
    setIsLoading(true);
    console.log(value);
  };

  return (
    <>
      <h1 className="mb-4 text-[16px] text-gray-400 font-bold  ">
        Profile Lock is currently ON
      </h1>
      {error ? (
        <h2 className="text-[20px] text-center text-red-500 font-bold">
          Whoops, wrong PIN. Please try again
        </h2>
      ) : (
        <h2 className="text-[20px] text-center text-white font-bold">
          Enter your PIN to access this profile
        </h2>
      )}
      <div className={"flex items-center justify-center"}>
        <PinInput
          length={4}
          initialValue={pin}
          secret
          secretDelay={100}
          onChange={(value) => setPin(value)}
          type="numeric"
          inputMode="number"
          style={{ padding: "20px", display: "flex", gap: "10px" }}
          inputStyle={{
            width: "70px",
            height: "70px",
            fontSize: "40px",
            borderColor: "white",
          }}
          disabled={isLoading}
          inputFocusStyle={{ borderColor: "white" }}
          onComplete={(value) => onSubmit(value)}
          autoSelect={true}
        />
        {isLoading && <Loader2 className={"animate-spin"} />}
      </div>
    </>
  );
};

export default LoginAccountForm;
