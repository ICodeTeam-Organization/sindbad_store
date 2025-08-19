import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-black py-3">
      <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32 text-white flex flex-col-reverse md:flex-row  justify-between items-center text-sm">
        <span className="mt-3 md:mt-0">جميع الحقوق محفوظة لمنصة فاست 2024</span>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            className="hidden md:block h-9"
            src="/images/photo.svg"
            alt={"photo"}
            width={40}
            height={20}
          />
          <div className="md:ml-5 md:mr-2 mb-3 md:mb-0 md:flex md:items-center">
            <span className="block md:flex md:items-center mb-2 md:mb-0">
              الرقم الضريبي <i className="md:block hidden md:mx-3">:</i>
            </span>
            <span>00000000</span>
          </div>
          <div className="flex gap-2">
            <Image
              className="w-full"
              src="/images/paypal.svg"
              alt={"mada"}
              width={40}
              height={20}
            />
            <Image
              className="w-full"
              src="/images/paypal.svg"
              alt={"paypal"}
              width={40}
              height={20}
            />
            <Image
              className="w-full"
              src="/images/master.svg"
              alt={"master"}
              width={40}
              height={20}
            />
            <Image
              className="w-full"
              src="/images/visa.svg"
              alt={"visa"}
              width={40}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
