"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface PropsType {
  image: string;
  alt: string;
  className: string;
  onClick: () => void;
}

export default function CustomImage({
  alt,
  className,
  image,
  onClick,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      src={image}
      alt={alt}
      className={cn(
        "object-cover duration-700 ease-in-out",
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0",
        className
      )}
      fill
      style={{ objectFit: "cover" }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onLoad={() => setIsLoading(false)}
      onClick={onClick}
    />
  );
}
