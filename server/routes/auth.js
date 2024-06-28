const express = require("express");
const { sendOtp, login } = require("../controllers/auth");
const router = express.Router();

router.post("/sendOtp",sendOtp);
router.post("/login",login);

module.exports = router;