const express = require("express");
const router = express.Router();

const MainPageController = require("../controllers/mainpage");

router.get("/signup", MainPageController.get_services);

module.exports = router;
