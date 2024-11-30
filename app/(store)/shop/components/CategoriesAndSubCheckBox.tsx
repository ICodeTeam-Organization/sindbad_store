import { MainCategory } from "@/types/storeTypes";
import React, { useEffect, useState } from "react";
import { BiDownArrow, BiLeftArrow } from "react-icons/bi";
import { FcLeft } from "react-icons/fc";
import { MdOutlineChevronLeft } from "react-icons/md";

interface ParentChildCheckboxProps {
  data: MainCategory; // Represents the parent and its children
  onChange?: (id: number, checked: boolean) => void; // Callback when a checkbox state changes
  parentChecked?: boolean;
  child?: boolean;
  parent?: boolean;
  onChecked?: (ids:number[]) => void;
}

const CategoriesAndSubCheckBox: React.FC<ParentChildCheckboxProps> = ({
  data,
  onChange = (i, x) => {},
  parentChecked = false,
  child = false,
  parent = false,
  onChecked = (ids:number[],parent:{id:number,checked:boolean}) => {},
}) => {
  const [checked, setChecked] = useState(false);
  const [childsChecked, setchildsChecked] = useState<
    { id: number | string; checked: boolean }[]
  >([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setChecked(parentChecked);
  }, [parentChecked]);

  useEffect(() => {
    if (parent) {
      if (childsChecked.length == 0) {
        setChecked(false);
      }
      setIndeterminate(false);
      if (
        childsChecked.length != 0 &&
        childsChecked.length != data.subCategories?.length
      ) {
        setIndeterminate(true);
      }
      if ( childsChecked.length == data.subCategories?.length) {
        setChecked(true)
      }
    }
  }, [childsChecked]);


  useEffect(()=>{
    onChecked(childsChecked.map(o=> +o.id),{id:data.id,checked});
  },[checked,childsChecked])

  const handleChange = (checked: boolean, id: number | string) => {
    setChecked(checked);
    setIndeterminate(false);
    if (parent) {
      if (data.subCategories&&data.subCategories?.length > 0) {
        setchildsChecked(
        checked
          ? data?.subCategories?.map((i) => ({ id: i.id, checked })) || []
          : []
      );
      }
    }
    if (child) {
      onChange(+id, checked);
    }

  };

  const handleChildChange = (childId: number, checked: boolean) => {
    setchildsChecked((o) => {
      if (checked) {
        return [...o, { id: childId, checked }];
      } else {
        return o.filter((fl) => fl.id != childId);
      }
    });
  };

  return (
    <div className="mb-1">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-gray-600 focus:outline-none"
        >
          {data.subCategories && data.subCategories?.length > 0 && (
            <span
              className={`transition-transform ${
                isExpanded ? "-rotate-90" : ""
              } inline-block mx-2 mr-0`}
            >
              <MdOutlineChevronLeft />
            </span>
          )}
        </button>
        <input
          type="checkbox"
          checked={checked}
          ref={(input) => {
            if (input) input.indeterminate = indeterminate;
          }}
          onChange={(e) => handleChange(e.target.checked, data.id)}
          className="mr-0"
        />
        <div className="flex items-center">
          <div>
            <span className="text-xs tajawa">{data.name}</span>
          </div>
        </div>
      </div>

      {/* Child Checkboxes (Collapsible) */}
      {isExpanded && data.subCategories && (
        <div className="mr-10">
          {data.subCategories.map((subCategory) => (
            <CategoriesAndSubCheckBox
              key={subCategory.id}
              data={subCategory}
              onChange={handleChildChange}
              parentChecked={checked}
              child
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesAndSubCheckBox;
