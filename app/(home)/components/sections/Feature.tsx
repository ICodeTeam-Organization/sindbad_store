import Image from "next/image";
 

const Feature = () => {
  return (
    <>
     {/* Fetures */}
      <div className="bg-white mb-10">
        <div className="container mx-auto flex  mdHalf:justify-evenly justify-center items-center  flex-wrap gap-x-10 gap-y-8 py-10">
          <div className="flex items-center justify-center gap-x-5">
            <div className="bg-primary p-4  rounded-full w-fit">
              <Image
                alt="fav_cart_ic"
                src="/images/footer_images/fav_cart_ic.svg"
                width={35}
                height={35}
              />
            </div>
            <h2 className="text-[20px]"> تسوق اسهل </h2>
          </div>
          <div className="flex items-center justify-center gap-x-5">
            <div className="bg-primary p-4  rounded-full w-fit">
              <Image
                alt="cur_ic"
                src="/images/footer_images/cur_ic.svg"
                width={35}
                height={35}
              />
            </div>
            <h2 className="text-[20px]"> بدون بطاقة ائتمان </h2>
          </div>
          <div className="flex items-center justify-center gap-x-5">
            <div className="bg-primary p-4  rounded-full w-fit">
              <Image
                alt="fav_cart_ic"
                src="/images/footer_images/flight_ic.svg"
                width={35}
                height={35}
              />
            </div>
            <h2 className="text-[20px]"> شحن أسرع و أمن الى اليمن </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
