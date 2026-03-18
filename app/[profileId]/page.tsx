import ProfilePageSection from "@/components/page/sections/profile-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";

export default function ProfilePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate userId={"@jubril1234"} />
      <ProfilePageSection profileId="Jubril" />
      <TrendingSideBar />
    </main>
  );
}
