"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { putApi } from "@/lib/http";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { storeInBgcache } from "@/lib/utils";

interface EditCommentDialogProps {
  open: boolean;
  onClose: (open: boolean) => void;
  productId: number;
  initialText: string;
  onEditEnd: (
    productId: number,
    newText: string | null,
    rating: number
  ) => void;
 
  rating: number;
}

const EditCommentDialog: React.FC<EditCommentDialogProps> = ({
  open,
  productId,
  initialText,
  onEditEnd, 
  onClose,
  rating: initRate = 0,
}) => {


  



  const [text, setText] = useState(initialText);
  const [rating, setRating] = useState(initRate);

   const { isPending} = useMutation({
    mutationFn: async ( ) => {
      await putApi("CommentsAndRates/UpdateReview",{
        body:{
            productId: productId,
            reviewText: text,
            rate: rating,
        }
      })
    },
    onSuccess: () => {
     
    onEditEnd(productId, text.trim(), rating);
    handleCancel();
    toast({
        title: "تم تعديل التعليق بنجاح", 
        variant: "default",
    })
    },
    onError: ( ) => {
      // Handle error
    },
   })

  const handleCancel = () => {
    onClose(false);
  };

  const handleSave = () => {
    if (text.trim()) {
      storeInBgcache({
        Id: productId,
        reqType: 2,
        reqValue: rating,
        reviewText: text.trim(), 
        prevReviewText: initialText,
        prevValue: initRate,
      });
       onEditEnd(productId, text.trim(), rating);
        handleCancel();
        toast({
            title: "تم تعديل التعليق بنجاح", 
            variant: "default",
        })
        // mutate();
    }
  };

  return (
    <Dialog open={open}  onOpenChange={handleCancel}>
    
      <DialogContent  dir="rtl" className="text-right">
        <DialogHeader>
          <DialogTitle className="text-center">تعديل التعليق</DialogTitle>
        </DialogHeader>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب تعليقك هنا..."
          className="min-h-[120px]"
        />
        <div>
          <label className="text-gray-600">التقييم: </label>
          <select
            className="border border-gray-300 p-2 rounded-md"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </div>
        <DialogFooter className="mt-4 flex gap-4   direction-rtl" dir="rtl">
           <div className="mt-4 flex gap-4  justify-start w-full  " >
             
          <Button onClick={handleSave} disabled={!text?.trim() || isPending}  >
            {isPending? <Loader2 className="animate-spin" />:"حفظ"}
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={isPending}>
            إلغاء
          </Button>
           </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommentDialog;
