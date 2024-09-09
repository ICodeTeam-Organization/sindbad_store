import { AiOutlineArrowLeft } from "react-icons/ai"; 
import React from 'react'

const resetPass = () => {
  return (
    <div className='m-auto mt-28 min-w-[100px] max-w-[424px] min-h-[50px] p-[32px] rounded-[4px] border-solid border-[1px] border-[#E4E7E9] shadow-lg drop-shadow-sm shadow-[#0000001F]'>
    <h1 className='m-auto text-[28px] text-center font-bold mt-2'>إعادة تعيين كلمة المرور</h1>
    <div className='m-auto mt-[30px]'>
        <p className='text-[20px]  text-[#191C1F]'>رمز التفعيل</p>
        <input className='min-w-[150px] w-full h-[44px]  border-[1px] border-solid rounded-[2px] border-[#E4E7E9] pr-2' type="text" />
    </div> 
    <div className='m-auto mt-[30px]'>
        <p className='text-[20px]  text-[#191C1F]'>كلمة المرور</p>
        <input className='min-w-[150px] w-full h-[44px]  border-[1px] border-solid rounded-[2px] border-[#E4E7E9] pr-2' type="password" />
    </div> 
    <div className='m-auto mt-[30px]'>
        <p className='text-[20px]  text-[#191C1F]'>تأكيد كلمة المرور</p>
        <input className='min-w-[150px] w-full h-[44px]  border-[1px] border-solid rounded-[2px] border-[#E4E7E9] pr-2' type="password" />
    </div> 
    <div>
        <button className='min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-[20px] flex justify-center items-center font-bold'>إعادة تعيين كلمة المرور <AiOutlineArrowLeft className="mr-2" /></button>
    </div>   
        
</div>
  )
}

export default resetPass