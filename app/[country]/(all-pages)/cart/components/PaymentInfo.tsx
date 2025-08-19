import Image from "next/image";
import Link from "next/link";
import React from "react";

function PaymentInfo() {
  return (
    <div className="mt-2">
      <div className="bg-white rounded p-4 mb-2">
        <div className="mb-2">
          <p className="text-sm font-bold mb-2  ">إدفع عن طريق</p>
          <div className="flex items-center justify-center gap-x-4 mt-4">
            <Image
              alt="c"
              src="/images/footer_images/dwal_ic.svg"
              width={45}
              height={45}
              className="rounded-full"
            />
            <Image
              alt="c"
              src="/images/footer_images/qtp_ic.svg"
              width={45}
              height={45}
              className="rounded-full"
            />
            <Image
              alt="c"
              src="/images/footer_images/bcr_ic.svg"
              width={45}
              height={45}
              className="rounded-full"
            />
            <Image
              alt="c"
              src="/images/footer_images/omg_ic.svg"
              width={45}
              height={45}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded p-4 mb-2">
        <div className="mb-2">
          <p className="text-sm font-bold mb-2  ">حماية المستخدم</p>
          <div className="flex items-center justify-center gap-x-4 mt-4">
            <Image
              alt="c"
              src="/images/protection_ic.svg"
              width={45}
              height={45}
              className="rounded-full"
            />
            <span className="text-sm">
              استرد أموالك في حالة اختلاف المنتج عن الوصف او عدم توصيله

              <Link href="/refund-policy" className="text-blue-700 hover:underline mx-1 text-xs">
                سياسة الاسترداد {" "}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
