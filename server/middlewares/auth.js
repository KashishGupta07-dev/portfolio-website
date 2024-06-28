const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = async(request,response,next)=>{
    try{
        const token =  request.cookies.token || request.header("Authorization").replace("Bearer ","") || request.body.token  ;
        if(!token){
        return response.status(400).json({
            success:false,
            message:"Token Not Found",
        });
    }
    try{
    const payload = jwt.verify(token,process.env.JWT_SECRET);
        request.profile = payload,
        next();
}catch(error){
    console.error("Token verification failed:", error);
    return response.status(401).json({
        success: false,
        message: "Invalid Token",
        error
    });
}
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in token verification",
            error
        })
    }
}
