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
  return (
    <div className="bg-[#EDF2F8] min-h-screen">
      <div className="pt-20 w-5/6 mx-auto">
        <div className="text-4xl font-vietnam font-bold text-center">
          Messages Left For Reply :{" "}
        </div>
       {contactMessages?.length>0 ? <div className="flex flex-row flex-wrap gap-x-6 mt-14 gap-y-6">
        {contactMessages?.map((message) => (
          <div
            className="rounded-lg flex flex-col bg-[#fff] min-w-[240px] px-4 py-5 gap-y-6 w-fit"
            style={{
              boxShadow: "0 2px 5px #ccc",
            }}
          >
            <div className="text-lg flex flex-col gap-y-2 font-dmsans">
              <div className="font-bold leading-none">{"Name : "}{message?.name}</div>
              <div className="text-pink-200">{"Email Address : "}{message?.email}</div>
              <div>{"Message : "}{message?.message}</div>
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
      </div> : <div className="text-xl font-vietnam flex items-center justify-center mt-40">😀Awesome!! No Messages Left For Reply</div>
       }
      </div>
    </div>
  );
};
