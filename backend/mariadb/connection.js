import mariadb from "mariadb";

async function connectDB() {
  let conn;
  try {
    // Create a new connection
    conn = await mariadb.createConnection({
      host: "localhost",
      port: 3306,
      user: "Kilian",
      password: "kilian",
    });

    // Print connection thread
    console.log(`Connected! (id=${conn.threadId})`);
  } catch (err) {
    // Print error
    console.log(err);
  } finally {
    // Close connection
    if (conn) await conn.close();
  }
}

export default connectDB();
