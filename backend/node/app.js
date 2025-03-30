const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");

const filesRouter = require("./routes/files.routes");
const indexRouter = require("./routes/index");
const tasksRouter = require("./routes/tasks.routes");
const usersRouter = require("./routes/users.routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// TODO : Change route prefix single quotes to double quotes.
app.use("/files", filesRouter);
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use('/', indexRouter);

module.exports = app;
