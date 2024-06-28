const express  = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const dbConnection = require("./config/dbConnection");
const connectCloudinary = require("./config/connectCloudinary");
const profileRoutes = require("./routes/profile");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const contactUs = require("./routes/contactUs");
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
	tempFileDir:"/tmp",
}))
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})
app.get("/",(request,response)=>{
     response.send("Hello kya haal chaal");
})
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/project",projectRoutes);
app.use("/api/v1/contact",contactUs);
dbConnection();
connectCloudinary();