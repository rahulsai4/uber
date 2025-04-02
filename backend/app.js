const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRouter = require("./routes/user.route");

connectToDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.get("/", (req, res) => {
    res.send("hello, world");
});

module.exports = app;
