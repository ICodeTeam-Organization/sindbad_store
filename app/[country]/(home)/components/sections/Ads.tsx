import Adds from "@/public/images/Ads.svg";
import AdsCarousel from "@/components/AdsCarsoule";
const Ads = () => {
  return (
    <div className=" md:px-4 px-2  ">
      <div className="md:container mx-auto">
        <AdsCarousel images={[Adds,Adds,Adds,Adds]} />
      </div>
    </div>
  );
};

export default Ads;
