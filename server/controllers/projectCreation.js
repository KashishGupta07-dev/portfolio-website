const Project = require("../models/Projects");
const Profile = require("../models/Profile");
const fileUploader = require("../utils/fileUploader");
require("dotenv").config();
exports.createProject = async(request,response)=>{
    try{
        const {tag,title,desc,repository,domain} = request.body;
        const image = request.files.image;
        const profileId = request.profile.id;
        if(!tag || !title || !desc || !repository || !domain || !image || !profileId){
            return response.status(400).json({
                success:false,
                message:"All Fields Required",
            })
        }
        const uploadedImg = await fileUploader(image,process.env.FOLDER_NAME);
        const createProject = await Project.create({
            tag,
            title,
            desc,
            repository,
            domain,
            imgUrl:uploadedImg.secure_url,
        });
        const updatedProfile = await Profile.findByIdAndUpdate(profileId,{$push:{projects:createProject._id}},{new:true}).populate("projects");
        return response.status(200).json({
            success:true,
            message:"Project Created Successfully",
            updatedProfile,
            createProject,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Project Creation Failed",
            error:error,
        })
    }
}


exports.editProject = async(request,response)=>{
    try{
        const {tag,title,desc,repository,domain,projectId} = request.body;
        if(!projectId){
            return response.status(400).json({
                success:false,
                message:"Project Id Required",
            })
        }
        const project = await Project.findById(projectId);
        if(!project){
            return response.status(400).json({
                success:false,
                message:"Project Not Found",
            })
        }
        if(tag){
            project.tag = tag;
        }
        if(title){
            project.title = title;
        }
        if(desc){
            project.desc = desc;
        }
        if(repository){
            project.repository = repository;
        }
        if(domain){
            project.domain = domain
        }
        if(request.files && request.files.image){
        const image = request.files.image;
        const profileId = request.profile.id;
        const uploadedImg = await fileUploader(image,process.env.FOLDER_NAME);
        project.imgUrl = uploadedImg.secure_url;
        }
        await project.save();
        const updatedProject = await Project.findById(projectId);
        return response.status(200).json({
            success:true,
            message:"Project Updated Successfully",
            updatedProject,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Erorr in updation of project",
            error:error,
        })
    }
}


exports.deleteProject = async(request,response)=>{
    try{
        const {projectId} = request.body;
        const profileId = request.profile.id;
        if(!projectId){
            return response.status(400).json({
                success:false,
                message:"Project Id Required",
            })
        }
        const project = await Project.findById(projectId);
        if(!project){
            return response.status(400).json({
                success:false,
                message:"Project Not Found",
            })
        }
        await Project.findByIdAndDelete(projectId);
        const updatedProfile = await Profile.findByIdAndUpdate(profileId,{$pull:{projects:projectId}},{new:true});
        return response.status(200).json({
            success:true,
            message:"Project Deleted Successfully",
            updatedProfile
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Erorr in deletion of project",
            error:error,
        })
    }
}


exports.getAllProjects = async(request,response)=>{
    try{
        const allProjects = await Project.find({});
        if(!allProjects){
            return response.status(400).json({
                success:false,
                message:"Project Not Found",
            })
        }
        return response.status(200).json({
            success:true,
            message:"Project Finding Successful",
            allProjects,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Project Fetching Error",
            error:error,
        })
    }
}

