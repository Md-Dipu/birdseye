const admin = require("firebase-admin");
const config = require("../config/server.config");
const { getUserByEmailService } = require("../services/users.service");

admin.initializeApp({
    credential: admin.credential.cert(config.app.firebaseAccountInfo)
});

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers?.authorization?.startsWith("Bearer ")) {
            throw new Error("Bearer token not found");
        }

        const idToken = req.headers.authorization.split(" ")[1];
        const decodedUser = await admin.auth().verifyIdToken(idToken);
        const user = await getUserByEmailService(decodedUser.email);
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            status: "fail",
            message: "User is not authorized",
            error: error.message
        });
    }
};

module.exports = verifyToken;
