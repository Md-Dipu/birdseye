const {
    createNewUserService,
    updateUserByIdService,
    getUserByEmailService,
    getUsersService,
    deleteUserByIdService
} = require("../services/users.service");
const { queryParser } = require("../utils/queryParser");

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

exports.updateUserByIdController = async (req, res) => {
    try {
        const result = await updateUserByIdService(req.params.id, req.body);

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
    const [filters, queries] = queryParser(req.query);

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

exports.deleteUserByIdController = async (req, res) => {
    try {
        const result = await deleteUserByIdService(req.params.id);

        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to delete user",
            error: error.message
        });
    }
};
