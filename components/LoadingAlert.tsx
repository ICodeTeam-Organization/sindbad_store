import React from "react"
import { Dialog, DialogPortal, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface LoadingAlertProps {
  open: boolean
  placeholder?: string
}

const LoadingAlert: React.FC<LoadingAlertProps> = ({
  open,
  placeholder = "جارٍ التحميل...",
}) => {
  return (
    <Dialog open={open} >
      <DialogPortal >
        <DialogContent
          className="w-auto bg-white border-0  p-6 rounded-xl shadow-xl z-50 flex flex-col items-center gap-4 text-center [&>button]:hidden"
        >
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
          <p className="text-sm text-muted-foreground">{placeholder}</p>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default LoadingAlert
