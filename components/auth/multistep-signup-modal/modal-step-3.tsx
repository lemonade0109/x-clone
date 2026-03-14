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
            <FormLabel className="x-label">Password</FormLabel>
            <FormControl>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  {...field}
                  className="w-full rounded-md border border-gray-300 px-4 py-6 text-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ModalStep3Password;
