import HomepageLinks from "@/components/homepage-links";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-8 lg:p-10 mt-60">
        <div className="relative w-[clamp(260px,72vw,430px)] h-[clamp(220px,60vw,360px)] md:w-[clamp(320px,38vw,610px)] md:h-[clamp(280px,32vw,500px)]">
          <Image
            alt="x image"
            src="/image1.jpg"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 72vw, 38vw"
          />
        </div>
      </div>
      <div className="flex flex-col px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-40 items-start justify-start">
        <h1 className="text-7xl font-extrabold ml-12">Happening now</h1>
        <div className="">
          <h2 className="text-4xl font-extrabold mt-20 ml-12">Join today.</h2>

          <div className="w-md ml-12 mt-12 flex flex-col gap-4 p-4">
            <Button
              variant="outline"
              className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100"
              asChild
            >
              <Link href="/signup" className="w-full text-center text-xl">
                O-Auth Google TODO
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100"
              asChild
            >
              <Link href="/signup" className="w-full text-center text-xl">
                O-Auth Apple TODO
              </Link>
            </Button>

            <div className="flex items-center">
              <div className="border border-gray-100 flex-1" />
              <span className="mx-2 text-lg">OR</span>
              <div className="border border-gray-100 flex-1" />
            </div>

            <Button
              variant="outline"
              className="w-full bg-black text-white rounded-full py-6 hover:bg-gray-800"
              asChild
            >
              <Link
                href="/signup"
                className="w-full text-center text-xl font-semibold"
              >
                Create account
              </Link>
            </Button>

            <p className="text-sm text-gray-500 text-center">
              By signing up, you agree to our{" "}
              <Link href="/tos" className="text-blue-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-500">
                Privacy Policy
              </Link>
              .
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <p className="text-xl font-semibold">
                Already have an account ?{" "}
              </p>
              <Button
                variant="outline"
                className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100"
                asChild
              >
                <Link
                  href="/login"
                  className="w-full text-center text-xl font-semibold"
                >
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <HomepageLinks />
      </div>
    </div>
  );
}
