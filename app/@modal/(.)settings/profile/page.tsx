import EditProfileForm from "@/components/page/sections/profile/edit-profile-form";
import EditProfileModalShell from "@/components/page/sections/profile/edit-profile-modal-shell";
import { db } from "@/db/db";
import { validateUserSession } from "@/lib/actions/auth/validate-user-session";
import { redirect } from "next/navigation";
import React from "react";

export default async function InterceptedEditProfilePage() {
  const validUser = await validateUserSession();

  if (!validUser.success) {
    return {
      success: false,
      error: validUser.error,
      message:
        "Unauthorized. Please log in to access the profile editing page.",
    };
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
    <EditProfileModalShell>
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
    </EditProfileModalShell>
  );
}
