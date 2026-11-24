import Image from "next/image";

export function BackgroundWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center overflow-hidden select-none"
    >
      <div className="flex h-full w-full items-center justify-center opacity-[0.05] mix-blend-multiply transition-opacity duration-300 sm:opacity-[0.065]">
        <Image
          src="/images/bangladesh-watermark.png"
          alt=""
          width={1100}
          height={1280}
          priority={false}
          className="h-auto max-h-[95vh] w-auto max-w-[95vw] scale-110 sm:scale-115 md:scale-120 object-contain"
        />
      </div>
    </div>
  );
}
