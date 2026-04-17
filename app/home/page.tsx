import HomeSection from "@/components/page/sections/home-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { auth } from "@/auth";
import { db } from "@/db/db";
import OnboardingModal from "@/components/auth/multistep-signup-modal/onboarding-modal";
import { Suspense } from "react";

export default async function Homepage() {
  const session = await auth();

  const user = session?.user?.id
    ? await db.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          image: true,
          onboardingCompleted: true,
        },
      })
    : null;

  const showOnboarding = !!user && !user.onboardingCompleted;
  const initialUsername = user?.username ?? null;
  const initialImage = user?.image ?? null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl">
      <NavLayoutTemplate
        name={user?.name ?? ""}
        email={user?.email ?? ""}
        username={user?.username ?? ""}
        image={user?.image ?? ""}
      />

      <Suspense fallback={<div className="w-full p-4">Loading timeline...</div>}>
        <HomeSection
          userImage={user?.image ?? ""}
          currentUserId={user?.id ?? null}
        />
      </Suspense>

      <Suspense fallback={<div className="hidden lg:block w-[350px] p-4">Loading...</div>}>
        <TrendingSideBar />
      </Suspense>

      {showOnboarding ? (
        <OnboardingModal
          open={true}
          initialUsername={initialUsername}
          initialImage={initialImage}
        />
      ) : null}
    </main>
  );
}
