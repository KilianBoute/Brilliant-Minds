import express from "express";
import * as dotenv from "dotenv";

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
      console.log(`App started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
