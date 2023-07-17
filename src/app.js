const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const userRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
const moviesRouter = require("./movies/movies.router");
const categoryRouter = require("./category/category.router");

const db = require("./utils/database");
const initModels = require("./models/initModels");
const app = express();

const PORT = process.env.PORT || 5000;

//? Validar la conexión

db.authenticate()
  .then(() => console.log("Database Authenticated!"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database Synced!"))
  .catch((err) => console.log(err));

initModels();

app.use(express.json());
app.use(cors());

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} | ${req.path}`);
  next();
};
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "Server OK",
    myMessage: req.message,
    myPort: process.env.PORT,
    queries: req.query,
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
