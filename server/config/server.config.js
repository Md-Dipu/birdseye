const dotenv = require("dotenv");

dotenv.config();

const env = process.env.NODE_ENV; // local | dev | production

const app = {
    port: parseInt(process.env.PORT) || 5000,
    firebaseAccountInfo: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_INFO)
};

const config = {
    local: { app, db: { uri: process.env.LOCAL_URI } },
    dev: { app, db: { uri: process.env.DEV_URI } },
    production: { app, db: { uri: process.env.PRODUCTION_URI } }
};

module.exports = config[env || "local"];
