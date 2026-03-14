//Name, DOB Modal
"use client";
import FloatingInputLabel from "@/components/shared/floating-input-label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignUpData } from "@/types";
import React from "react";
import type { UseFormReturn } from "react-hook-form";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

type Props = {
  form: UseFormReturn<SignUpData>;
};

const ModalStep1: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col gap-5">
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className="x-label">Name</FormLabel>
            <FormControl>
              <FloatingInputLabel
                label="Name"
                maxLength={50}
                error={!!fieldState.error}
                {...field}
              />
            </FormControl>

            <div className="flex justify-end text-xs text-muted-foreground">
              {field.value?.length ?? 0}/50
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className="x-label">Email</FormLabel>
            <FormControl>
              <FloatingInputLabel
                type="email"
                label="Email"
                maxLength={64}
                error={!!fieldState.error}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="pt-6">
        <p className="text-xl font-semibold">Date of birth</p>
        <p className="mt-1 text-lg text-gray-500">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="dob_month"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="x-label">Month</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="x-field">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1)}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob_day"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="x-label">Day</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="x-field">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="x-label">Year</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="x-field">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ModalStep1;
