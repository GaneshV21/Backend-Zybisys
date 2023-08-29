const busreservation=require("../controllers/q1control")

const express=require("express");
const router=express.Router();

router.post("/register",busreservation.register);
router.post("/login",busreservation.login);
router.post("/book",busreservation.book);
router.get("/showbuses",busreservation.showbuses);
router.get("/dashboard",busreservation.dashboard);
router.get("/reg",busreservation.reg)
router.get("/log",busreservation.log);

module.exports = router;