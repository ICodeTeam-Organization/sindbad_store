"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useSpecialOrdersDialogsStore } from "@/app/stores_mangament/specialordersDialogsStore";

// dynamic imports للمكونات الداخلية
const SpecialWholesalesOrderDialog = dynamic(
  () =>
    import(
      "@/app/[country]/(all-pages)/special-order/components/SpecialWholesalesOrderDialog"
    ),
  { ssr: false }
);

const SpecialOrderDialog = dynamic(
  () =>
    import(
      "@/app/[country]/(all-pages)/special-order/components/SpecialOrderDialog"
    ),
  { ssr: false }
);

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
        category={category ? category + "" : undefined}
        setShow={setshowSpecialOrderWholeSalesDialog}
        show={showSpecialOrderWholeSalesDialog}
      />
      <SpecialOrderDialog
        show={showSpecialOrderDialog}
        setShow={setShowSpecialOrderDialog}
        category={category ? category + "" : undefined}
        tab={tab}
      />
    </div>
  );
}

export default SpecialOrderDialogsViewer;
