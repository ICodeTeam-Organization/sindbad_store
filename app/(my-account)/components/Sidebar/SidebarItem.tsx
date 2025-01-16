import React from "react";
import { SidebarItemProps } from "../../user-addresses/types";

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label, badge }) => {
  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="ms-3">{label}</span>
        {badge && (
          <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
};

export default SidebarItem;
