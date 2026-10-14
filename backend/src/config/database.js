import mysql from "mysql2/promise";

const requiredVariables = ["DB_HOST", "DB_USER", "DB_NAME"];

export function validateDatabaseEnvironment(environment = process.env) {
  const missing = requiredVariables.filter((name) => !environment[name]);
  if (missing.length) {
    throw new Error(`Faltan variables de entorno de MySQL: ${missing.join(", ")}`);
  }
}

export function createDatabasePool(environment = process.env) {
  validateDatabaseEnvironment(environment);

  return mysql.createPool({
    host: environment.DB_HOST,
    port: Number(environment.DB_PORT || 3306),
    user: environment.DB_USER,
    password: environment.DB_PASSWORD || "",
    database: environment.DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(environment.DB_POOL_SIZE || 10),
    queueLimit: 0,
    enableKeepAlive: true
  });
}