import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AttributeWithValues } from "@/types/pruductDetails";

const ProductFeaturesTable  = ({
  features,
} : {
  features:AttributeWithValues[]
}) => {
  return (
    <Table className="table-auto w-full text-right" dir="rtl">
      <TableBody>
        {features.map((feature, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-gray-100" : ""}
          >
            <TableCell>{feature.attributeName}</TableCell>
            <TableCell>{feature.attributeValue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductFeaturesTable;
