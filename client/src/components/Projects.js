import React, { useEffect, useState } from 'react'
import { TextHighlighter } from './TextHighlighter'
import { ProjectCard } from './ProjectCard';
import { motion, useAnimate, useInView } from 'framer-motion'; 
import { LinkComponent } from './LinkComponent';
export const Projects = ({projects}) => {
    const [selectedCategory,setSelectedCategory] = useState("Mern");
    const [scope,animate] = useAnimate();
    const isInView = useInView(scope);
    useEffect(()=>{
        if(isInView){
            animate(scope.current,{
                opacity:1,
                y:[80,0]
            },{
                transition:{
                    duration:1,
                    easings:"cubic-bezier(0.5, 0, 0.75, 0)",
                }
            })
        }
    })
  return (
    <div id='Work'  className=' w-full h-full bg-[#EDF2F8]'>
        <motion.div whileInView={{ opacity:1,y:[80,0]}} transition={{duration:0.65,easings:"cubic-bezier(0.5, 0, 0.75, 0)"}} className='flex flex-col opacity-0 pt-16 w-[93%] sm:w-4/5 mx-auto items-center'>
        <div className='text-black font-bold font-dmsans leading-relaxed text-3xl sm:text-4xl md:text-5xl text-center'>{"My Creative"} <TextHighlighter text={"Portfolio"}/> {"Section"}</div>
        <div className='flex flex-row gap-x-4 mt-6'>
            {
                ["Mern","Web","React","All"].map((category,index)=>{
                    return(
                        <div key={index} className={`cursor-pointer transition-all duration-300 ${selectedCategory === category ? "bg-[#313BAC] text-white" : "bg-white text-black"} rounded-lg py-2 px-4 hover:bg-[#313BAC] font-bold hover:text-white`} onClick={()=>setSelectedCategory(category)}>{category}</div>
                    )
                })
            }
        </div>
        <motion.div ref={scope} className='flex flex-row flex-wrap gap-x-10 gap-y-8 mt-10 opacity-0'>
            {
              (selectedCategory!== "All" ? projects?.filter((project)=>String(project?.tag) === selectedCategory) : projects)?.map((project,index)=>(
                    <ProjectCard project={project} key={index}/>
                ))
            }
        </motion.div>
        </motion.div>
        <LinkComponent/>
    </div>
  )
}
