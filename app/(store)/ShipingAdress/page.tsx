import { BsArrowRightCircle } from "react-icons/bs"; 
import { BsArrowLeftCircle } from "react-icons/bs"; 
import { BiPlusCircle } from "react-icons/bi"; 
import Adresses from './Components/Adresses'

const ShipingAdr = () => {
  const arr = ['01','02','03','04','05'];
  return (
    <div className="m-auto my-16">
        <button className=" mr-16 py-2 px-6 flex justify-between items-center bg-primary-background text-white rounded-sm">جديد<BiPlusCircle /></button>
        <div className="mx-8 m-auto border-2 rounded-sm py-3 mt-6">
            <p className="pr-6 pb-3 text-lg font-bold">عناوين المستخدم</p>
            <Adresses />
            <div className="flex items-center justify-center cursor-pointer mt-16 mb-10">
                <BsArrowRightCircle className="text-primary-background mx-3 hover:text-white hover:bg-primary-background transition-all duration-700 rounded-full" size={30}/>
                {arr.map((itm) => (
                  <div className=" rounded-full border-2 hover:text-white hover:bg-primary-background hover:border-none transition-all duration-700 w-8 h-8 p-1 text-center ml-1">{itm}</div>
                ))}
                <BsArrowLeftCircle className="text-primary-background mx-3 hover:text-white hover:bg-primary-background transition-all duration-700 rounded-full" size={30}/>
            </div>
        </div>
    </div>
  )
}

export default ShipingAdr