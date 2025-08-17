import Image from "next/image";


const Feature = () => {
  return (
    <>
      {/* Fetures */}
      <div className="bg-gradient-to-r from-secondary/85 via-secondary to-secondary border-b-4 border-white mt-8">
        <div className="container mx-auto flex  mdHalf:justify-evenly justify-center items-center  flex-wrap gap-x-10 gap-y-8 py-10">
          <div className="flex items-center justify-center gap-x-5">
            <div className="bg-primary border-4 border-white p-4  rounded-full w-fit">
              <Image
                alt="fav_cart_ic"
                src="/images/footer_images/fav_cart_ic.svg"
                width={35}
                height={35}
              />
            </div>
            <h2 className="text-[20px] text-white"> تسوق اسهل </h2>
          </div>
          <div className="flex items-center justify-center gap-x-5">
            <div className="bg-primary border-4 border-white p-4  rounded-full w-fit">
              <Image
                alt="cur_ic"
                src="/images/footer_images/cur_ic.svg"
                width={35}
                height={35}
              />
            </div>
            <h2 className="text-[20px] text-white"> بدون بطاقة ائتمان </h2>
          </div>
          <div className="flex items-center justify-center gap-x-5">
            <div className="bg-primary border-4 border-white p-4  rounded-full w-fit">
              <Image
                alt="fav_cart_ic"
                src="/images/footer_images/flight_ic.svg"
                width={35}
                height={35}
              />
            </div>
            <h2 className="text-[20px] text-white"> شحن أسرع و أمن الى اليمن </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
