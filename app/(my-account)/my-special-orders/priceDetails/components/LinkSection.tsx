"use client"
import Link from 'next/link'
import React from 'react'
import { FaCopy } from 'react-icons/fa'
import { toast } from 'sonner'

function LinkSection({linkUrl}:{linkUrl:string}) {
  return (
    <div className="font-bold ">
                {" "}
                <div className="flex items-center justify-between mb-2" >
                  {" "}
                  <span>رابط المنتج</span>
                  {linkUrl && <FaCopy onClick={()=>{
                    navigator.clipboard.writeText(linkUrl)
                    toast("تم نسخ الرابط")
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