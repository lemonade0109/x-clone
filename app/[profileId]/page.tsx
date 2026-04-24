import ProfilePageSection from "@/components/page/sections/profile-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { getProfileAction } from "@/lib/actions/user/get-profile";

export default async function ProfilePage() {
  const userData = await getProfileAction();
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate
        username={userData?.username ?? ""}
        name={userData?.name ?? ""}
        profileImage={userData?.image ?? ""}
      />
      <ProfilePageSection profileId="Jubril" />
      <TrendingSideBar />
    </main>
  );
}
