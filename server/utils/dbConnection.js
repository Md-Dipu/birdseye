const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const connectionString = process.env.LOCAL_URI;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("birdseye-database");
            console.log(colors.green.bold("Successfully connected to MongoDB."));

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
};