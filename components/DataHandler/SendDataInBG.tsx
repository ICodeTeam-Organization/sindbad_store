"use client";
import { BgHandlerDataItemType } from "@/Data/cachingAndBgData/type";
import { db } from "@/Data/database/db";
import useSendDataInBg from "@/hooks/useSendDataInBg"; 
import { useEffect } from "react";

const SendDataInBG = () => {
    
  const {mutate} = useSendDataInBg();
   
  useEffect(() => { 
    const interval = setInterval( async () => {  
        const dataToSend: BgHandlerDataItemType[] = await db.bgData.toArray()
        if (dataToSend && dataToSend.length != 0) {
          mutate(dataToSend);
        }
    }, 1000 * 60 * 10 );   
    return () => clearInterval(interval);
  }, []);  

  return null;  
};

export default SendDataInBG;
