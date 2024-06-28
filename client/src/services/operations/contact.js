import { contactApi } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
export const sendMessageApi = (name,email,message)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                contactApi.SEND_MESSAGE_API,
                {
                    name,
                    email,
                    message,
                }
              );
              const success = response?.data?.success;
              const text = response?.data?.message;
              if (!success) {
                toast.error(text);
                console.log(text);
                return;
              }
              toast.success("Message Sent Successfully");
        }catch(error){
            console.log("Error in Sending Message : ", error);
            toast.error(error?.response?.data?.message);
        }
        toast.remove(toastId);
    }
}


export const getAllMessageApi = (token,setContactMessages)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "GET",
                contactApi.GET_ALL_MESSAGE_API,null,
                {
                    Authorization : `Bearer ${token}`
                }
              );
              const success = response?.data?.success;
              const text = response?.data?.message;
              if (!success) {
                toast.error(text);
                console.log(text);
                return;
              }
            setContactMessages(response?.data?.allMessages);
        }catch(error){
            console.log("Error in Getting All Message : ", error);
            toast.error(error?.response?.data?.message);
        }
        toast.remove(toastId);
    }
}



export const deleteMessageAfterReplyApi = (token,messageId,setContactMessages)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "DELETE",
                contactApi.DELETE_MESSAGE_API,{
                    messageId
                },
                {
                    Authorization : `Bearer ${token}`
                }
              );
              const success = response?.data?.success;
              const text = response?.data?.message;
              if (!success) {
                toast.error(text);
                console.log(text);
                return;
              }
            setContactMessages((prevContactMessage)=>prevContactMessage?.filter((message)=>message?._id !== messageId));
            toast.success("Message Deleted Successfully");
        }catch(error){
            console.log("Error in Deleting Message : ", error);
            toast.error(error?.response?.data?.message);
        }
        toast.remove(toastId);
    }
};


