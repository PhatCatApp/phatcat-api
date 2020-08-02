require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require("./passport");

const userRouter = require("./routes/user");

const app = express();

// Middleware
app.use(logger("dev"));
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static(path.join(__dirname, "./public")));

// Database
if (!process.env.DB_PATH) {
    console.log("No DB_PATH environment variable");
    process.exit(1);
}
const dbPath = process.env.DB_PATH;
mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (e) => {
    console.log(e, "\nError connecting to database, exiting");
    process.exit();
});
db.on("open", () => {
    // don't log login info to console if it's part of connect string
    const splitPath = dbPath.split("@");
    console.log(`Connected to database at ${splitPath.length > 1 ? splitPath[1] : dbPath}`);
});

// Routes
app.use("/user", userRouter);

const port = process.env.API_PORT || 3333;
app.listen(port, () => console.log(`Started on port ${port}`));