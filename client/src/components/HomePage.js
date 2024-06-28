import { motion } from 'framer-motion'
import React from 'react'
import coderImage from "../assets/user/profile.d9ea36be8a56fb1b1e1e.png"
import circle from "../assets/user/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"
import mongoDb from "../assets/stack/MongoDB.svg"
import reactImg from "../assets/stack/$R4LG4O0.svg"
import expressImg from "../assets/stack/8ba1368744cbab56def10b3a98c36147678df133-480x480.png";
import { LinkComponent } from './LinkComponent'
export const HomePage = () => {
  return (
    <div id="Home" className='w-full h-full overflow-hidden'>
        <div className='pt-24 flex flex-row w-4/5 mx-auto'>
        {/*Section -1 Hi Hello Part */}
        <motion.div whileInView={{translateX:[-150,0]}} transition={{ duration: 0.85, ease: 'easeIn' }} className=' flex flex-col items-end w-fit h-fit'>
        <div className='flex flex-row gap-x-5 items-center pl-5 pr-5 py-7  cursor-default shadow-[0px_0px_10px_8px] shadow-[#E3E8EE] bg-white w-fit rounded-xl'>
            <div className='text-4xl'>👋</div>
            <div className='flex flex-col font-inter gap-y-3'>
                <div className=' text-richblack-500 text-xs  '>Hello,I am</div>
                <div className='text-3xl font-bold'>Kashish Gupta</div>
                </div>
            </div>
            <div className='pl-8 pr-4 py-4 flex flex-col shadow-[0px_0px_10px_8px] mt-14 shadow-[#E3E8EE] bg-white w-fit rounded-2xl text-end text-richblack-500'>
                <div>
                    Full Stack
                </div>
                <div>
                    Web Developer
                </div>
            </div>
        </motion.div>
        {/*Section - 2 User Image */}
        <div className='w-fit ml-10 mt-16 relative flex items-center justify-center'>
        <motion.img  src={circle}  whileInView={{ scale: [0, 1] }} transition={{ duration: 0.85, ease: "circOut" }} alt='circle' className='w-[350px] h-[350px] '/>
        <motion.div  whileInView={{ opacity: [0, 1] }} transition={{ duration: 0.5, delayChildren: 0.5 }} className='absolute top-0  w-[400px] h-[400px] z-[10]'>
            <motion.img whileInView={{ scale: [0, 1] }} transition={{ duration: 1, ease: 'easeInOut' }} src={coderImage} alt='coder' className='object-cover'/>
        </motion.div>
        </div>
            {/*Section - 3 Logos */}
            <motion.div whileInView={{ scale: [0, 1] }}  transition={{ duration: 2, ease: "circOut" }}   className='flex flex-col items-start justify-between ml-20'>
                <img  src={expressImg} alt='express' className='p-4 bg-white rounded-full w-[90px] h-[90px] hover:scale-110 transition-transform duration-300  shadow-[0px_0px_10px_8px] shadow-[#E3E8EE]'/>
                <img  src={reactImg} alt='react' className=' bg-white rounded-full w-[150px] h-[150px] hover:scale-110 transition-transform duration-300  shadow-[0px_0px_10px_8px] shadow-[#E3E8EE] ml-10'/>
                <img  src={mongoDb} alt='mongodb' className='p-4 bg-white rounded-full w-[90px] h-[90px] hover:scale-110 transition-transform duration-300 shadow-[0px_0px_10px_8px] shadow-[#E3E8EE]'/>
            </motion.div>
        </div>
        <LinkComponent/>
    </div>
  )
}
