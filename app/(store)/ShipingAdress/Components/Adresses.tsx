import { GrTrash } from "react-icons/gr"; 

const Adresses = () => {
  return (
    <div className="grid grid-cols-9 text-center items-center font-bold w-full max-w-[1800px]">
                <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 w-full col-span-2">العنوان</h1>
                <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 col-span-2">المنطقة</h1>
                <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 col-span-2">المستلم</h1>
                <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 col-span-2">التلفون</h1>
                <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">حذف</h1>
                
                {/* fetch api from here */}

                <h1 className="text-right line-clamp-3 px-3 pt-3 col-span-2">بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج بجانب مستشفى البرج  </h1>
                <div className="m-auto pt-3 text-gray-500 px-3 line-clamp-3 col-span-2">
                    <h1 className="text-right ">محافظة حضرموت</h1>
                    <h1 className="text-right">مديرية المكلا</h1>
                    <h1 className="text-right ">منطقة الديس</h1>
                </div>
                <div className="m-auto px-3 pt-3 line-clamp-3 col-span-2">
                    <h1 className="text-right  text-gray-600">محمد علي سالم عبدالله</h1>
                </div>
                <div className=" pt-3 col-span-2">
                    <h1 className=" line-clamp-3 text-blue-400 max-sm:text-[8px]">770700718</h1>
                </div>
                <div className=" pt-3">
                 <GrTrash className="max-sm:size-4 cursor-pointer m-auto" size={25} />
                </div>
            </div>
  )
}

export default Adresses