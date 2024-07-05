import React from 'react'
import NameLogo from "../../assets/user/4d9d5da4-5f91-4bf4-9aba-fd4a2329385e.jpg-output.png";
import { motion } from 'framer-motion';
import { CiLogout } from "react-icons/ci";
import { logoutHandler } from '../../services/operations/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className=' fixed w-full backdrop-blur-[4px] py-5 bg-[#F2F5FA] bg-opacity-30 z-[20]'>
    <div className=' w-11/12 flex flex-row items-center ml-6 justify-between'>
        <motion.div whileInView={{ x: [-50, 0] }} transition={{ duration: 0.85, ease: 'easeIn' }} className='flex flex-row items-center relative'>
        <div className='w-[80px] absolute'>
            <img src={NameLogo} alt='NameLogo' className='object-cover'/>
            </div>
            <div className="font-vietnam ml-[3.7rem]">ashish Gupta</div>
        </motion.div>
        <div className='hidden md:block'>
        <div className='flex flex-row gap-x-10 '>
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
        <button className='bg-yellow-50 flex items-center gap-x-2 px-3 py-2 rounded-lg hover:scale-90 transition-all duration-200' onClick={()=>dispatch(logoutHandler(navigate))}>
        {"Logout"} <CiLogout size={"20px"}/></button>
        </div>
    </div>
  )
}
