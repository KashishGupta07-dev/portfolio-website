import React from 'react'
import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProjectApi } from '../services/operations/project';
export const ProjectCard = ({project,editing,setLoading,setProjects,setShowModal}) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  function deleteHandler(){
    setLoading(true);
    dispatch(deleteProjectApi(project._id,token,setProjects,setLoading));
  }
  return (
    <div className='flex flex-col w-[270px] bg-white p-4 font-dmsans rounded-xl mx-auto cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-[0px_0px_10px_0px] shadow-none shadow-[#EDF2F8] '>
        <div className='relative'>
            <div className='group relative'>
            <img src={project.imgUrl} className='object-cover aspect-square rounded-xl' alt='project'/>
            <div className='w-full aspect-square flex flex-row gap-x-8 bg-black bg-opacity-50 backdrop-blur-[1px] rounded-xl justify-center items-center absolute top-0 left-0 bottom-0 right-0 opacity-0 group-hover:opacity-100'>
              <Link to={project.domain} target='_blank' className='text-[#030303] bg-opacity-80 bg-white p-3 h-fit w-fit rounded-full'>
                  <FaEye size={"25px"}/>
                  </Link>
                  <Link to={project.repository} target='_blank' className='text-[#030303] bg-opacity-80 bg-white p-3 h-fit w-fit rounded-full'>
                  <FaGithub size={"25px"}/>
                  </Link>
            </div>
            </div>
            <div className='absolute -bottom-2 text-richblack-800 left-[50%] text-sm -translate-x-[50%] bg-white px-4 py-2 rounded-t-xl z-[2]'>{project.tag}</div>
        </div>
        <div className='text-center mt-5 text-sm font-bold font-dmsans'>{project.title}</div>
        <div className='text-center mt-2 text-xs text-richblack-500'>{project.desc}</div>
      {  editing && <div className='flex flex-row items-center justify-around mt-4 gap-x-8'>
        <MdModeEdit size={"24px"} className="hover:text-caribbeangreen-100 transition-all duration-300" onClick={()=>setShowModal({
          text:"🚀Editing Project",
          projectData:project
        })}/>
       <MdDelete size={"24px"} className="hover:text-pink-200 transition-all duration-300" onClick={deleteHandler}/>
        </div>
      }
    </div>
  )
}
