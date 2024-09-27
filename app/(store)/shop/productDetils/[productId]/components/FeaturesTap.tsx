import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"; 

const ProductFeaturesTable = () => {
  return (
    <Table className="table-auto w-full text-right" dir="rtl">
      <TableBody>
        <TableRow className="bg-gray-100">
          <TableCell >العلامة التجارية</TableCell>
          <TableCell>آبل</TableCell>
        </TableRow>
        <TableRow>
          <TableCell >اللون</TableCell>
          <TableCell>رصاصي</TableCell>
        </TableRow>
        <TableRow className="bg-gray-100">
          <TableCell>تقنية الاتصال</TableCell>
          <TableCell>Wireless</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>اسم الطراز</TableCell>
          <TableCell>MWP222P/A</TableCell>
        </TableRow>
        <TableRow className="bg-gray-100">
          <TableCell>الأبعاد</TableCell>
          <TableCell>160.8 ملم * 78.1 * 7.7 ملم جرام</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>الشريحة</TableCell>
          <TableCell>يدعم الهاتف شريحتين</TableCell>
        </TableRow>
        <TableRow className="bg-gray-100">
          <TableCell >المادة</TableCell>
          <TableCell>الزجاج</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>الوزن</TableCell>
          <TableCell>0.45 أوقية</TableCell>
        </TableRow>
        <TableRow className="bg-gray-100">
          <TableCell>المادة</TableCell>
          <TableCell>الزجاج</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProductFeaturesTable;
