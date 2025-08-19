// components/ZoomImage.tsx
"use client";
import Image from "next/image";
import React, { useState, ComponentProps } from "react";

// يرث كل خصائص مكون Image + نضيف className (لأنها اختيارية في بعض الإصدارات)
type ZoomImageProps = ComponentProps<typeof Image> & {
  className?: string;
};

const ZoomImage: React.FC<ZoomImageProps> = ({
  className,
  ...imageProps
}) => {
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 120;
    const y = ((e.clientY - top) / height) * 120;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`overflow-hidden relative ${className || ""}`}
      style={{ width: imageProps.fill ? "100%" : imageProps.width, height: imageProps.fill ? "100%" : imageProps.height }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transition: "transform 0.3s ease",
          transformOrigin: transformOrigin,
          transform: isHovering ? "scale(1.5)" : "scale(1)",
        }}
      >
        <Image
          style={{ 
            ...imageProps.style, // نضمن عدم حذف أي ستايل خارجي
          }}
          {...imageProps}
        />
      </div>
    </div>
  );
};

export default ZoomImage;
