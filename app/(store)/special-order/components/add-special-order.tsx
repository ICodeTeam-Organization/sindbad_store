"use client";
import { BiPlusCircle } from "react-icons/bi";
import { Dialog, DialogContent, DialogTrigger  } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpecialOrderForm from "./special-order-form";

const AddSpecialOrder = ({
  show = false,
  setShow ,
  tab = 1,
  category = "",
}:{
  show:boolean,
  setShow:(s:boolean) => void
  tab:number,
  category:string
}) => {
  return (
    <Dialog open={show} onOpenChange={setShow}  >
      <DialogTrigger
        asChild  // this for close if it open from megamenus  or another page
      >
        <Button
          variant="outline"
          onClick={()=>{setShow(true)}}
          className=" mr-16 py-2 px-6 flex justify-between items-center bg-primary-background hover:bg-orange-600 hover:text-white text-white rounded-sm"
        >
          جديد
          <BiPlusCircle className="mr-1" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden m-auto">
        <SpecialOrderForm tabType={tab} category={+category} closeDialog={()=>{setShow(false)}}   />
      </DialogContent>
    </Dialog>
  );
};

export default AddSpecialOrder;
