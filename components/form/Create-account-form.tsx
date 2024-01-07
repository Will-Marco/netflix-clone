import { createAccountSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import PinInput from "react-pin-input";
import { Button } from "../ui/button";

const CreateAccountForm = () => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { name: "", pin: "" },
  });

  const { isSubmitting } = form.formState;

  async function isSubmit(values: z.infer<typeof createAccountSchema>) {
    console.log(values);
  }

  return (
    <>
      <h1 className={"text-3xl text-center text-white font-bold "}>
        Create your account
      </h1>
      <hr className="w-full h-2 mb-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(isSubmit)}>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete={"off"}
                    className={"h-[56px]"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Your name is used to identify your account.
                </FormDescription>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"pin"}
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <PinInput
                    length={4}
                    initialValue={field.value}
                    secret
                    disabled={isSubmitting}
                    secretDelay={100}
                    type={"numeric"}
                    inputMode={"number"}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "10px",
                    }}
                    inputStyle={{
                      borderColor: "RGBA(255, 255, 255, 0.16)",
                      height: "56px",
                      width: "100%",
                      fontSize: "40px",
                    }}
                    inputFocusStyle={{
                      borderColor: "RGBA(255, 255, 255, 0.80)",
                    }}
                    autoSelect={true}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormDescription>
                  Your PIN is used to identify your account.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-[56px] mt-4 flex justify-center items-center bg-red-700 text-white hover:bg-red-800 active:bg-red-900"
          >
            Create account
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateAccountForm;
