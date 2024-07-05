import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextHighlighter } from "../TextHighlighter";
import { getAllProjectsApi } from "../../services/operations/project";
import { ProjectCard } from "../ProjectCard";
import { IoAddOutline } from "react-icons/io5";
import { ProjectForm } from "./ProjectForm";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";
export const ProjectDashboard = () => {
  const { profile } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showModal,setShowModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getAllProjectsApi(setProjects, setLoading));
    // eslint-disable-next-line
  }, []);
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
      loading ? <Spinner/> : <div className="min-h-screen bg-[#EDF2F8]">
        <div className="pt-24 w-3/4 mx-auto">
          <div className=" text-2xl sm:text-3xl md:text-5xl font-bold font-vietnam text-center">
            {"👋 Hello,"}{" "}
            <TextHighlighter
              text={`${profile?.firstName} ${profile?.lastName}`}
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-4xl font-bold font-vietnam text-center mt-3">
            Welcome To The <TextHighlighter text={"Dashboard"} /> 😊
          </div>
        </div>
        <div className="flex flex-row w-11/12 md:w-4/5 justify-between mx-auto mt-20 items-center">
          <div className="text-2xl md:text-4xl text-center font-vietnam font-bold">All Projects :  </div>
          <button className="bg-pink-200 w-fit font-bold font-dmsans md:text-lg px-4 flex items-center gap-x-2 text-white py-2 rounded-lg" onClick={()=>setShowModal({
            text:"🥳Add Project"
          })}><IoAddOutline/> {"Add Project"}</button>
          </div>
        {projects?.length>0 ? <div className="w-11/12 md:w-4/5 mx-auto flex flex-col mt-20">
          {/*Projects Section */}
          <div className="flex flex-row flex-wrap gap-x-16 gap-y-12 mt-2 mb-8 justify-center">
          {
             projects?.map((project)=>(
                <div key={project?._id}>
                    <ProjectCard project={project} editing={true} setLoading={setLoading} setProjects={setProjects} showModal={showModal} setShowModal={setShowModal} />
                    </div>
                ))
            }
          </div>
        </div>:<div className="text-center justify-center flex mt-10 text-2xl font-bold font-inter">🥹 No Projects Found !! Click Above <div className="rotate-180">👇</div> To Add Project </div>
        }
        {
          showModal && <ProjectForm title={showModal.text} setShowModal={setShowModal} setProjects={setProjects} setLoading={setLoading} showModal={showModal} />
        }
        <div className="block md:hidden py-5 bg-white bg-opacity-35 backdrop-blur-sm">
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
  );
};
