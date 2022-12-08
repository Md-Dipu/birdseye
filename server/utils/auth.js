const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// firebase admin init
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_INFO);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.verifyToken = async (req, res, next) => {
    if (req.headers?.authorization?.startsWith("Bearer ")) {
        const idToken = req.headers.authorization.split(" ")[1];
        try {
            const decodedUser = await admin.auth().verifyIdToken(idToken);
            req.decodedUserEmail = decodedUser.email;

        } catch {
            res.status(401).json({
                status: "fail",
                message: "User bearing invalid token"
            })
        }
    }
    next();
};
