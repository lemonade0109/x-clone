import { fullSignUpSchema } from "@/lib/validators";
import z from "zod";

export type Step = 1 | 2 | 3 | 4 | 5;

export type SignUpData = {
  name: string;
  email: string;
  dob_month: string;
  dob_day: string;
  dob_year: string;
  verification_code: string;
  password: string;
  username?: string;
};

export type FullSignUpSchema = z.infer<typeof fullSignUpSchema>;

export type TooltipContainerProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  disabled?: boolean;
};
