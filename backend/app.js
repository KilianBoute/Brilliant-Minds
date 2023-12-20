import express from "express";
import * as dotenv from "dotenv";
import mariadb from "mariadb";
import fs from "fs";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const PORT = 3000;
const HOST = "localhost";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
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

    res.json(data);
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

app.post("/create", async (req, res) => {
  let connection;
  try {
    // Extract data from the request body
    const { title, description } = req.body;
    console.log(title, description);

    // Check if both title and description are present
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    connection = await pool.getConnection();

    const result = await connection.query(
      "INSERT INTO ideas (title, description) VALUES (?, ?)",
      [title, description]
    );
  } catch (err) {
    console.error("Error creating idea:", err);

    // Send an error response with a generic message
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) connection.end();
  }
});

app.delete("/ideas/:id", async (req, res) => {
  let connection;
  try {
    const ideaId = req.params.id;

    connection = await pool.getConnection();

    // Delete the idea with the given ID
    const deleteResult = await connection.query(
      "DELETE FROM ideas WHERE id = ?",
      [ideaId]
    );
  } catch (err) {
    console.error("Error deleting idea:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) connection.end();
  }
});

const startServer = async () => {
  //let connection;
  try {
    app.listen(PORT, async () => {
      // connection = await pool.getConnection();
      console.log(`App started on http://${HOST}:${PORT}`);
      console.log(new Date());
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
