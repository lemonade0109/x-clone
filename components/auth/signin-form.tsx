import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const SignInForm: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-4 flex flex-col gap-4 p-4">
      <Button
        variant="outline"
        className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100"
        asChild
      >
        <Link href="#" className="w-full text-center text-xl">
          O-Auth Google TODO
        </Link>
      </Button>

      <Button
        variant="outline"
        className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100"
        asChild
      >
        <Link href="#" className="w-full text-center text-xl">
          O-Auth Apple TODO
        </Link>
      </Button>

      <div className="flex items-center">
        <div className="border border-gray-100 flex-1" />
        <span className="mx-2 text-lg">OR</span>
        <div className="border border-gray-100 flex-1" />
      </div>

      <form className="">
        <input
          type="email"
          placeholder="Phone, email, or username"
          className="w-full rounded-md border border-gray-300 px-4 py-6 text-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </form>

      <div className="flex flex-col gap-8 mt-4">
        <Button className=" rounded-full bg-black py-6 text-lg font-semibold text-white hover:bg-gray-800 hover:text-white">
          Next
        </Button>

        <Button
          variant="outline"
          className="w-full border border-gray-300 rounded-full text-lg py-6 hover:bg-gray-100"
        >
          Forgot password?
        </Button>
      </div>

      <p className="text-xl text-gray-500 text-start mt-4">
        Don't have an account?{" "}
        <Link href="/i/flow/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
