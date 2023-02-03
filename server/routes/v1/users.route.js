const express = require("express");
const usersController = require("../../controllers/users.controller");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router.route("/")
    .post(usersController.createNewUserController)
    .get(usersController.getUsersController);

router.route("/id/:id")
    .patch(verifyToken, usersController.updateUserByIdController)
    .delete(verifyToken, usersController.deleteUserByIdController);

router.route("/email/:email").get(usersController.getUserByEmailController);

module.exports = router;
