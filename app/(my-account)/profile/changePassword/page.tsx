import React from 'react'
import ChangePassForm from './components/ChangePassForm'

function ChangePassword() {
  return (
    <div>
      <div className="m-auto my-24 min-w-[100px] max-w-[424px] min-h-[50px] p-[32px] rounded-[4px] border-solid border-[1px] border-[#E4E7E9] shadow-lg drop-shadow-sm shadow-[#0000001F]">
        <h1 className="m-auto text-base  font-bold mt-2">
        تغيير  كلمة المرور
        </h1>
        <ChangePassForm />
      </div>
      
    </div>
  )
}

export default ChangePassword