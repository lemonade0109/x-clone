"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadTarget = "avatars" | "posts";

export const uploadImageAction = async (
  base64Image: string,
  target: UploadTarget = "avatars",
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: target === "avatars" ? "x-clone/avatars" : "x-clone/posts",
      transformation:
        target === "avatars"
          ? [{ width: 400, height: 400, crop: "fill", gravity: "face" }]
          : [{ quality: "auto", fetch_format: "auto" }],
    });
    return { url: result.secure_url, error: null };
  } catch (error) {
    return { url: null, error: "Failed to upload image. Please try again." };
  }
};
