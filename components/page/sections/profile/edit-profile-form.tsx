"use client";

import { updateProfileAction } from "@/lib/actions/user/update-profile-action";
import { EditProfileFormData } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import FloatingInputLabel from "@/components/shared/floating-input-label";

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
    <div className="flex flex-col bg-black text-white">
      {/* Top bar: sticky  */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-800 bg-black/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-zinc-800"
          >
            <IoCloseSharp className="h-5 w-5 text-white" />
          </button>
          <h2 className="text-xl font-bold">Edit profile</h2>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={isPending || !name.trim()}
          className="rounded-full bg-white px-5 py-1.5 text-sm font-bold text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>

      {/*  Cover photo  */}
      <div className="relative h-52 w-full bg-zinc-800">
        {coverImage && (
          <Image src={coverImage} alt="Cover" fill className="object-cover" />
        )}

        {/* Cover overlay icons */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50">
          <label
            htmlFor="coverImageInput"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/40 transition"
            title="Change cover photo"
          >
            <MdOutlineAddAPhoto className="h-5 w-5" />
          </label>

          {coverImage && (
            <button
              type="button"
              onClick={() => setCoverImage("")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/40 transition"
              title="Remove cover photo"
            >
              <IoCloseSharp className="h-5 w-5" />
            </button>
          )}
        </div>

        <input
          id="coverImageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setCoverImage(URL.createObjectURL(file));
          }}
        />
      </div>

      {/*  Avatar  */}
      <div className="relative ml-4 -mt-14 h-28 w-28">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-black">
          <Image
            src={image || "/default-avatar.png"}
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>

        <label
          htmlFor="avatarInput"
          className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
          title="Change avatar"
        >
          <MdOutlineAddAPhoto className="h-6 w-6 text-white" />
        </label>

        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(URL.createObjectURL(file));
          }}
        />
      </div>

      {/* Fields */}
      <div className="mt-6 space-y-5 px-4 pb-6">
        {/* Name */}
        <FloatingInputLabel
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id={"Name"}
        />

        {/* Bio */}
        <div className="relative rounded-md border border-zinc-700 focus-within:border-[#1d9bf0] transition-colors">
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder=" "
            rows={3}
            maxLength={160}
            className="peer w-full resize-none bg-transparent px-3 pb-3 pt-7 text-[15px] text-white outline-none"
          />
          <label
            htmlFor="bio"
            className="pointer-events-none absolute left-3 text-zinc-500 transition-all
            top-2 text-sm
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px]
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#1d9bf0]"
          >
            Bio
          </label>
          <span className="absolute bottom-2 right-3 text-xs text-zinc-500">
            {bio.length} / 160
          </span>
        </div>

        {/* Location */}
        <FloatingInputLabel
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className=""
        />

        {/* Website */}
        <FloatingInputLabel
          label="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditProfileForm;
