import React from "react";
import AddressSelector from "./AddressSelector";
import { Checkbox } from "@/components/ui/checkbox";

function Shippingoptions() {
  return (
    <div className="bg-white rounded p-4 mb-2">
      <div className="mb-2">
        <p className="text-sm font-bold mb-2  "> عنوان الإستلام</p>
        <AddressSelector
          onSelect={(id) => {
            sessionStorage.setItem("cartAddress", id);
          }}
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-x-2 mt-3 mx-2">
          <Checkbox
            defaultChecked={!!sessionStorage.getItem("urgentDelivery")}
            id="urgentDelivery"
            onCheckedChange={(checked) => {
              if (checked) {
                sessionStorage.setItem("urgentDelivery", "true");
              } else {
                sessionStorage.removeItem("urgentDelivery");
              }
            }}
          />
          <label htmlFor="urgentDelivery" className="text-sm">
            {" "}
            طلب مستعجل{" "}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Shippingoptions;
