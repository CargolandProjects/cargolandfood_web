import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import apiClient from "./api/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateWComma(date: Date | string, wComma: boolean = true) {
  return ` ${format(date, "d MMM")}${wComma ? "," : ""} ${format(
    date,
    "yyyy"
  )}`;
}

export function formatPrettyDate(date: Date | string) {
  return `${format(date, "EEEE")}, ${format(date, "do")} ${format(
    date,
    "MMMM, h:mm a"
  )}`;
}

export function formatDMY(date: Date | string) {
  return `${format(date, "dd/mm/yyyy")}`;
}

export function formatTime(date: Date | string) {
  return format(date, "h:mm a");
}

export function fallbackImg(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackSrc: string
) {
  const img = e.currentTarget;

  // prevent infinite loop if fallback also fails
  // img.onerror = null;

  // The dataset guard is stronger because it survives React re-renders.
  if (img.dataset.fallbackApplied === "true") return;

  img.dataset.fallbackApplied = "true";
  img.src = fallbackSrc;
}

export const getCategoryPath = (categoryId: string) => {
  switch (categoryId) {
    case "Restaurant":
      return "restaurants";
    case "Groceries":
      return "groceries";
    case "Markets":
      return "markets";

    default:
      return null;
  }
};

/**
 * Cloudinary Image Upload Configuration
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
export async function uploadImageToCloudinary(file: File): Promise<string> {
  // Validate environment variables
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary configuration is missing. Please check environment variables."
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image size must be less than 5MB");
  }

  // Validate file format
  if (!ALLOWED_IMAGE_FORMATS.includes(file.type)) {
    throw new Error("Invalid image format. Please use JPG, PNG, WEBP, or GIF");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

  try {
    const res = await apiClient.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    // Axios automatically handles non-2xx responses as errors
    return res.data.secure_url; // Returns the Cloudinary URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Handle other errors
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Image upload failed. Please try again");
  }
}
