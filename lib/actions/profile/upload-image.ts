"use server";

import { v2 as cloudinary } from "cloudinary";
import { string } from "zod";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageAction = async (
  base64Image: string,
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "x-clone/avatars",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
      ],
    });
    return { url: result.secure_url, error: null };
  } catch (error) {
    return { url: null, error: "Failed to upload image. Please try again." };
  }
};
