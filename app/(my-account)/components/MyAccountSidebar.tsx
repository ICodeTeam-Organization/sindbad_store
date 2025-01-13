import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LogOut } from "react-feather";

const MyAccountSidebar = () => {
  // const location = usePathname();

    const myAccountMenu = [
    { id: 1, title: "Dashboard", link: "/my-account/dashboard", icon: <i className="fas fa-home"></i> },
    { id: 2, title: "Profile", link: "/my-account/profile", icon: <i className="fas fa-user"></i> },
    { id: 3, title: "Settings", link: "/my-account/settings", icon: <i className="fas fa-cog"></i> },
  ];
  
  return (
    <div className="hidden md:block md:w-1/4 lg:w-1/3 border-r">
      <nav className="pt-10 px-4">
        <ul className="space-y-2">
          {myAccountMenu.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`flex items-center gap-2 p-2 rounded `}
              >
                {item.icon} {item.title}
              </Link>
            </li>
          ))}
          <li>
            <hr />
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
            
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MyAccountSidebar;
