import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    username?: string; // optional so Prisma adapter types don't conflict
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
    image?: string | null;
  }
}
