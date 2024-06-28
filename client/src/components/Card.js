import React from 'react'
export const Card = ({cardData}) => {
  return (
    <div className='w-[200px] flex flex-col gap-y-2 font-dmsans rounded-xl hover:scale-110 transition-all duration-300 hover:shadow-[0px_0px_10px_0px] shadow-none shadow-[#EDF2F8] cursor-default'>
        <img src={cardData.image} className='object-cover aspect-square rounded-t-xl' alt='cardimg'/>
        <div className='text-lg font-bold pl-2'>{cardData.title}</div>
        <div className='text-xs text-richblack-500 pl-2 pb-4'>{cardData.description}</div>
    </div>
  )
}
