import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BiArrowFromTop } from "react-icons/bi";

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, isLoading }) => {
    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            variant="outline"
            className="mx-auto my-2 py-2 px-6 flex justify-between items-center bg-primary hover:bg-orange-600 hover:text-white text-white rounded-sm"
        >
            عرض المزيد
            {isLoading ? <Loader2 className="animate-spin" /> : <BiArrowFromTop className="mr-1" size={20} />}
        </Button>
    );
};

export default LoadMoreButton;