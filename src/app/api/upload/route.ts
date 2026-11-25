import { NextResponse } from "next/server";
import { uploadImageToCloudinary, getOptimizedImageUrl } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      const folder = (formData.get("folder") as string) || "vp-nur/uploads";

      if (!file || !(file instanceof File)) {
        return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResult = await uploadImageToCloudinary(base64Data, { folder });

      return NextResponse.json({
        ok: true,
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        optimizedUrl: getOptimizedImageUrl(uploadResult.publicId),
      });
    }

    const body = await request.json();
    const { url, folder = "vp-nur/uploads", publicId } = body;

    if (!url) {
      return NextResponse.json({ ok: false, error: "Missing image url or data" }, { status: 400 });
    }

    const uploadResult = await uploadImageToCloudinary(url, { folder, publicId });

    return NextResponse.json({
      ok: true,
      url: uploadResult.url,
      publicId: uploadResult.publicId,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      optimizedUrl: getOptimizedImageUrl(uploadResult.publicId),
    });
  } catch (error) {
    console.error("[api/upload] Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
