import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Product } from '@/types/pruductDetails';
import ProductFeaturesTable from './features-table';
import ProductReviewsTap from './reviews-tap';

type  Props = {
  product: Product;
  productId: string | number;
};

function ProductDetailsAccordingmenus({product,productId}:Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>تفاصيل ومميزات المنتج </AccordionTrigger>
        <AccordionContent>
          {product?.attributesWithValues.length == 0 ? <div> <p> لاتوجد تفاصيل اخرى</p> </div> : <ProductFeaturesTable features={product?.attributesWithValues} />}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>التقييمات و المراجعات</AccordionTrigger>
        <AccordionContent>
        <ProductReviewsTap productId={productId} product={product} />
        </AccordionContent>
      </AccordionItem>
      {/* <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  )
}

export default ProductDetailsAccordingmenus