const {
    createNewUserService,
    updateUserByEmailService,
    getUserByEmailService,
    getUsersService
} = require("../services/users.service");
const queryProcessor = require("../utils/queryProcessor");

exports.createNewUserController = async (req, res) => {
    try {
        const result = await createNewUserService(req.body);

        res.status(200).json({
            status: "success",
            message: "User created successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to create user",
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

exports.getUserByEmailController = async (req, res) => {
    try {
        const result = await getUserByEmailService(req.params.email);

        res.status(200).json({
            status: "success",
            message: "User found successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find user",
            error: error.message
        });
    }
};

exports.getUsersController = async (req, res) => {
    const [filters, queries] = queryProcessor(req.query);

    try {
        const result = await getUsersService(filters, queries);

        res.status(200).json({
            status: "success",
            message: "Users found successfully",
            data: result.users,
            count: result.count
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find users",
            error: error.message
        });
    }
};
