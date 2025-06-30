"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { IoShareSocialSharp } from "react-icons/io5";

function ShareButton() {
  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        // alert('Link copied to clipboard!');
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div
      onClick={handleShare}
      className={cn(
        "bg-white bg-opacity-95 p-3 cursor-pointer rounded-full shadow-sm hover:shadow-lg duration-300 border group"
      )}
    >
      <IoShareSocialSharp
        className={cn(
          " text-2xl text-gray-400 duration-300 translate-y-[1px]  backdrop:"
        )}
      />
    </div>
  );
}

export default ShareButton;
