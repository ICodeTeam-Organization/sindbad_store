"use client";
import SpecialWholesalesOrderDialog from "@/app/(all-pages)/special-order/components/SpecialWholesalesOrderDialog";
import SpecialOrderDialog from "@/app/(all-pages)/special-order/components/SpecialOrderDialog";
import React from "react";
import { useSpecialOrdersDialogsStore } from "@/app/stores_mangament/specialordersDialogsStore";

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
