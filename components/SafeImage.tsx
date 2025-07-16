// "use client";

// import { useEffect, useState } from "react";
// import Image, { ImageProps } from "next/image";
// import { BlurhashCanvas } from "react-blurhash"; // 👈 استيراد مكون Blurhash
// import { cn } from "@/lib/utils";

// interface SafeImageProps extends Omit<ImageProps, "src" | "width" | "height"> {
//   src: string;
//   fallbackSrc?: string;
//   alt: string;
//   width?: number;
//   height?: number;
//   objectFit?: string;
//   blurHash?: string; // 👈 إضافة prop جديدة لدعم blurhash
// }

// const SafeImage: React.FC<SafeImageProps> = ({
//   src,
//   fallbackSrc = "/images/sedebadLogo.svg",
//   alt = "صورة",
//   width,
//   height,
//   objectFit,
//   blurHash, // 👈 التقاط blurHash من props
//   ...rest
// }) => {
//   const pathOfNoImg = "/images/Image_not_available.png";
//   const [validSrc, setValidSrc] = useState<string>(fallbackSrc);
//   const [isImageLoaded, setIsImageLoaded] = useState(false); // 👈 حالة لتتبع تحميل الصورة

//   useEffect(() => {
//     checkImage(src);
//   }, [src]);

//   const checkImage = (src: string) => {
//     if (!src?.startsWith("https") && !src?.startsWith("http")) {
//       // 👆 تم تعديل الشرط ليعمل بشكل صحيح
//       setValidSrc(pathOfNoImg);
//       return;
//     }
//     setValidSrc(src);
//   };

//   return (
//     <>
//       {/* 👇 عرض BlurHash كخلفية مؤقتة إذا كانت موجودة والصورة لم تُحمّل بعد */}
//       {blurHash && !isImageLoaded && (
//         <BlurhashCanvas
//           hash={blurHash}
//           width={width || undefined}
//           height={height || undefined}
//           punch={1}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: width ? `${width}px` : "100%",
//             height: height ? `${height}px` : "100%",
//             zIndex: 1,
//           }}
//         />
//       )}

//       {/* 👇 الصورة الأساسية */}
//       <Image
//         src={validSrc}
//         loader={() => validSrc}
//         blurDataURL=""
//         objectFit={objectFit}
//         alt={alt}
//         onError={() => {
//           setValidSrc(pathOfNoImg);
//           setTimeout(() => {
//             setIsImageLoaded(true);
//           }, 500);
//         }}
//         onLoadingComplete={() => {
//             setTimeout(() => {
//              setIsImageLoaded(true);
//           }, 500);
//         }} // 👈 عند إكمال تحميل الصورة، نخفي الـ BlurHash
//         width={width}
//         height={height}
//         {...rest}
//         className={cn(
//           rest.className,
//           "transition duration-1000",
//           isImageLoaded ? "opacity-100" : "opacity-0"
//         )}
//       />
//     </>
//   );
// };

// export default SafeImage;

"use client"; 
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "src" | "width" | "height"> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  className?: string;
}

import { useState } from "react";

const SafeImage = ({
  src,
  fallbackSrc = "/images/Image_not_available.png",
  alt,
  width,
  height,
  blurDataURL,
  className,
  fill,
  ...rest
}: SafeImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isExternal = src?.startsWith("http") || src?.startsWith("https");
  const validSrc = isExternal ? src : fallbackSrc;

  return (
    <Image
      src={validSrc}
      alt={alt}
      width={width}
      height={height}
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
      onLoadingComplete={() => setIsImageLoaded(true)}
      fill={fill}
      {...rest}
    />
  );
};

export default SafeImage;
