import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageAfterReplyApi, getAllMessageApi } from "../../services/operations/contact";
import { MdDelete } from "react-icons/md";
import { FaReply } from "react-icons/fa";
import { Link } from "react-router-dom";
export const ContactMessage = () => {
  const [contactMessages, setContactMessages] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMessageApi(token, setContactMessages));
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
    <div className="bg-[#EDF2F8] min-h-screen flex flex-col justify-between">
      <div className="pt-20 w-5/6 mx-auto">
        <div className="text-2xl sm:text-4xl font-vietnam font-bold text-center">
          Messages Left For Reply :{" "}
        </div>
       {contactMessages?.length>0 ? <div className="flex flex-row flex-wrap gap-x-6 mt-14 gap-y-6 justify-center">
        {contactMessages?.map((message) => (
          <div
            className="rounded-lg flex flex-col bg-[#fff] min-w-[240px] px-4 py-5 gap-y-6 w-fit"
            style={{
              boxShadow: "0 2px 5px #ccc",
            }}
          >
            <div className="sm:text-lg flex flex-col gap-y-2 font-dmsans">
              <div className="text-sm sm:text-base font-bold leading-none">{"Name : "}{message?.name}</div>
              <div className="text-sm sm:text-base text-pink-200">{"Email Address : "}{message?.email}</div>
              <div className="text-sm sm:text-base">{"Message : "}{message?.message}</div>
            </div>
            <div className="flex flex-row justify-between w-full">
            <Link to={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${message.email}`} target="_blank" className="flex flex-row items-center gap-x-2">
                <FaReply/>
                <div>Reply</div>
            </Link>
            <button
              className="text-yellow-50 px-2 py-2 bg-pure-greys-25 w-fit rounded-lg"
              onClick={() => {
                dispatch(deleteMessageAfterReplyApi(token,message._id,setContactMessages));
              }}
            >
              <MdDelete size={"30px"} />
            </button>
            </div>
          </div>
        ))}
      </div> : <div className="text-center sm:text-xl font-vietnam flex items-center justify-center mt-40">😀Awesome!! No Messages Left For Reply</div>
       }
      </div>
      <div className="block md:hidden py-5 mt-5 bg-white bg-opacity-35 backdrop-blur-sm">
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
