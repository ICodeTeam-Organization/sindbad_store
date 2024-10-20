"use client";

import React from 'react';
import Image from 'next/image';
import { LiaShoppingCartSolid } from 'react-icons/lia';
import { IoMdHeartEmpty } from 'react-icons/io';
import productImg from '../../../../public/images/productImg.svg';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { Loader2 } from 'lucide-react';
import { ProductCardProps } from '../types';
import AddToBasket from '@/app/(home)/components/AddToBasket';

const ShopProductsCard = ({ product }: { product: ProductCardProps }) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `https://icode-sendbad-store.runasp.net/api/Favorites/AddProductToFavorite/${product.id}`,
        {},
        {
          headers: {
            'Accept-Language': 'ar',
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'تم إضافة المنتج إلى المفضلة بنجاح',
        style: {
          backgroundColor: 'green',
        },
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || 'حدث خطأ أثناء إضافة المنتج إلى المفضلة';

      toast({
        variant: 'destructive',
        description: `خطأ: ${errorMessage}`,
        action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
      });
    },
  });

  // const { isLoading } = mutation;

  return (
    <div className="border rounded-lg shadow-sm relative max-w-[230px] mx-auto text-center cursor-pointer">
      <a href={`/shop/productDetils/${product.id}`}>
        <Image
          src={product?.mainImageUrl || productImg}
          alt={product?.name}
          className="w-full h-[210px] object-cover rounded-t-lg"
          width={500}
          height={500}
        />
        <h2 className="font-bold mt-2 text-center truncate">{product?.name}</h2>
      </a>

      <div className="m-4">
        <div className="my-3">
          {product.price ? (
            <div className="flex items-center justify-center mt-1">
              <span className="text-red-500 font-bold text-lg">
                {product.price} ر.س
              </span>
              <span className="text-gray-400 line-through text-sm mx-2">
                {product.price - 20} ر.س
              </span>
            </div>
          ) : (
            <div className="mt-1 text-lg font-bold text-red-500">
              {product.price} ر.س
            </div>
          )}
        </div>
        
          <AddToBasket id={product.id} />

        {/* <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <button className="min-w-[160px] h-[40px] border border-gray text-black text-base rounded-md flex justify-center items-center mb-2 md:mb-0">
            <LiaShoppingCartSolid className="w-4 h-4 mr-2" />
            <p>اضف للسلة</p>
          </button>
          <button
            className="min-w-[40px] h-[40px] border border-gray text-black text-base rounded-md flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation(); 
              mutation.mutate();
            }}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <IoMdHeartEmpty className="w-4 h-4" />}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ShopProductsCard;
