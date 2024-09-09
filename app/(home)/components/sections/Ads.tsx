import Image from "next/image";
import Adds from "@/public/images/Ads.svg";
const Ads = () => {
  return (
    <div className="m-auto w-full">
      <Image className="w-full" src={Adds} alt={""} />
    </div>
  );
};

export default Ads;
