"use client";
import SpecialWholesalesOrderDialog from "@/app/(store)/special-order/components/SpecialWholesalesOrderDialog";
import SpecialOrderDialog from "@/app/(store)/special-order/components/SpecialOrderDialog";
import { useSpecialOrdersDialogsStore } from "@/app/stores/specialordersDialogsStore";
import React from "react";
import { useSession } from "next-auth/react";

function SpecialOrderDialogsViewer() {
  const {
    setShowSpecialOrderDialog,
    setshowSpecialOrderWholeSalesDialog,
    showSpecialOrderDialog,
    showSpecialOrderWholeSalesDialog,
    category,
    tab,
  } = useSpecialOrdersDialogsStore();

  

  return (
    <div>
      <SpecialWholesalesOrderDialog
        category={category?category+"":undefined}
        setShow={setshowSpecialOrderWholeSalesDialog}
        show={showSpecialOrderWholeSalesDialog}
      />
      <SpecialOrderDialog
       show={showSpecialOrderDialog}
       setShow={setShowSpecialOrderDialog}
       category={category?category+"":undefined}
       tab={tab}
      />
    </div>
  );
}

export default SpecialOrderDialogsViewer;
