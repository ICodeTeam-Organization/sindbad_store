import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import React from "react";
import PriceLabel from "./PriceLabel";
import Link from "next/link";

const Summary = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg text-center font-bold mb-4">
          تفاصيل قيمة الطلب
        </h2>
      </CardHeader>
      <CardContent>
        <PriceLabel title="الأجمالي" price={235} />
        <PriceLabel title="الشحن" price={235} />
        <PriceLabel title="الخصم" price={235} />
        <hr className="my-2" />
        <div className="flex justify-between mb-2">
          <span className="font-semibold">الأجمالي</span>
          <span className="font-semibold">{2504} رس</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={"/checkout"}>
          <Button className="bg-primary-background hover:bg-orange-600 text-white text-lg  w-full">
            ادخال سند السداد
            <ArrowLeft className="mr-3 " />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Summary;

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { ArrowLeft } from "lucide-react";
// import PriceLabel from "./PriceLabel";

// const InvoiceDetails = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <h1 className="text-center text-lg font-bold">تفاصيل قيمة الطلب</h1>
//       </CardHeader>
//       <CardContent>
//         <ul className="w-full">
//           <PriceLabel price={350.0} title="المجموع" />
//           <PriceLabel price={350.0} title="الشحن" />
//           <PriceLabel price={350.0} title="الخصم" />
//         </ul>
//         <div className="w-full flex justify-between pt-3 border-t border-t-gray-300">
//           <span className="font-bold text-lg">الأجمالي :</span>
//           <span className="font-bold text-lg">352 ر.س</span>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full bg-primary-background hover:bg-orange-600 text-lg font-bold">
//           أدخال سند السداد
//           <ArrowLeft className="mr-4" />
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default InvoiceDetails;
