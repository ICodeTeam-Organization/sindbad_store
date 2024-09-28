import { BiCheck } from "react-icons/bi";
import { Progress } from "@/components/ui/progress";
type props = {
  progress: string;
};
const Progresses = ({ progress }: props) => {
  let data: number = 0;
  data = 100;
  if (progress === "Accepted") {
    data = 33;
  } else if (progress === "sssss") {
    data = 50;
  } else if (progress === "sssss") {
    data = 60;
  } else if (progress === "sssss") {
    data = 100;
  }

  return (
    <div className="m-auto mt-5">
      <Progress value={data} className="w-3/4 m-auto h-3" />
      <div className="relative -top-5 flex justify-around">
        <div
          className={
            data <= 100
              ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
              : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
          }
        >
          {data <= 67 && <BiCheck className="text-white w-20 h-20" />}
        </div>
        <div
          className={
            data <= 67
              ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
              : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
          }
        >
          {data <= 33 && <BiCheck className="text-white w-20 h-20" size={30} />}
        </div>
        <div
          className={
            data <= 33
              ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
              : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
          }
        >
          {data <= 0 && <BiCheck className="text-white w-20 h-20" size={30} />}
        </div>
        <div
          className={
            data === 0
              ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
              : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
          }
        >
          {data <= 0 && <BiCheck className="text-white w-20 h-20" size={30} />}
        </div>
      </div>
    </div>
  );
};

export default Progresses;
