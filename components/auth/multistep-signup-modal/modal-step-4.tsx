// Username Modal
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
import React from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<SignUpData>;
};

const ModalStep4Username: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        Your @username is unique and you can always change it later.
      </p>

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  @
                </span>
                <Input
                  placeholder="username"
                  className="pl-7"
                  maxLength={20}
                  {...field}
                />
              </div>
            </FormControl>
            <div className="flex justify-end text-xs text-muted-foreground">
              {field.value?.length ?? 0}/ 20
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ModalStep4Username;
