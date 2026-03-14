//Verification Modal
import FloatingInputLabel from "@/components/shared/floating-input-label";
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
        render={({ field, fieldState }) => (
          <FormItem className="mb-56 mt-5">
            <FormControl>
              <FloatingInputLabel
                type="text"
                inputMode="numeric"
                maxLength={6}
                label="Verification code"
                className="text-center tracking-[0.25em]"
                error={!!fieldState.error}
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
