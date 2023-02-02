const authorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                status: "fail",
                message: "User does not have access rights"
            });
        }
        next();
    };
};

module.exports = authorization;
