const Profile = require("../models/Profile");

exports.updateProfile = async(request,response)=>{
    try{
        const {firstName,lastName} = request.body;
    if(!firstName && !lastName){
        return response.status(400).json({
            success:false,
            message:"Atleast One Field Required",
        })
    }
    const profileId = request.profile.id;
    const profile = await Profile.findById(profileId);
    if(firstName){
        profile.firstName = firstName;
    }
    if(lastName){
        profile.lastName = lastName;
    }
    await profile.save();
    const updatedProfile = await Profile.findById(profileId).populate("projects");
    return response.status(200).json({
        success:true,
        message:"Profile Updated Successfully",
        updatedProfile
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in profile updation",
            error:error,
        })
    }
}