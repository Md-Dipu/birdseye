const { MongoClient } = require("mongodb");
const colors = require("colors");
const config = require("../config/server.config");

const connectionString = config.db.uri;
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

    db: function (collectionName) {
        if (collectionName) {
            return dbConnection.collection(collectionName);
        }

        return dbConnection;
    },
};