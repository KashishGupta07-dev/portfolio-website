const OTP = require("../models/OtpSchema");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.sendOtp = async(request,response)=>{
    try{
        const {email,password} = request.body;
        if(!email || !password){
            return response.status(403).json({
                success:false,
                message:"All Fields Are Required",
            })
        }
        if(email !== process.env.EMAIL){
            return response.status(400).json({
                success:false,
                message:"Email Not Match",
            })
        }
        if(!await bcrypt.compare(password,process.env.PASSWORD)){
            return response.status(400).json({
                success:false,
                message:"Password Not Match",
            });
        }
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        let result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp});
        }

        const generatedOtpDetails = await OTP.create({
            email,
            otp,
        });
        return response.status(200).json({
            success:true,
            message:"otp sent successfully",
            otpDetails : generatedOtpDetails,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in sending otp",
            error:error,
        })
    }
}


exports.login = async(request,response)=>{
    try{
        const {email,otp} = request.body;
        if(!email || !otp){
            return response.status(403).json({
                success:false,
                message:"All Fields Are Required",
            })
        }
        const originalOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(!originalOtp?.[0]){
            return response.status(400).json({
                success:false,
                message:"OTP Not Found In Database",
            })
        }
        if(Number(originalOtp[0].otp) !== Number(otp)){
                return response.status(400).json({
                    success:false,
                    message:"OTP Not Match",
                })
        }
        const profileDetails = await Profile.findOne({email});
        if(profileDetails){
            const payload = {
                id:profileDetails._id,
                email:profileDetails.email,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            profileDetails.token = token;
            return response.cookie("token",token,{
                expires: new Date(Date.now() + 2*60*60*1000),
                httpOnly:true,
            }).status(200).json({
                success:true,
                message:"Login Successful",
                token,
                profileDetails,
            });
        };
        const createProfile = await Profile.create({
            email:email,
            projects:[],
            firstName:null,
            lastName : null,
        });
        const payload = {
            id:createProfile._id,
            email:createProfile.email,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        })
        createProfile.token = token;
        return response.cookie("token",token,{
            expires: new Date(Date.now() + 2*60*60*1000),
            httpOnly:true,
        }).status(200).json({
            success:true,
            message:"Login Successful",
            token,
            profileDetails,
        });
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Login Unsuccessful",
            error:error,
        })
    }
}