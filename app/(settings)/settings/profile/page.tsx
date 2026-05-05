import EditProfileForm from "@/components/page/sections/profile/edit-profile-form";
import { db } from "@/db/db";
import { validateUserSession } from "@/lib/actions/auth/validate-user-session";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditProfilePage() {
  const validUser = await validateUserSession();

  if (!validUser.success || !validUser.user?.email) {
    redirect("/home");
  }

  const user = await db.user.findUnique({
    where: { email: validUser.user?.email },
    select: {
      name: true,
      username: true,
      bio: true,
      website: true,
      location: true,
      image: true,
      coverImage: true,
    },
  });

  if (!user || !user.username) redirect("/home");

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit profile</h1>

      <EditProfileForm
        initialData={{
          name: user.name ?? "",
          username: user.username ?? "",
          bio: user.bio ?? "",
          website: user.website ?? "",
          location: user.location ?? "",
          image: user.image ?? "",
          coverImage: user.coverImage ?? "",
        }}
      />
    </main>
  );
}
