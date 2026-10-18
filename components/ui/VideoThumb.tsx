"use client";
import { useState } from "react";
import Image from "next/image";

type VideoThumbProps = {
  /** YouTube video id */
  id: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * YouTube thumbnail in full HD, falling back to the always-available smaller
 * version if a video has no maxres thumbnail.
 */
export default function VideoThumb({ id, alt = "", className = "", sizes = "100vw", priority }: VideoThumbProps) {
  const [fallback, setFallback] = useState(false);
  return (
    <Image
      src={`https://i.ytimg.com/vi/${id}/${fallback ? "hqdefault" : "maxresdefault"}.jpg`}
      alt={alt}
      width={fallback ? 480 : 1280}
      height={fallback ? 360 : 720}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFallback(true)}
    />
  );
}
