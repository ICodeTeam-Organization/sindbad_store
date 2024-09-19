"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
type props ={
  progress : string;
}
const Progresses = ({progress}:props) => {
  
  let data: number = 0;
data = 87.5;
  if (progress === "ssss") {
     data = 37;
  }
  else if (progress === "sssss") {
    data = 50;
  }
  else if (progress === "sssss") {
    data = 60;
  }
  else if (progress === "sssss") {
    data = 100;
  }


  return (
    <div className="m-auto mt-5">
      <Progress value={data} className="w-full h-5" />
      <div className="relative -top-5 flex justify-around">
        <div className="w-5 h-5 rounded-full border-2 bg-inherit"></div>
        <div className="w-5 h-5 rounded-full border-2 bg-inherit"></div>
        <div className="w-5 h-5 rounded-full border-2 bg-inherit"></div>
        <div className="w-5 h-5 rounded-full border-2 bg-inherit"></div>
      </div>
    </div>
  );
};

export default Progresses;
