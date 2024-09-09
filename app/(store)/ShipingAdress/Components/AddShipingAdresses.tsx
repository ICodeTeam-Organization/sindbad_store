import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { BiPlusCircle } from "react-icons/bi"

const AddShipingAdresses = () => {
  return (
    <div>  
    <AlertDialog>
    <AlertDialogTrigger asChild>
        <Button variant='outline' className=' mr-16 py-2 px-6 flex justify-between items-center bg-primary-background hover:bg-orange-600 hover:text-white text-white rounded-sm'>جديد<BiPlusCircle className='mr-1' size={20} /></Button>
    </AlertDialogTrigger>
    <AlertDialogContent className='m-auto'>
        <AlertDialogHeader>
        <AlertDialogDescription>
          <div className='m-auto p-8'>            
            <div className='my-4'>
                <h1 className='m-auto text-3xl text-right  font-bold mb-2'>العنوان</h1> 
                <input className=' w-full h-11  border-2 border-solid rounded-sm pr-2' type="text" />
            </div>  
              
            <div className='my-4 m-auto'>
                <h1 className='text-3xl text-right  font-bold mb-2'>المنطقة</h1> 
                <div className='text-center font-bold text-lg grid grid-cols-3'>
                  <h1>المحافظة</h1>
                  <h1>المديرية</h1>
                  <h1>المنطقة</h1>
                  <select name="" id="" className="m-auto w-full border outline-none p-2">
                    <option className="hidden">المحافظة</option>
                    <option>حضرموت</option>
                    <option>عدن</option>
                    <option>صنعاء</option>
                  </select>
                  <select name="" id="" className="m-auto w-full border outline-none p-2">
                    <option className="hidden">المديرية</option>
                    <option>المكلا</option>
                    <option>سيؤن</option>
                    <option>الشحر</option>
                  </select>
                  <select name="" id="" className="m-auto w-full border outline-none p-2">
                    <option className="hidden">المنطقة</option>
                    <option>حضرموت</option>
                    <option>عدن</option>
                    <option>صنعاء</option>
                  </select>
                </div>
            </div>  
            <div className='my-4'>
                <h1 className='m-auto text-3xl text-right  font-bold mb-2'>المستلم</h1> 
                <input className='w-full h-11  border-2 border-solid rounded-sm pr-2' type="text" />
            </div>  
              
            <div className='my-4'>
                <h1 className='m-auto text-3xl text-right  font-bold mb-2'>رقم التلفون</h1> 
                <input className='w-full h-11  border-2 border-solid rounded-sm pr-2' type="text" />
            </div>  
              
          </div>
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>إلغاء</AlertDialogCancel>
        <AlertDialogAction className='px-24 text-white bg-primary-background hover:bg-orange-600 transition-all duration-300 rounded-sm text-lg flex justify-center items-center'>حفظ التعديلات</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
    </div>
      
  )
}

export default AddShipingAdresses