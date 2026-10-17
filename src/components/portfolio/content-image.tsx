import Image from "next/image";
import type { ContentImage } from "@/types/content";
import { validImage } from "@/lib/public-files";

export function PortfolioImage({
  image,
  cover = false,
}: {
  image?: ContentImage;
  cover?: boolean;
}) {
  const valid = validImage(image);
  if (!valid) return null;
  return (
    <figure>
      <Image
        src={valid.src}
        alt={valid.alt}
        width={valid.width}
        height={valid.height}
        sizes={
          cover
            ? "(max-width: 768px) 100vw, 960px"
            : "(max-width: 768px) 100vw, 50vw"
        }
        className={
          cover
            ? "h-auto w-full rounded-xl"
            : "aspect-[4/3] w-full rounded-xl object-cover"
        }
      />
      {valid.caption?.trim() && (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {valid.caption}
        </figcaption>
      )}
    </figure>
  );
}
