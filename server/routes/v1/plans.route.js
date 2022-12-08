const express = require("express");
const plansControllers = require("../../controllers/plans.controller");

const router = express.Router();

router.route("/").get(plansControllers.getAllPlansController);
router.route("/:id").get(plansControllers.getPlanByIdController);

module.exports = router;