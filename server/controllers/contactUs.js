const ContactUs = require("../models/ContactUs");

exports.sendMessage = async(request,response)=>{
    try{
        const {name,email,message} = request.body;
        if(!name || !email || !message){
            return response.status(400).json({
                success:false,
                message:"All Fields Required",
            })
        }
        const createContact = await ContactUs.create({
            name,
            email,
            message
        })
        return response.status(200).json({
            success:true,
            message:"Message Sent Successfully",
            createContact,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Erorr in creating contact",
            error:error,
        })
    }
}



exports.getAllMessage = async(request,response)=>{
    try{
        const allMessages = await ContactUs.find({});
        if(!allMessages){
            return response.status(400).json({
                success:false,
                message:"No Messages Found",
            });
        }
        return response.status(200).json({
            success:true,
            message:"All messages fetched successfully",
            allMessages
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Erorr in fetching contact messages",
            error:error,
        })
    }
}




exports.deleteMessage = async(request,response)=>{
    try{    
        const {messageId} = request.body;
        if(!messageId){
            return response.status(400).json({
                success:false,
                message:"Message Id Required",
            });
        }
        const message = await ContactUs.findById(messageId);
        if(!message){
            return response.status(400).json({
                success:false,
                message:"Message Not Found",
            });
        }
        await ContactUs.findByIdAndDelete(messageId);
        return response.status(200).json({
            success:true,
            message:"Message Deleted successfully ",
        });
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Erorr in deleting messages",
            error:error,
        })
    }
}