import React from 'react'
import NameLogo from "../assets/user/4d9d5da4-5f91-4bf4-9aba-fd4a2329385e.jpg-output.png";
import { motion } from 'framer-motion';
export const NavBar = () => {
  return (
    <div className=' fixed w-full backdrop-blur-[4px] py-5 bg-[#F2F5FA] bg-opacity-30 z-[20]'>
    <div className=' lg:w-3/5 w-11/12 flex flex-row items-center sm:ml-6 justify-center sm:justify-between'>
        <motion.div whileInView={{ x: [-50, 0] }} transition={{ duration: 0.85, ease: 'easeIn' }} className='flex flex-row items-center relative'>
        <div className='w-[80px] absolute'>
            <img src={NameLogo} alt='NameLogo' className='object-cover'/>
            </div>
            <div className="font-vietnam ml-[3.7rem]">ashish Gupta</div>
        </motion.div>
        <div className='w-fit hidden sm:block'>
        <div className='flex flex-row gap-x-5'>
          {
            ["Home","About","Work","Skills","Contact"].map((link,index)=>(
            <a
            href={`#${link}`}
            className="uppercase gap-y-[1px] cursor-pointer text-xs flex flex-col items-center w-fit text-richblack-400 font-medium font-inter group transition-all duration-100"
            key={index} 
            >
              <div className='w-[5px] h-[5px] bg-[#313bac] rounded-full opacity-0 group-hover:opacity-100'></div>
              <div className=' group-hover:text-black'>{link}</div>
              </a>
            ))
          }
        </div>
        </div>
        </div>
    </div>
  )
}
