import React from 'react'
import editImg from "../../assets/user/profiling-concept-illustration.png";
import { useForm } from 'react-hook-form';
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProfileApi } from '../../services/operations/auth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const {
      register,
      handleSubmit,
      reset,
      formState:{errors}
    } = useForm();
    function submitHandler(data){
        dispatch(editProfileApi(data.firstName,data.lastName,token,navigate));
        reset({
          firstName:"",
          lastName:""
        })
    }
    const sideLinks = [
      {
        title:"Dashboard",
        path:"/admin/dashboard/project-dashboard"
      },{
        title:"Edit Profile",
        path:"/admin/dashboard/edit-profile"
      },
      {
        title:"Messages",
        path:"/admin/dashboard/contact-message"
      }
    ]
  return (
    <div className='bg-[#EDF2F8] min-h-screen'>
    <motion.div  whileInView={{y:[100,0],opacity:[0,1]}} transition={{duration:0.8,ease:"backInOut"}}  className='pt-20 w-11/12 mx-auto'>
        <div className='flex flex-col lg:flex-row'>
    <img src={editImg} alt='edit' className='self-center w-full lg:w-[45%] h-fit max-h-[550px] object-contain'/>
    <form className='lg:w-[45%] mx-auto mt-16 flex flex-col gap-y-8 font-vietnam' onSubmit={handleSubmit(submitHandler)}>
      <div className='mb-8 text-4xl text-center sm:text-5xl font-dmsans font-bold'>{"🫡"}<span className="text-caribbeangreen-300">Edit Profile</span> {" Page"}</div>
          <div className='flex flex-col w-full'>
          <div>First Name: </div>
          <input type="text" placeholder='Please Enter Your First Name....' name='firstName'  className=' h-[40px] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none'
            {
              ...register("firstName",{
                required:{value:true,message:"Please Enter Your First Name"}
              })
            }
          />
          {
            errors.firstName && 
            <span className='mt-1 font-vietnam text-pink-200 text-sm'>{errors.firstName.message}</span>
          }
          </div>
          <div className='flex flex-col w-full'>
          <div>Last Name: </div>
          <input type="text" placeholder='Please Enter Your Last Name....' name='lastName'  className=' h-[40px] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none'
            {
              ...register("lastName",{
                required:{value:true,message:"Please Enter Your Last Name"}
              })
            }
          />
          {
            errors.lastName && 
            <span className='mt-1 font-vietnam text-pink-200 text-sm'>{errors.lastName.message}</span>
          }
          </div>
          <button type='submit' className='bg-pink-200 flex items-center gap-x-2 mx-auto w-fit py-3 px-6 hover:scale-90 shadow-[0px_0px_10px_0px] shadow-blue-100 transition-all duration-200 text-white font-dmsans font-bold rounded-lg'>{"Edit"}
          <span><FaEdit size={"20px"}/></span></button>
      </form>
    </div>
        </motion.div>
        <div className="block md:hidden py-5 mt-5 bg-white bg-opacity-35 backdrop-blur-sm">
        <div className='flex flex-row gap-x-10 mx-auto justify-center'>
          {
            sideLinks.map((link,index)=>(
            <Link
            to={link.path}
            className="uppercase gap-y-[1px] cursor-pointer text-xs flex flex-col items-center w-fit text-richblack-400 font-medium font-inter group transition-all duration-100"
            key={index} 
            >
              <div className='w-[5px] h-[5px] bg-[#313bac] rounded-full opacity-0 group-hover:opacity-100'></div>
              <div className=' group-hover:text-black'>{link.title}</div>
              </Link>
            ))
          }
        </div>
        </div>
    </div>
  )
}
