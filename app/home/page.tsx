import HomeSection from "@/components/page/sections/home-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { unstable_noStore as noStore } from "next/cache";
import OnboardingModal from "@/components/auth/multistep-signup-modal/onboarding-modal";
import { getProfileAction } from "@/lib/actions/profile/get-profile";

export default async function Homepage() {
  noStore();
  const session = await auth();

  let showOnboarding = false;
  let initialUsername: string | null = null;
  let initialImage: string | null = null;

  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        onboardingCompleted: true,
        username: true,
        image: true,
      },
    });

    showOnboarding = !user?.onboardingCompleted;
    initialUsername = user?.username ?? null;
    initialImage = user?.image ?? null;
  }

  const userProfile = await getProfileAction();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate
        name={userProfile?.name ?? ""}
        email={userProfile?.email ?? ""}
        username={userProfile?.username ?? ""}
        image={userProfile?.image ?? ""}
      />

      <HomeSection userImage={userProfile?.image ?? ""} />

      <TrendingSideBar />

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
