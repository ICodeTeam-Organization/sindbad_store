"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const Progresses = () => {
  const [progress, setProgress] = useState(13);
  const data = { state: "order arrived" };

  useEffect(() => {
    if (data.state === "order arrived") {
      setProgress(36.7);
    }
  }, []);
  return (
    <div className="m-auto mt-5">
      <Progress value={progress} className="w-full h-5" />
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
