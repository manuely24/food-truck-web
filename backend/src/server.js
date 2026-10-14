import "dotenv/config";
import { createApp } from "./app.js";
import { createDatabasePool, validateDatabaseEnvironment } from "./config/database.js";

const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

validateDatabaseEnvironment();
const pool = createDatabasePool();
const app = createApp({
  pool,
  allowedOrigins,
  trustProxy: process.env.TRUST_PROXY === "1"
});

let server;

async function shutdown() {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await pool.end();
}

try {
  await pool.query("SELECT 1");
  server = app.listen(port, () => {
    console.log(`Urban Tacos API escuchando en el puerto ${port}`);
  });
} catch (error) {
  console.error("No se pudo conectar con MySQL:", error.message);
  await pool.end();
  process.exitCode = 1;
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);