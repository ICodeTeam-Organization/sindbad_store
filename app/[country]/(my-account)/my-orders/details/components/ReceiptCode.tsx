"use client"
import { Copy, Check } from 'lucide-react'
import React, { useState } from 'react'

function ReceiptCode({ receiptCode }: { receiptCode: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(receiptCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <div className="flex justify-between mdHalf:justify-start">
      <p className="text-gray-600">كود الاستلام</p>
      <button
        onClick={handleCopy}
        className="pr-3 font-bold text-primary-background cursor-pointer flex items-center justify-center gap-x-2"
      >
        <span>{receiptCode}</span>
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  )
}

export default ReceiptCode
