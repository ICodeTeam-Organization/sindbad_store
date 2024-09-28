import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ProductFeaturesTableProps } from "../types";

const ProductFeaturesTable: React.FC<ProductFeaturesTableProps> = ({
  features,
}) => {
  return (
    <Table className="table-auto w-full text-right" dir="rtl">
      <TableBody>
        {features.map((feature, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-gray-100" : ""}
          >
            <TableCell>{feature.label}</TableCell>
            <TableCell>{feature.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductFeaturesTable;
