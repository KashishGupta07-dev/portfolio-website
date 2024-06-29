const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300
    }
});

otpSchema.post("save",async function(doc,next){
    try{
    await mailSender(doc.email,"Verification Mail From Portfolio Website - Developed By Kashish Gupta",`Your Verification Otp is : ${doc.otp}`);
    next();
    }
    catch(error){
            console.log("Error while sending mail : ",error);
        }
})

module.exports = mongoose.model("OTP",otpSchema);