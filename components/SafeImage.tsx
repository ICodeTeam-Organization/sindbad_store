"use client"; 
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "src" | "width" | "height"> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  className?: string;
}

import { useState } from "react";

const SafeImage = ({
  src,
  fallbackSrc = "/images/Image_not_available.png",
  alt, 
  blurDataURL,
  className,
  ...rest
}: SafeImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isExternal = src?.startsWith("http") || src?.startsWith("https");
  const validSrc = isExternal ? src : fallbackSrc;

  return (
    <Image
      src={validSrc}
      alt={alt} 
      className={cn(
        className,
        "transition duration-1000",
        isImageLoaded ? "opacity-100" : "opacity-0"
      )}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      unoptimized // تعطيل تحسين الصور لو مشاكل optimization مع السيرفر الخارجي
      priority={false} // عشان ما يشغل التحميل الأجبارية (حسب حاجتك)
      onError={(e) => {
        e.currentTarget.src = fallbackSrc;
        setIsImageLoaded(true);
      }}
      onLoad={() => setIsImageLoaded(true)} 
      {...rest}
    />
  );
};

export default SafeImage;
