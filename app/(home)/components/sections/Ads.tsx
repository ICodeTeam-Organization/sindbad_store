import Image from "next/image";
import Adds from "@/public/images/Ads.svg";
const Ads = () => {
  return (
    <div className="m-auto w-full xl:container mx-auto">
      <Image className="w-full rounded-xl" src={Adds} alt={""} />
    </div>
  );
};

export default Ads;
