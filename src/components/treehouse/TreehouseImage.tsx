import Image from "next/image";

type TreehouseImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  compact?: boolean;
  priority?: boolean;
};

export function TreehouseImage({ src, alt, caption, width, height, compact = false, priority = false }: TreehouseImageProps) {
  return (
    <figure className="overflow-hidden bg-stone">
      <Image
        alt={alt}
        className={`w-full object-cover ${compact ? "aspect-[4/3]" : "aspect-[16/9]"}`}
        height={height}
        priority={priority}
        sizes={compact ? "(min-width: 1024px) 38vw, 100vw" : "(min-width: 1024px) 72rem, 100vw"}
        src={src}
        width={width}
      />
      {caption && <figcaption className="border-x border-b border-forest/10 px-4 py-3 text-sm leading-6 text-slate-600">{caption}</figcaption>}
    </figure>
  );
}
