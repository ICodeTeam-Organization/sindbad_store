import useSignOut from "@/hooks/useSignOut";
import { BiLogOutCircle } from "react-icons/bi";
import {
  FaUser,
  FaClipboardList,
  FaTasks,
  FaBell,
  FaAddressCard,
} from "react-icons/fa";

type MenuItem = {
    title: string;
    icon: React.ReactNode; // Generic type for JSX
    onclickFun: () => void;
    isLogout?:boolean
  };
  
 export  const profileMenu  : MenuItem[] = [
    {
      title: "معلومات الحساب",
      icon: <FaUser />,
      onclickFun: () => {
        /* Functionality for account info */
      },
    },
    {
      title: "الطلبات",
      icon: <FaClipboardList />,
      onclickFun: () => {
        /* Functionality for orders */
      },
    },
    {
      title: "الطلبات الخاصة",
      icon: <FaTasks />,
      onclickFun: () => {
        /* Functionality for special orders */
      },
    },
    {
      title: "الإشعارات",
      icon: <FaBell />,
      onclickFun: () => {
        /* Functionality for notifications */
      },
    },
    {
      title: "عناويني",
      icon: <FaAddressCard />,
      onclickFun: () => {
        /* Functionality for addresses */
      },
    },
    {
      title: "تسجيل الخروج",
      icon: <BiLogOutCircle />,
      onclickFun: () => {
        const mutation = useSignOut();
        mutation.mutate()
      },
      isLogout: true,
    },
  ];