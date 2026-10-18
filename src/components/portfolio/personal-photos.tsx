import Image from "next/image";
import type {
  ContentImage,
  PersonalPhoto as PersonalPhotoEntry,
} from "@/types/content";
import { validImage } from "@/lib/public-files";

export function PersonalPhoto({
  image,
  portrait = false,
}: {
  image: ContentImage;
  portrait?: boolean;
}) {
  return (
    <figure>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 45vw, 480px"
        preload={portrait}
        className="h-auto w-full rounded-2xl"
      />
      {image.caption?.trim() && (
        <figcaption className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function LittleMoments({
  photos,
}: {
  photos: readonly PersonalPhotoEntry[];
}) {
  const images = photos
    .filter((photo) => validImage(photo) && Number.isFinite(photo.order))
    .toSorted((a, b) => a.order - b.order);
  if (!images.length) return null;
  return (
    <section className="mt-20 sm:mt-28" aria-labelledby="moments-heading">
      <h2 id="moments-heading" className="section-title text-editorial">
        <span className="decoration-butter decoration-8 underline underline-offset-4 dark:decoration-gold/40">
          Little moments.
        </span>
      </h2>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {images.map((image, index) => (
          <div key={image.src} className={index % 2 ? "md:mt-16" : ""}>
            <PersonalPhoto image={image} />
          </div>
        ))}
      </div>
    </section>
  );
}
