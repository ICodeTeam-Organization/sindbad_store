import Image from "next/image";
import Adds from "@/app/Images/Ads.svg";
const Ads = () => {
  return (
    <div className="m-auto w-full">
      <Image className="w-full" src={Adds} alt={""} />
    </div>
  );
};

export default Ads;
