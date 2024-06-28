const express = require("express");
const { createProject, editProject, deleteProject, getAllProjects } = require("../controllers/projectCreation");
const router = express.Router();
const {auth} = require("../middlewares/auth");
router.post("/createProject",auth,createProject);
router.put("/editProject",auth,editProject);
router.delete("/deleteProject",auth,deleteProject);
router.get("/getAllProjects",getAllProjects);

module.exports = router;