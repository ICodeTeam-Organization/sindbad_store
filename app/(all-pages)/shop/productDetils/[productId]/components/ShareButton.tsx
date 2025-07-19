"use client";

import { cn } from "@/lib/utils";
import { Share } from "lucide-react";
import React from "react"; 

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
        "bg-white p-3 rounded shadow-sm   mt-0 cursor-pointer  group"
      )}
    >
      <Share
        className={cn(
          " text-2xl text-gray-600 duration-300  backdrop:"
        )}
      />
    </div>
  );
}

export default ShareButton;
