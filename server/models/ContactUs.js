const mongoose = require("mongoose");
const sendMail = require("../utils/mailSender")
const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})


contactUsSchema.post("save",async function(doc){
    await sendMail(doc.email,"Thanks For Contacting Us","We Have Recieved Your Message We Will Contact You As Soon As Possible")
})



module.exports = mongoose.model("ContactUs",contactUsSchema);