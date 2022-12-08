const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");

const dbConnection = require("./utils/dbConnection");
const plansRoutes = require("./routes/v1/plans.route");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/plans", plansRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Running Birdseye server"
    });
});

dbConnection.connectToServer((err) => {
    if (err) {
        console.error(err);
        return;
    }

    app.listen(port, () => {
        console.log(colors.yellow.bold("Listening at port:"), port);
    });
});

process.on("unhandledRejection", (err) => {
    console.error(err);
    app.close(() => {
        process.exit(1);
    });
});
