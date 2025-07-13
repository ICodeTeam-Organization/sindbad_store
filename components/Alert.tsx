// import {
//     AlertDialog, 
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//   } from "@/components/ui/alert-dialog"
  
//   interface AlertProps {
//     open: boolean
//     onClose: (open: boolean) => void
//   }
  
//   export function Alert({ open, onClose }: AlertProps) {
//     return (
//       <AlertDialog open={open} onOpenChange={onClose}   >
//         <AlertDialogContent dir="rtl" className="sm:max-w-[425px]" >
//           <AlertDialogHeader>
//             <AlertDialogTitle  dir="rtl" className="text-center text-[30px]" > ⚠️ </AlertDialogTitle>
//             <AlertDialogDescription className="text-center text-black text-[16px] my-10" >
//               {`عذرا، لا يمكننا جلب الطلبات من هذا الموقع في الوقت الحالي. `}
//               {`سيتم إضافة هذي المناطق قريبا`}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => onClose(false)}>اغلاق</AlertDialogCancel>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     )
//   }
  

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onOk?: () => void;
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
}

export function Alert({
  open,
  onClose,
  onOk,
  title = "⚠️",
  description = "هل أنت متأكد؟",
  okText = "تأكيد",
  cancelText = "إغلاق",
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent dir="rtl" className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle dir="rtl" className="text-center text-[30px]">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-black text-[16px] my-10">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row-reverse justify-center gap-4">
          {onOk && (
            <AlertDialogAction
              onClick={() => {
                onOk();
                onClose(false);
              }}
              className="bg-primary text-white hover:bg-primary/90"
            >
              {okText}
            </AlertDialogAction>
          )}
          <AlertDialogCancel onClick={() => onClose(false)}>
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
