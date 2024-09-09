import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

const resetPass = () => {
  return (
    <div className='m-auto mt-28 min-w-[100px] max-w-[424px] min-h-[50px] p-[32px] rounded-[4px] border-solid border-[1px] border-[#E4E7E9] shadow-lg drop-shadow-sm shadow-[#0000001F]'>
    <h1 className='m-auto text-[28px] text-center font-bold mt-2'>تأكيد رقم الجوال</h1>
    <div className='m-auto mt-[30px] flex justify-between'>
        <p className='text-[20px]  text-[#191C1F]'>رمز التفعيل</p>
    </div> 
    <div>
        <input className='min-w-[150px] w-full h-[44px]  border-[1px] border-solid rounded-[2px] border-[#E4E7E9]' type="text" />
        <button className='min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-[20px] flex justify-center items-center'> <AiOutlineArrowRight className="ml-3" />تأكيـــد</button>
    </div>   
        
</div>)
}

export default resetPass