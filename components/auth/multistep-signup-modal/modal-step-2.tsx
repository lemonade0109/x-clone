//Verification Modal
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpData } from "@/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<SignUpData>;
  email: string;
};

const ModalStep2Verification: React.FC<Props> = ({ form, email }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Enter it below to verify <span className="font-medium">{email}.</span>
      </p>

      <FormField
        control={form.control}
        name="verification_code"
        render={({ field }) => (
          <FormItem className="mb-56 mt-5">
            <FormControl>
              <input
                type="text"
                maxLength={6}
                placeholder="Verification code"
                className="w-full rounded-md border border-gray-300 px-4 py-6 text-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ModalStep2Verification;
