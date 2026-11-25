import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "htosybxj",
  api_key: process.env.CLOUDINARY_API_KEY || "319295121282518",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Pbb0q6WG-Lf1pFfdM5dPkPmApv4",
  secure: true,
});

export { cloudinary };

/**
 * Upload an image (buffer, base64 or remote URL) to Cloudinary.
 * Automatically applies auto-format, quality optimization, and optional folder categorization.
 */
export async function uploadImageToCloudinary(
  file: string,
  options?: {
    folder?: string;
    publicId?: string;
    tags?: string[];
  }
) {
  const result = await cloudinary.uploader.upload(file, {
    folder: options?.folder ?? "vp-nur",
    public_id: options?.publicId,
    tags: options?.tags,
    resource_type: "auto",
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}

/**
 * Generate an auto-optimized, auto-formatted Cloudinary CDN URL for an image.
 */
export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  options?: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "limit" | "thumb" | "auto";
  }
) {
  // If already a full non-cloudinary URL, return as-is
  if (publicIdOrUrl.startsWith("http") && !publicIdOrUrl.includes("cloudinary.com")) {
    return publicIdOrUrl;
  }

  return cloudinary.url(publicIdOrUrl, {
    fetch_format: "auto",
    quality: "auto",
    width: options?.width,
    height: options?.height,
    crop: options?.crop ?? "auto",
    secure: true,
  });
}
