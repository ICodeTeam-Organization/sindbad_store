"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteApi } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onDeletingEnd: () => void;
  title?: string;
  description?: string;
  reviewId?: string;
  productId?: string;
}

const AlertRemoveReview: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onDeletingEnd,
  title = "تأكيد الحذف",
  description = "هل أنت متأكد أنك تريد حذف هذه المراجعة؟ لا يمكن التراجع عن هذا الإجراء.",
  reviewId,
}) => {

const { isPending} = useMutation({
    mutationFn: async ( ) => {
      await deleteApi("CommentsAndRates/DeleteReview?reviewId=" + reviewId)
    },
    onSuccess: () => {
      onDeletingEnd()
      onClose(false);
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف المراجعة بنجاح.",
        variant: "default",
      });
    },
    onError: (error) => {
      console.log("Error deleting review:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المراجعة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      // Handle error
    },
   })


   const handleDelete = () => { 
    // mutate();
    
          onDeletingEnd()
      onClose(false);
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف المراجعة بنجاح.",
        variant: "default",
      });
    }



  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent dir="rtl" className="text-right sm:max-w-[450px] ">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-gray-600 text-base text-center p-5">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 flex justify-start gap-4">
         <div className="w-full flex justify-start gap-x-3" >
            <Button variant="destructive"  disabled={isPending} onClick={handleDelete}>
             {isPending ? <Loader2 className="animate-spin" /> :" نعم، احذف"}
            </Button>
            <Button variant="outline" onClick={() => onClose(false)} disabled={isPending}>
              إلغاء
            </Button>
         </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertRemoveReview;
