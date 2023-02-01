const express = require("express");
const colors = require("colors");
const cors = require("cors");

const config = require("./config/server.config");
const dbConnection = require("./utils/dbConnection");
const plansRoutes = require("./routes/v1/plans.route");
const bookingsRoutes = require("./routes/v1/bookings.route");
const usersRoutes = require("./routes/v1/users.route");
const reviewsRoutes = require("./routes/v1/reviews.route");
const notificationsRoutes = require("./routes/v1/notifications.route");

const app = express();
const port = config.app.port;

app.use(cors());
app.use(express.json());

app.use("/api/v1/plans", plansRoutes);
app.use("/api/v1/bookings", bookingsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/notifications", notificationsRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Running Birdseye server"
    });
});

app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found"
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
