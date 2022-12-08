const express = require("express");
const plansControllers = require("../../controllers/plans.controller");

const router = express.Router();

router.route("/").get(plansControllers.getAllPlansController);

module.exports = router;