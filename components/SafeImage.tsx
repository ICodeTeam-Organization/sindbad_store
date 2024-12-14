'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'width' | 'height'> {
  src: string; // رابط الصورة الأساسي
  fallbackSrc?: string; // رابط الصورة الافتراضية (اختياري)
  alt: string; 
  width?: number; 
  height?: number; 
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = '/images/sedebadLogo.svg', // القيمة الافتراضية
  alt = 'صورة', 
  width,
  height,
  ...rest // أخذ باقي الخصائص مثل className، priority وغيرها
}) => {
  const [validSrc, setValidSrc] = useState<string>(fallbackSrc);

  useEffect(() => {
    const validateImage = async () => {
      try {
        const response = await fetch(src);
        if (response.ok) {
          setValidSrc(src); // تعيين الصورة الأصلية إذا كانت صالحة
        } else {
          setValidSrc(fallbackSrc); // تعيين الصورة الافتراضية إذا فشل التحقق
        }
      } catch {
        setValidSrc(fallbackSrc); // تعيين الصورة الافتراضية عند حدوث خطأ
      }
    };

    validateImage();
  }, [src, fallbackSrc]);

  return (
    <Image
      src={validSrc}
      alt={alt}
      width={width} // سيتم تمريرها فقط إذا كانت موجودة
      height={height} // سيتم تمريرها فقط إذا كانت موجودة
      {...rest} // تمرير باقي الخصائص هنا
    />
  );
};

export default SafeImage;
