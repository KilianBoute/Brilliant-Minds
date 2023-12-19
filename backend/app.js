import express from "express";
import * as dotenv from "dotenv";
import mariadb from "mariadb";
import fs from "fs";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = 3000;
const HOST = "localhost";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "Kilian",
  password: process.env.DB_PASSWORD || "kilian",
  database: process.env.DB_NAME || "brilliant-minds",
  connectionLimit: 5,
});

app.get("/ideas", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM ideas`);

    const dir = path.join(__dirname, "../frontend/index.html");
    const htmlContent = fs.readFileSync(dir, "utf8");

    // Replace a placeholder in your HTML file with the actual data
    const modifiedHtml = htmlContent.replace(
      "<!-- data-placeholder -->",
      JSON.stringify(data)
    );

    res.send(modifiedHtml);
  } catch (err) {
    console.error("Error connecting to MariaDB:", err);
  } finally {
    if (connection) connection.end();
  }
});

app.get("/ideas/:id", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const prepare = await connection.prepare(
      "SELECT * FROM ideas WHERE id = ?"
    );
    const data = await prepare.execute([req.params.id]);
    res.send(data);
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) connection.end();
  }
});

app.get("/ideas/create", (req, res) => {
  try {
    //handle idea creation
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) connection.end();
  }
});

app.get("/ideas/delete", (req, res) => {
  try {
    //handle idea creation
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) connection.end();
  }
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`App started on http://${HOST}:${PORT}`);
      console.log(new Date());
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
