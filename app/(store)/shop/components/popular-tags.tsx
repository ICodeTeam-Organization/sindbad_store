import React from 'react';

// Define the type for the props (if using TypeScript)
interface PopularTagsProps {
  tags: string[];
}

const PopularTags: React.FC<PopularTagsProps> = ({ tags }) => (
  <div>
    <h3 className="font-bold mb-2">POPULAR TAGS</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-200 border border-orange-500 text-orange-500 rounded-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default PopularTags;
