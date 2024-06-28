import React from 'react'
import cImg from "../assets/stack/0b37fb0814b9d276418a88fb8568bc18c20382ef-480x480.png";
import cppImg from "../assets/stack/cpp.png";
import htmlImg from "../assets/stack/HTML.png";
import cssImg from "../assets/stack/CSS.png";
import tailwindImg from "../assets/stack/Tailwind.png";
import jsImg from "../assets/stack/Javascript.svg";
import reactImg from "../assets/stack/React.png";
import reduxImg from "../assets/stack/Redux.svg"
import chartJsImg from "../assets/stack/ChartJs.svg"
import expressImg from "../assets/stack/8ba1368744cbab56def10b3a98c36147678df133-480x480.png";
import nodeImg from "../assets/stack/node.png";
import mongodbImg from "../assets/stack/MongoDB.svg";
import vercelImg from "../assets/stack/Vercel.svg";
import gitImg from "../assets/stack/Git.svg";
import { LinkComponent } from './LinkComponent';
import { motion } from 'framer-motion';
export const Skills = () => {
    const allISkills = [
        {
            title:"C",
            img:cImg
        },
        {
            title:"C++",
            img:cppImg
        },
        {
            title:"HTML",
            img:htmlImg
        },
        {
            title:"CSS",
            img:cssImg
        },
        {
            title:"Tailwind CSS",
            img:tailwindImg
        },
        {
            title:"JavaScript",
            img:jsImg
        },
        {
            title:"React",
            img:reactImg
        },
        {
            title:"Redux",
            img:reduxImg    
        },
        {
            title:"Chart Js",
            img:chartJsImg
        },
        {
            title:"Express",
            img:expressImg
        },
        {
            title:"Node.js",
            img:nodeImg
        },
        {
            title:"MongoDB",
            img:mongodbImg
        },
        {
            title:"Vercel",
            img:vercelImg
        },
        {
            title:"Git",
            img:gitImg
        }
    ] 
  return (
    <div id='Skills' className='w-full h-full bg-white'>
        <motion.div whileInView={{ opacity:1,y:[80,0]}} transition={{duration:0.6,easings:"cubic-bezier(0.34, 1.56, 0.64, 1)"}}  className='flex flex-col pt-16 w-2/3 mx-auto items-center font-dmsans'>
            <div className='text-5xl font-bold'>Skills</div>
            <div className=' flex flex-row flex-wrap gap-x-8 gap-y-6 justify-center mt-8 cursor-default'>
                {
                    allISkills?.map((skill,index)=>(
                        <div key={index}>
                        <div className='p-6 rounded-full flex justify-center items-center bg-[#EDF2F8] hover:scale-110 transition-all duration-300 hover:shadow-[0px_0px_10px_0px] shadow-none shadow-[#EDF2F8]'>
                        <img src={skill.img} alt='skill' className='w-[55px] h-[55px] object-cover'/>
                        </div>
                            <div className='mt-2 text-center text-richblack-500 font-dmsans text-sm'>{skill.title}</div>
                        </div>
                    ))
                }
            </div>
        </motion.div>
        <LinkComponent/>
    </div>
  )
}
