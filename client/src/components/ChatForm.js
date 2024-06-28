import React from 'react'
import { useForm } from 'react-hook-form';
import { RiMailSendFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { LinkComponent } from './LinkComponent';
import { motion } from 'framer-motion';
import {useDispatch} from "react-redux"
import { sendMessageApi } from '../services/operations/contact';
export const ChatForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm();
  function submitHandler(data){
    dispatch(sendMessageApi(data.name,data.email,data.message));
    reset({
      name:"",
      email : "",
      message:""
    })
  }
  return (
    <div id='Contact' className='bg-white w-full h-full mt-3'>
    <motion.div whileInView={{opacity:1,y:[200,0]}} transition={{duration:0.8,ease:"circOut"}} className='w-4/5 mx-auto flex flex-col items-center pt-16 opacity-0'>
      <div className=' font-dmsans font-bold text-5xl'>Take A Coffee & Chat With Me</div>
      <Link to='mailto:kashishgupta_mc25@dtu.ac.in' className='flex flex-row gap-x-3 items-center bg-[#EDF2F8] shadow-sm shadow-[#EDF2F8] py-3 px-6 mt-14 rounded-lg'>
        <RiMailSendFill size={"35px"} className=' text-pink-100'/>
        <div className='font-dmsans font-medium text-sm text-richblack-500'>kashishgupta.y2k5@gmail.com</div>
      </Link>
      <form className='w-4/6 mx-auto mt-16 flex flex-col gap-y-8 items-center  font-vietnam' onSubmit={handleSubmit(submitHandler)}>
          <div className='flex flex-col w-full'>
          <input type='text' placeholder='Please Enter Your Name....' name='name' className='bg-[#EDF2F8] placeholder:font-inter placeholder:font-normal h-[40px] w-full rounded-lg px-4 py-7 outline-none'
            {
              ...register("name",{
                required:{value:true,message:"Please Enter Your Name"}
              })
            }
          />
          {
            errors.name && 
            <span className='mt-1 font-vietnam text-yellow-50 text-sm'>{errors.name.message}</span>
          }
          </div>
          <div className='flex flex-col w-full'>
          <input type="email" placeholder='Please Enter Your Email Address....' name='email'  className='bg-[#EDF2F8] h-[40px] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none'
            {
              ...register("email",{
                required:{value:true,message:"Please Enter Your Email Address"}
              })
            }
          />
          {
            errors.email && 
            <span className='mt-1 font-vietnam text-yellow-50 text-sm'>{errors.email.message}</span>
          }
          </div>
          <div className='flex flex-col w-full'>
          <textarea rows={5} placeholder='Please Enter Your Message' name='message' className='bg-[#EDF2F8] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none' 
            {
              ...register("message",{
                required:{value:true,message:"Please Enter Your Message"}
              })
            }
            style={{
              resize:"none",
            }}
          />
           {
            errors.message && 
            <span className='mt-1 font-vietnam text-yellow-50 text-sm'>{errors.message.message}</span>
          }
          </div>
          <button type='submit' className='bg-[#2430AF] w-fit py-3 px-6 hover:scale-90 shadow-[0px_0px_10px_0px] shadow-blue-100 transition-all duration-200 text-white font-dmsans font-bold rounded-lg'>Send Message</button>
      </form>
      </motion.div>
      <LinkComponent/>
    </div>
  )
}
