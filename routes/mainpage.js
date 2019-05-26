const express = require("express");
const router = express.Router();

const MainPageController = require("../controllers/mainpage");

router.get("/getservices", MainPageController.get_services);
router.post("/addservice", MainPageController.add_service);
module.exports = router;
