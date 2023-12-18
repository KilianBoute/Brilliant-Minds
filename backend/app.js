import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./mariadb/connection.js";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
  res.end();
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      connectDB;
      console.log(`App started on port ${PORT}`);
      console.log(new Date);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
