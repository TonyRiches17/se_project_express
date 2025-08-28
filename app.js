const express = require("express");

const { mongoose } = require("mongoose");

const app = express();

const cors = require("cors");
const { errors } = require("celebrate");

require("dotenv").config();

const mainRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const { auth } = require("./middlewares/auth");
const { errorHandler } = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateUserBody,
  validateUserLogin,
} = require("./middlewares/validation");

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(console.error);

// app.use(cors({
//   origin: "https://www.what2wear.minecraftnoob.com",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateUserLogin, login);
app.get("/items", getItems);
app.get("/test-error", (req, res, next) => {
  const error = new Error("This is a test error");
  next(error);
});

app.use(auth);
app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
