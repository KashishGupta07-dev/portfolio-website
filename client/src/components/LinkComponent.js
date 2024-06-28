import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export const LinkComponent = () => {
  return (
    <div className='flex flex-col ml-5 gap-y-4 w-fit mb-10'>
    <Link to={"https://www.linkedin.com/in/kashishguptadtu/"} target="_blank" rel="noopener noreferrer" className=' p-2 group bg-white hover:bg-blue-200 w-fit rounded-full shadow-[0px_0px_10px_8px] shadow-[#E3E8EE]'>
        <FaLinkedin size={"17px"} className='text-richblack-200 group-hover:text-white'/>
        </Link>
        <Link to={"https://github.com/KashishGupta07-dev"} target="_blank" rel="noopener noreferrer" className=' p-2 group bg-white hover:bg-black w-fit rounded-full shadow-[0px_0px_10px_8px] shadow-[#E3E8EE]'>
        <FaGithub size={"17px"} className='text-richblack-200 group-hover:text-white'/>
        </Link>
    </div>
  )
}
