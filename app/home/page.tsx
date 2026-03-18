import HomeSection from "@/components/page/sections/home-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { unstable_noStore as noStore } from "next/cache";
import OnboardingModal from "@/components/auth/multistep-signup-modal/onboarding-modal";

const posts = [
  {
    id: 1,
    name: "OpenAI",
    handle: "@OpenAI",
    time: "2h",
    text: "Building fast means shipping, learning, and iterating. What are you building this week?",
    stats: { replies: "128", reposts: "320", likes: "2.1K", views: "91K" },
    verified: true,
  },
  {
    id: 2,
    name: "Frontend Weekly",
    handle: "@FrontendDaily",
    time: "5h",
    text: "Small UX details scale: spacing rhythm, readable type, and clear interaction states.",
    stats: { replies: "42", reposts: "76", likes: "909", views: "37K" },
    verified: false,
  },
  {
    id: 3,
    name: "Next.js",
    handle: "@nextjs",
    time: "8h",
    text: "App Router keeps getting better. Streaming + Server Components can simplify your app architecture.",
    stats: { replies: "67", reposts: "190", likes: "1.6K", views: "63K" },
    verified: true,
  },
];

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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate userId={"@jubril1234"} />

      <HomeSection posts={posts} />

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
