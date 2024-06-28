const express = require("express");
const { updateProfile } = require("../controllers/updateProfile");
const router = express.Router();
const {auth} = require("../middlewares/auth");
router.put("/updateProfile",auth,updateProfile);

module.exports = router;