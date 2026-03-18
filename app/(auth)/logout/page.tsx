import { auth } from "@/auth";
import { logOutAction } from "@/lib/actions/auth/logout-action/logout-action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignOutPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  async function handleLogout() {
    "use server";
    await logOutAction();
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-black/55 p-4">
      <section className="w-full max-w-90 rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-5 flex justify-center">
          <Image
            alt="x image"
            src="/image.jpg"
            width={48}
            height={48}
            className="object-contain mx-auto"
          />
        </div>

        <h1 className="text-start text-2xl font-bold">Log out of X?</h1>

        <p className="my-3 text-md leading-5 text-zinc-500">
          You can always log back in at any time. If you just want to switch
          accounts, you can do that by adding an existing account.
        </p>

        <form action={handleLogout} className="mt-7">
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-black text-[13px] font-bold text-white transition hover:bg-zinc-800"
          >
            Log Out
          </button>
        </form>

        <Link
          href="/home"
          className="mt-3 grid h-11 w-full place-items-center rounded-full border border-zinc-300 text-[13px] font-bold text-black transition hover:bg-zinc-100"
        >
          Cancel
        </Link>
      </section>
    </main>
  );
}
