const { createNewUserService, updateUserByEmailService } = require("../services/users.service");

exports.createNewUserController = async (req, res) => {
    try {
        const result = await createNewUserService(req.body);

        res.status(200).json({
            status: "success",
            message: "User created/updated successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to create/update user",
            error: error.message
        });
    }
};

exports.updateUserByEmailController = async (req, res) => {
    try {
        const result = await updateUserByEmailService(req.params.email, req.body);

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to update user",
            error: error.message
        });
    }
};
