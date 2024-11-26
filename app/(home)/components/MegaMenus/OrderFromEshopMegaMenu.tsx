"use clinet"
import { cn } from '@/lib/utils';
import {useState} from 'react'
import { BiCategoryAlt } from 'react-icons/bi';
import { IoStorefrontOutline } from 'react-icons/io5';

const categories = [
  {
    id: 1,
    category: "موسيقى وأدوات صوتية",
    stores: [
      { id: 1, name: "محل التقنية الحديثة" },
      { id: 2, name: "محل الأجهزة الصوتية" },
      { id: 1, name: "محل التقنية الحديثة" },
      { id: 2, name: "محل الأجهزة الصوتية" },
      // يمكنك تكرار المحلات كما كان في الأصل
    ],
  },
  {
    id: 2,
    category: "أطعمة ومشروبات",
    stores: [
      { id: 3, name: "محل الأطعمة الصحية" },
      { id: 4, name: "محل مستلزمات السفر" },
    ],
  },
  {
    id: 3,
    category: "حيوانات أليفة",
    stores: [
      { id: 1, name: "محل التقنية الحديثة" },
      { id: 3, name: "محل الأطعمة الصحية" },
      { id: 5, name: "محل الإلكترونيات" },
      { id: 6, name: "محل الأدوات المكتبية" },
      { id: 7, name: "محل الأزياء الراقية" },
      // إضافة باقي المحلات هنا بنفس الشكل
    ],
  },
  {
    id: 4,
    category: "تكنولوجيا",
    stores: [
      { id: 1, name: "محل التقنية الحديثة" },
      { id: 5, name: "محل الإلكترونيات" },
      { id: 6, name: "محل الأجهزة الكهربائية" },
      // تكرار المحلات حسب الحاجة
    ],
  },
  {
    id: 5,
    category: "أدوات مكتبية",
    stores: [
      { id: 6, name: "محل الأدوات المكتبية" },
      { id: 7, name: "محل الكتب والمجلات" },
    ],
  },
  {
    id: 6,
    category: "أدوات سفر",
    stores: [
      { id: 4, name: "محل مستلزمات السفر" },
      { id: 6, name: "محل الأجهزة الكهربائية" },
    ],
  },
  {
    id: 7,
    category: "معدات البناء",
    stores: [
      { id: 8, name: "محل معدات البناء" },
      // يمكنك تكرار المحلات كما كان في الأصل
    ],
  },
  { id: 8, category: "أزياء وملابس", stores: [{ id: 7, name: "محل الأزياء الراقية" }] },
  { id: 9, category: "مستلزمات رياضية", stores: [{ id: 9, name: "محل المعدات الرياضية" }] },
  { id: 10, category: "أجهزة كهربائية", stores: [{ id: 6, name: "محل الأجهزة الكهربائية" }] },
  { id: 11, category: "ألعاب إلكترونية", stores: [{ id: 10, name: "محل الألعاب الإلكترونية" }] },
  {
    id: 12,
    category: "كتب وقرطاسية",
    stores: [
      { id: 6, name: "محل الأدوات المكتبية" },
      { id: 7, name: "محل الكتب والمجلات" },
    ],
  },
  {
    id: 13,
    category: "منتجات صحية",
    stores: [
      { id: 3, name: "محل الأطعمة الصحية" },
      { id: 11, name: "محل المكملات الغذائية" },
    ],
  },
  { id: 14, category: "معدات سيارات", stores: [{ id: 8, name: "محل معدات البناء" }] },
  { id: 15, category: "معكترونية", stores: [{ id: 10, name: "محل الألعاب الإلكترونية" }] },
  // يمكنك إضافة المزيد من الفئات والمحلات بنفس النمط
];

function OrderFromEshopMegaMenu() {

 const [selectedCategory, setselectedCategory] = useState(categories[0].id)

  return (
  <div className="transition-all duration-200 right-0 opacity-0 invisible hidden  mdHalf:block  group-hover:block  translate-y-5  group-hover:-translate-y-0 mdHalf:w-[85%] w-full group-hover:opacity-100 group-hover:visible mdHalf:mt-1 -mt-2 rounded top-10 left-0   max-h-[400px] mdHalf:overflow-y-hidden overflow-y-scroll z-[99999]  bg-white  mdHalf:shadow-md mdHalf:border-y border-b dark:bg-gray-800  mdHalf:absolute   ">
  <div className="flex mdHalf:flex-row flex-col px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6 gap-x-4 w-full">
    <div className="flex mdHalf:block  bg-white flex-col xl:w-[20%] mdHalf:w-[30%] justify-between mdHalf:max-h-[400px] overflow-hidden ">
      <div className="flex items-center  gap-2 mb-4  ">
        <BiCategoryAlt size={25} color="black" className='hidden mdHalf:flex' />
        <h3 className="mdHalf:text-md text-xs font-bold text-black  "> إختر فئة </h3>
      </div>
      <div 
      className="mdHalf:grid lg:grid-cols-1 flex  mdHalf:place-content-start  mdHalf:overflow-y-scroll mdHalf:overflow-x-hidden overflow-x-scroll  gap-x-4  mdHalf:mb-5 mb-2  mdHalf:h-[75%]">
        {categories.map((i) => (
          <p 
            onClick={()=>{
              setselectedCategory(i.id)
            }} 
            className={cn(
              "text-[11px]  my-[2px] hover:bg-gray-200 text-black font-semibold transition-colors duration-200 h-fit px-2 p-1 mdHalf:rounded rounded-full xl:whitespace-nowrap mdHalf:whitespace-normal whitespace-nowrap ",
              selectedCategory == i.id && "bg-slate-200"
            )}
          >
            {" "}
            {i.category}{" "}
          </p>
        ))}
      </div>
    
    </div>
    <div className="mdHalf:border-r  border-[#AAA7A744]  mdHalf:pr-4  mdHalf:max-h-[400px] w-full ">
      <div className="flex items-center  gap-2 mb-4 ">
        <IoStorefrontOutline size={25} color="black" className='hidden mdHalf:flex'/>
        <h3 className="mdHalf:text-md text-xs font-bold text-black "> المتاجر الإلكترونية  </h3>
      </div>
      <div className="mdHalf:grid xl:grid-cols-7 lg:grid-cols-6 mdHalf:grid-cols-4 grid-cols-1 place-content-start  gap-x-4   overflow-y-scrol overflow-x-hidden h-[75%] ">
        {categories
          .find((o) => o.id == selectedCategory)
          ?.stores.map((i) => (
            <p className=" text-[11px] my-[2px] h-fit hover:bg-gray-200 font-semibold transition-colors duration-200 px-2 p-1 rounded lg:whitespace-nowrap">
              {" "}
              {i.name}{" "}
            </p>
          ))}
      </div>
      {/* <Link href="/" className="hover:underline hover:text-blue-600 ">
        <p>عرض الكل</p>
      </Link> */}
    </div>
  </div>
</div>

  )
}

export default OrderFromEshopMegaMenu