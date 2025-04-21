import {
    AlertDialog, 
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  
  interface AlertProps {
    open: boolean
    onClose: (open: boolean) => void
  }
  
  export function Alert({ open, onClose }: AlertProps) {
    return (
      <AlertDialog open={open} onOpenChange={onClose}   >
        <AlertDialogContent dir="rtl" className="sm:max-w-[425px]" >
          <AlertDialogHeader>
            <AlertDialogTitle  dir="rtl" className="text-center text-[30px]" > ⚠️ </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-black text-[16px] my-10" >
              {`عذرا، لا يمكننا جلب الطلبات من هذا الموقع في الوقت الحالي. `}
              {`سيتم إضافة هذي المناطق قريبا`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onClose(false)}>اغلاق</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  