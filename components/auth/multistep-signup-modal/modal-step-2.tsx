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

const ModelStep2Verification: React.FC<Props> = ({ form, email }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Enter it below to verify <span className="font-medium">{email}.</span>
      </p>

      <FormField
        control={form.control}
        name="verification_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Verification code</FormLabel>
            <FormControl>
              <Input
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
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

export default ModelStep2Verification;
