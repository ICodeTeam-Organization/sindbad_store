"use client";

import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog"; 
import UpdateBondForm from "./UpdateBondForm";

const UpdateBondDialog = ({
  open,
  onOpenChange,
  orderId,
  onUpdateComplete
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: number;
  onUpdateComplete:()=>void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[500px]">
        {/* <DialogHeader>
          <DialogTitle>تحديث السند</DialogTitle>
        </DialogHeader> */}
        <UpdateBondForm orderId={orderId} onUpdateComplete={onUpdateComplete} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBondDialog;
