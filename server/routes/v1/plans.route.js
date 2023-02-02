const express = require("express");
const plansControllers = require("../../controllers/plans.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router.route("/")
    .get(plansControllers.getAllPlansController)
    .post(verifyToken, authorization("admin"), plansControllers.createNewPlanController);

router.route("/:id")
    .get(plansControllers.getPlanByIdController)
    .patch(verifyToken, authorization("admin"), plansControllers.updatePlanByIdController)
    .delete(verifyToken, authorization("admin"), plansControllers.deletePlanByIdController);

module.exports = router;