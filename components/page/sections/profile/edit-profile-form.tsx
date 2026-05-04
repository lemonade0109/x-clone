"use client";

import FloatingInputLabel from "@/components/shared/floating-input-label";
import { updateProfileAction } from "@/lib/actions/user/update-profile-action";
import { EditProfileFormData } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const EditProfileForm: React.FC<{ initialData: EditProfileFormData }> = ({
  initialData,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const [name, setName] = React.useState(initialData.name);
  const [username, setUsername] = React.useState(initialData.username);
  const [bio, setBio] = React.useState(initialData.bio || "");
  const [website, setWebsite] = React.useState(initialData.website || "");
  const [location, setLocation] = React.useState(initialData.location || "");
  const [image, setImage] = React.useState(initialData.image || "");
  const [coverImage, setCoverImage] = React.useState(
    initialData.coverImage || "",
  );

  const onSave = () => {
    startTransition(async () => {
      const res = await updateProfileAction({
        name,
        username,
        bio,
        website,
        location,
        image,
        coverImage,
      });

      if (!res.success) {
        toast.error(res.toast?.message || "Failed to update profile.");
        return;
      }

      toast.success(res.toast?.message || "Profile updated successfully.");
      router.back();
      router.refresh();
    });
  };
  return (
    <div className="space-y-4 py-2">
      <FloatingInputLabel
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FloatingInputLabel
        label="Username"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Field label="Bio">
        <textarea
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="peer h-32 w-full rounded-md border bg-transparent px-4 pt-6 pb-2 text-[15px] leading-6 text-black outline-none transition-all border-zinc-300 focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20"
        />
      </Field>

      <FloatingInputLabel
        label="Website"
        value={website || ""}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <FloatingInputLabel
        label="Location"
        value={location || ""}
        onChange={(e) => setLocation(e.target.value)}
      />

      <FloatingInputLabel
        label="Profile Image URL"
        value={image || ""}
        onChange={(e) => setImage(e.target.value)}
      />

      <FloatingInputLabel
        label="Cover Image URL"
        value={coverImage || ""}
        onChange={(e) => setCoverImage(e.target.value)}
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={onSave}
          disabled={isPending}
          className="rounded-md bg-black text-white hover:bg-gray-500 dark:bg-white px-4 py-2 dark:text-black dark:hover:bg-gray-200 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
    // <div className="space-y-4 py-2">
    //   <Field label="Name">
    //     <input
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="Name"
    //       className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    //     />
    //   </Field>

    //   <Field label="Username">
    //     <input
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       placeholder="Username"
    //       className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    //     />
    //   </Field>

    //   <Field label="Bio">
    //     <textarea
    //       value={bio || ""}
    //       onChange={(e) => setBio(e.target.value)}
    //       placeholder="Bio"
    //       className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    //     />
    //   </Field>

    //   <Field label="Website">
    //     <input
    //       value={website || ""}
    //       onChange={(e) => setWebsite(e.target.value)}
    //       placeholder="Website"
    //       className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    //     />
    //   </Field>
    // </div>
  );
};

export default EditProfileForm;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-zinc-50">{label}</label>
      {children}
    </div>
  );
}
