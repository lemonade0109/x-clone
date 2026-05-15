import { Inter, Geist_Mono } from "next/font/google";
import "../globals.css";
import { auth } from "@/auth";
import { db } from "@/db/db";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { Suspense } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  let user = null;
  if (session?.user?.email) {
    user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
      },
    });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl">
      {user && (
        <NavLayoutTemplate
          name={user.name ?? ""}
          email={user.email ?? ""}
          username={user.username ?? ""}
          profileImage={user.image ?? ""}
        />
      )}

      {children}

      {user && (
        <Suspense fallback={null}>
          <TrendingSideBar />
        </Suspense>
      )}
    </main>
  );
}
