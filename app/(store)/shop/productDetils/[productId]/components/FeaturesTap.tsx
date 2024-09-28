import React from "react";
import { ProductFeature } from "../types";
import ProductFeaturesTable from "./FeaturesTable";

const ProductFeaturesTap = () => {
  const features: ProductFeature[] = [
    { label: "العلامة التجارية", value: "آبل" },
    { label: "اللون", value: "رصاصي" },
    { label: "تقنية الاتصال", value: "Wireless" },
    { label: "اسم الطراز", value: "MWP222P/A" },
    { label: "الأبعاد", value: "160.8 ملم * 78.1 * 7.7 ملم جرام" },
    { label: "الشريحة", value: "يدعم الهاتف شريحتين" },
    { label: "المادة", value: "الزجاج" },
    { label: "الوزن", value: "0.45 أوقية" },
  ];
  return <ProductFeaturesTable features={features} />;
};

export default ProductFeaturesTap;
