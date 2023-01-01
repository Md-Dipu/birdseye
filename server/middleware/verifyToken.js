const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// firebase admin init
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_INFO);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers?.authorization?.startsWith("Bearer ")) {
            throw new Error("Bearer token not found");
        }

        const idToken = req.headers.authorization.split(" ")[1];
        const decodedUser = await admin.auth().verifyIdToken(idToken);
        req.user = { email: decodedUser.email };
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
