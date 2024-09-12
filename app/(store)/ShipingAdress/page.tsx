import { BsArrowRightCircle } from "react-icons/bs"; 
import { BsArrowLeftCircle } from "react-icons/bs"; 
import { BiPlusCircle } from "react-icons/bi"; 
import Adresses from './Components/Adresses'
import AddShipingAdresses from'./Components/AddShipingAdresses'
import Pagination from "@/components/Pagination";
const ShipingAdr = () => {
  return (
    <div className="m-auto my-16">
        <AddShipingAdresses />
        <div className="mx-8 m-auto border-2 rounded-sm py-3 mt-6">
            <p className="pr-6 pb-3 text-lg font-bold">عناوين المستخدم</p>
            <Adresses />
            <Pagination/>
        </div>
    </div>
  )
}

export default ShipingAdr