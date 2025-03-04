"use client"
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import React from 'react'
import { FaCopy } from 'react-icons/fa'

function LinkSection({linkUrl}:{linkUrl:string}) {
  return (
    <div className="font-bold ">
                {" "}
                <div className="flex items-center justify-between mb-2" >
                  {" "}
                  <span>رابط المنتج</span>
                  {linkUrl && <FaCopy onClick={()=>{
                    navigator.clipboard.writeText(linkUrl)
                    toast({
                      variant: "default",
                      description: "تم نسخ الرابط بنجاح", 
                    });
                  }} className="text-primary-background cursor-pointer text-lg" />}
                </div>
                {linkUrl ? (
                  <Link
                    href={linkUrl}
                    target="_blank"
                    className="font-normal line-clamp-2 text-left  text-blue-600 underline"
                  >
                    {" "}
                    {linkUrl}{" "}
                  </Link>
                ) : (
                  <span className="font-normal"> لا يوجد رابط</span>
                )}{" "}
              </div>
  )
}

export default LinkSection