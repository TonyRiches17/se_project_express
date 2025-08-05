const express = require("express");

const { mongoose } = require("mongoose");

const app = express();

const cors = require("cors");

const mainRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const { auth } = require("./middlewares/auth");

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(console.error);


app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", getItems);

app.use(auth);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
