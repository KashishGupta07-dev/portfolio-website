import React from 'react'
import loginImg from "../../assets/user/4957136.jpg";
import { useForm } from 'react-hook-form';
import { TextHighlighter } from '../TextHighlighter';
import { CiLogin } from "react-icons/ci";
import { setLoginData } from '../../reducers/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtpApi } from '../../services/operations/auth';
import { motion } from 'framer-motion';
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm();
  function submitHandler(data){
    dispatch(sendOtpApi(data.email,data.password,navigate));
    dispatch(setLoginData(data));
    reset({
      email : "",
      password:"",
    })
  }
  return (
      <div>
    <div className='flex flex-col lg:flex-row justify-between w-11/12 mx-auto my-auto h-full mt-2 items-start'>
      <motion.img src={loginImg} whileInView={{x:[-200,0]}} transition={{duration:0.85,ease:"easeIn"}} alt='login' className=' self-center w-full lg:w-[45%] h-fit max-h-[550px] object-contain'/>
      <motion.form whileInView={{x:[200,0]}} transition={{duration:0.85,ease:"easeIn"}} className='lg:w-[45%] mx-auto mt-16 flex flex-col gap-y-8 font-vietnam' onSubmit={handleSubmit(submitHandler)}>
      <div className='mb-8 text-4xl text-center sm:text-5xl font-dmsans font-bold'><TextHighlighter text={"Admin"}/> {"Login Page"}</div>
          <div className='flex flex-col w-full'>
          <div>Email Address: </div>
          <input type="email" placeholder='Please Enter Your Email Address....' name='email'  className='bg-[#EDF2F8] h-[40px] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none'
            {
              ...register("email",{
                required:{value:true,message:"Please Enter Your Email Address"}
              })
            }
          />
          {
            errors.email && 
            <span className='mt-1 font-vietnam text-pink-200 text-sm'>{errors.email.message}</span>
          }
          </div>
          <div className='flex flex-col w-full'>
          <div>Password : </div>
          <input type='password' placeholder='Please Enter Your Password....' name='password' className='bg-[#EDF2F8] placeholder:font-inter placeholder:font-normal h-[40px] w-full rounded-lg px-4 py-7 outline-none'
            {
              ...register("password",{
                required:{value:true,message:"Please Enter Your Password"}
              })
            }
          />
          {
            errors.password && 
            <span className='mt-1 font-vietnam text-pink-200 text-sm'>{errors.password.message}</span>
          }
          </div>
          <button type='submit' className='bg-[#2430AF] flex items-center gap-x-2 mx-auto w-fit py-3 px-6 hover:scale-90 shadow-[0px_0px_10px_0px] shadow-blue-100 transition-all duration-200 text-white font-dmsans font-bold rounded-lg'>{"Login"}
          <span><CiLogin size={"20px"}/></span></button>
      </motion.form>
    </div>
    </div>
  )
}
