import React, { useEffect } from 'react';
import { TextHighlighter } from './TextHighlighter';
import frontend from "../assets/user/Frontend.png";
import mernStack from "../assets/user/MernStack.png";
import uiUx from "../assets/user/ui_ux.webp";
import backend from "../assets/user/Backend.png";
import { Card } from './Card';
import { LinkComponent } from './LinkComponent';
import { motion, useAnimate, useInView } from 'framer-motion';
export const AboutPage = () => {
    const [scope,animate] = useAnimate();
    const isInView = useInView(scope);
    useEffect(()=>{
        if(isInView){
            animate(scope.current,{
                opacity:1
                ,y:[100,0]
            },{
                transition:{
                    duration:0.6,
                    ease:"circOut"
                }
            })
        }
        // eslint-disable-next-line
    },[isInView])
    const cardsData = [
        {
            title:"Frontend Developer",
            description:"Passionate frontend developer with a love for crafting exceptional user experience interfaces.",
            image:frontend,
        },
        {
            title:"MERN Stack",
            description:"Proficient MERN stack developer with expertise in React, Node, Express, MongoDB for dynamic web solutions.",
            image:mernStack,
        },
        {
            title:"UI/UX",
            description:"Love for crafting beautiful website experiences with creativity, precision, and a dash of magic.",
            image:uiUx,
        },
        {
            title:"Frontend Developer",
            description:"Passionate frontend developer with a love for crafting exceptional user experience interfaces.",
            image:backend,
        }
    ];
  return (
    <div id="About" className='w-full h-full  relative z-10 bg-white'>
        <motion.div ref={scope} className='flex flex-col pt-16 w-[93%] sm:w-4/5 mx-auto opacity-0 items-center'>
        <div className='text-center'>
            <div className='text-black font-bold font-dmsans leading-relaxed text-3xl sm:text-4xl md:text-5xl'>{"I Know That"} <TextHighlighter text={"Good Design"}/> </div>
            <div className='text-black font-bold font-dmsans text-3xl sm:text-4xl md:text-5xl'>{"Means"} <TextHighlighter text={"Good Business"}/> </div>
        </div>
        <motion.div whileInView={{opacity:1,y:[200,0]}} transition={{duration:0.6,ease:"circOut"}} className="flex flex-row justify-center gap-x-6 gap-y-8 w-full flex-wrap mt-14 opacity-0">
        {
            cardsData?.map((card,index)=>(
                <Card cardData = {card} key={index}/>
            ))
        }
        </motion.div>
        </motion.div>
        <LinkComponent/>
    </div>
  )
}
