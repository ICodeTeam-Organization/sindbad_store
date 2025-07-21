import React from "react";
import ZoomImage from "../ImageZoom";

interface PropsType {
  images:string[]
}

function StoreImagesTab({images}:PropsType) {
  return (
    <div className="grid grid-cols-2 mdHalf:grid-cols-4 gap-5 mt-5">
      {images?.map((img)=>(
        <div className="h-52 relative " key={img}>
        <ZoomImage
            className=" rounded-lg object-cover bg-bg-50 "
            src={img}
            alt="Gallery image"
            fill 
            style={{
              objectFit:"cover"
            }}
        />
      </div>
       
      ))}
    </div>
  );
}

export default StoreImagesTab;
