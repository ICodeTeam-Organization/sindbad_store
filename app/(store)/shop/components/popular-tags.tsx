import { getApi } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// Define the type for the props (if using TypeScript)
interface PopularTagsProps {
  // tags: string[];
  onSelectTag:(id:number)=>void
}

const PopularTags: React.FC<PopularTagsProps> = ({onSelectTag}) => {

  const { data: tags, isLoading } = useQuery<{
    data:{result:{ id: number; name: string }[]}
  }>({
    queryKey: ["tags-filter"],
    queryFn: () => getApi("Filter/GetTags"),
  });

  return (
    <div>
      <h3 className="mb-2">الأكثر بحثأ</h3>
      <div className="flex flex-wrap gap-2">
        {isLoading
          ? [1, 2, 3, 3, 3, 3, 4, 2, 5, 4].map((_,x) => (
              <div key={x} className="p-1 px-2 rounded animate-pulse flex gap-x-2 items-center ">
                <div className="h-[16px] w-[16px] rounded-full bg-zinc-200 "></div>
                <div className="h-[13px] w-[80%] rounded-full bg-zinc-200 "></div>
              </div>
            ))
          : tags?.data?.result?.map((tag, index) => (
              <span
                key={index}
                onClick={()=>{
                  onSelectTag(tag.id)
                }}
                className="px-2 py-1 text-xs bg-gray-50 border border-orange-500 text-orange-500 rounded-sm cursor-pointer"
              >
                {tag.name}
              </span>
            ))}
      </div>
    </div>
  );
};

export default PopularTags;
