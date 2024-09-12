"use client"
import { ForgetPassword } from "@/app/auth/schema";
import { Forget } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";

const PhoneValidation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Forget>({ resolver: zodResolver(ForgetPassword) });
      const onsubmit: SubmitHandler<Forget> = (data) => {
        console.log(data);
      };
    return (
    <form onSubmit={handleSubmit(onsubmit)}>
          <input
            {...register("phone")}
            className="min-w-[150px] w-full h-[44px]  border-[1px] border-solid rounded-[2px] border-[#E4E7E9] pr-2"
            type="text"
          />
          {errors.phone?.message && (
            <span className="text-sm text-red-500 ">
              {errors.phone?.message}
            </span>
          )}
          <button className="min-w-[150px] w-full h-[48px] mt-5 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-[20px] flex justify-center items-center">
            إرسال الرمز <AiOutlineArrowLeft className="mr-2" />
          </button>
        </form>
  )
}

export default PhoneValidation