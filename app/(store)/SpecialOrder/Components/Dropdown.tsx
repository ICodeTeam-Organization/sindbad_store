import { BiChevronDown } from "react-icons/bi"; 
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type props = {
    name?: string;
  };

const Dropdown = ({name}:props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`${!name &&"w-96 "}flex items-end text-lg justify-between bg-gray-200`} variant="outline"><span>{name}</span><BiChevronDown className="w-6 h-6" width={0} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
