// Password Modal
"use client";
import FloatingInputLabel from "@/components/shared/floating-input-label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
      <p className="text-md text-muted-foreground">
        Make sure it's 8 characters or more.
      </p>

      <FormField
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <FormItem className="mb-56 mt-5">
            <FormControl>
              <div className="relative">
                <FloatingInputLabel
                  type={show ? "text" : "password"}
                  label="Password"
                  className="pr-10"
                  autoComplete="new-password"
                  error={!!fieldState.error}
                  {...field}
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
