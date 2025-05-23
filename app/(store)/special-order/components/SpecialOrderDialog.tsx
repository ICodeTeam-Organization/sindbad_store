"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SpecialOrderForm from "./special-order-form";

const SpecialOrderDialog = ({
  show = false,
  setShow,
  tab = 1,
  category = "",
}: {
  show: boolean;
  setShow: (s: boolean) => void;
  tab?: number;
  category?: string;
}) => {
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="[&>button]:hidden border-none p-0 mdHalf:m-auto overflow-hidden mdHalf:h-auto mdHalf:w-screen  h-[90vh] w-[98vw] ">
        <SpecialOrderForm
          tabType={tab}
          category={+category}
          closeDialog={()=>{
            setShow(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SpecialOrderDialog;
