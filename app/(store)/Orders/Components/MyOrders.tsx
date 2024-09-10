const Adresses = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="grid grid-cols-5 text-center items-center font-bold w-full text-gray-600">
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 w-full">
        المنتجات
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">قيمة الطلب</h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">التاريخ</h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">حالته</h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">تتبع</h1>

      {/* fetch api from here */}
      {arr.map((itm) => (
        <>
          <h1 className="text-right line-clamp-3 px-3 max-md:text-[10px] max-md:line-clamp-4 mt-9">
            جوال سامسونج - كفر جوال
          </h1>
          <h1 className="m-auto text-gray-500 px-3 line-clamp-3 text-right max-md:text-xs max-md:line-clamp-4 mt-9">
            2100.00
          </h1>
          <h1 className="m-auto px-3 line-clamp-3 max-sm:text-[9px] mt-9">
            15/10/2024
          </h1>
          <h1 className="m-auto mt-9 line-clamp-3 text-blue-400 max-sm:text-xs">
            في الطريق
          </h1>
          <h1 className="m-auto mt-9 line-clamp-3 text-blue-400 max-sm:text-xs">
            تتبع الطلب
          </h1>
        </>
      ))}
    </div>
  );
};

export default Adresses;
