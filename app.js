const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(console.error);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
