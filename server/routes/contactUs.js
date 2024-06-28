const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");
const { sendMessage, getAllMessage, deleteMessage } = require("../controllers/contactUs");

router.post("/sendMessage",sendMessage);
router.get("/getAllMessage",auth,getAllMessage);
router.delete("/deleteMessage",auth,deleteMessage);


module.exports = router;