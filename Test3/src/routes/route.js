const q2=require("../controllers/control")

const express=require("express");
const router=express.Router();

router.post("/register",q2.register);
router.post("/login",q2.login);
router.get("/first",q2.first);
router.get("/reg",q2.reg)
router.get("/log",q2.log);

module.exports = router;