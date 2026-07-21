import { ImageOff, Leaf } from "lucide-react";

export function MediaPlaceholder({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative isolate flex overflow-hidden border border-forest/10 bg-[#dce5dc] ${compact ? "min-h-52" : "aspect-[16/9] min-h-64"}`}
      role="img"
      aria-label="Original Midwest Roots jobsite photograph pending owner approval"
    >
      <span className="absolute -right-16 -top-24 size-80 rounded-full border border-forest/20" />
      <span className="absolute -right-4 -top-12 size-64 rounded-full border border-forest/20" />
      <span className="absolute right-10 top-4 size-48 rounded-full border border-forest/20" />
      <span className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-forest/15 to-transparent" />
      <div className="relative mt-auto flex w-full items-center justify-between gap-4 bg-forest/90 px-5 py-4 text-sm font-semibold text-cream-warm">
        <span className="flex items-center gap-2"><Leaf className="size-4 text-gold" /> Original Omaha jobsite image needed</span>
        <ImageOff className="size-4 shrink-0 text-link-dark" />
      </div>
    </div>
  );
}
