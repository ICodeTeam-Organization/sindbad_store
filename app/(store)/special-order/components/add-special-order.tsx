"use client";
import { BiPlusCircle } from "react-icons/bi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpecialOrderForm from "./special-order-form";

const AddSpecialOrder = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" mr-16 py-2 px-6 flex justify-between items-center bg-primary-background hover:bg-orange-600 hover:text-white text-white rounded-sm"
        >
          جديد
          <BiPlusCircle className="mr-1" size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="m-auto">
        <SpecialOrderForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddSpecialOrder;
