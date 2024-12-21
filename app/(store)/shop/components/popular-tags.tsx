import { getApi } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

// Define the type for the props (if using TypeScript)
interface PopularTagsProps {
  tags: string[];
}

const PopularTags: React.FC<PopularTagsProps> = ({ tags }) => (

  // const { data, isLoading } = useQuery<{
  //   data: { id: number; name: string }[];
  // }>({
  //   queryKey: ["tags-filter"],
  //   queryFn: () => getApi("Brands/GetBrands"),
  // });

  <div>
    <h3 className="mb-2">الأكثر بحثأ</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs bg-gray-50 border border-orange-500 text-orange-500 rounded-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default PopularTags;
