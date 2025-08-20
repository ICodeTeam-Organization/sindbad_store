 
import { ProfileResponsiveType } from "./profile/types";
import { getApi } from "@/lib/http"; 
import { BsPerson } from "react-icons/bs";
import { TabBar } from "./components/tabbar/TabBar";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const resulte = await getApi<ProfileResponsiveType>("Customers/Profile", {}, {
    cache: "no-cache"
  });

  

  return (
    <>
      <div className="mdHalf:flex  relative bg-bg-100">
        {/* <div className="mdHalf:block hidden border-l py-20 bg-white sticky top-0">
          <SideBar user={{
            email: resulte.data?.email  || "لا يوجد ايميل",
            fullName: resulte.data?.name || "لا يوجد اسم"
          }} />
        </div> */}
        <main className="mdHalf:flex-1  xl:container mx-auto mdHalf:p-8 p-4">
        

          <div className="p-4 py-8 relative  bg-white rounded-md shadow-sm items-center justify-center flex flex-col gap-y-3  bg-[url('/images/hero_images/bg_hero.png')] bg-cover bg-no-repeat bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div> 
            <div className="border rounded-full p-6 bg-white z-10" >
              <BsPerson className="text-[50px] text-gray-400" />
            </div>
            <h3 className="text-white font-bold z-10" >
              {resulte?.data?.name}
            </h3>
             <h4 className="text-white font-bold z-10" >
              {resulte?.data?.email}
            </h4>
          </div>
          <TabBar/>
          <div className="mb-2" />
          {children}
        </main>
      </div>
    </>
  );
}
