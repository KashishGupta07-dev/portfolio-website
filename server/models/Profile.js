const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Projects",
    }] ,
    email:{
        type:String,
    }
})


module.exports = mongoose.model("Profile",profileSchema);