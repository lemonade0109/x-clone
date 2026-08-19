import HomeSection from "@/components/page/sections/home-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import OnboardingModal from "@/components/auth/multistep-signup-modal/onboarding-modal";
import { getCurrentUserAction } from "@/lib/actions/user/get-current-user-action";

export default async function Homepage() {
  const user = await getCurrentUserAction();

  const showOnboarding = !!user && !user.onboardingCompleted;
  const initialUsername = user?.username ?? null;
  const initialImage = user?.image ?? null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl">
      <NavLayoutTemplate
        name={user?.name ?? ""}
        email={user?.email ?? ""}
        username={user?.username ?? ""}
        profileImage={user?.image ?? null}
      />

      <HomeSection
        userImage={user?.image ?? ""}
        currentUserId={user?.id ?? null}
      />

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
