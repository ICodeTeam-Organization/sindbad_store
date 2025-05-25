"use client";
import useSendDataInBg from "@/hooks/useSendDataInBg";
import { BgHandlerDataItemType, SEND_DATA_IN_BG_LOCALSTORAGE_KEY } from "@/lib/utils";
import { useEffect } from "react";

const SendDataInBG = () => {
    
  const {mutate} = useSendDataInBg();
   
  useEffect(() => { 
    const interval = setInterval(() => {
      const bgHandlerData = localStorage.getItem(SEND_DATA_IN_BG_LOCALSTORAGE_KEY);
      if (bgHandlerData) {
        const dataToSend: BgHandlerDataItemType[] = bgHandlerData
          ? JSON.parse(bgHandlerData)
          : null; 
        if (dataToSend && dataToSend.length != 0) {
          mutate(dataToSend);
        }
      }
    }, 20000 );  
    console.log("interval set"); 
    return () => clearInterval(interval);
  }, []);  

  return null;  
};

export default SendDataInBG;
