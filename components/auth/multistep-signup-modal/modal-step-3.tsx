// Password Modal
"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpData } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<SignUpData>;
};

const ModalStep3Password: React.FC<Props> = ({ form }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        Make sure it's 8 characters or more.
      </p>

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                {...field}
              />

              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ModalStep3Password;
