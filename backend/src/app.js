import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { createOrdersRouter } from "./modules/orders/orders.routes.js";
import { createProductsRouter } from "./modules/products/products.routes.js";

export function createApp({ pool, allowedOrigins = [], trustProxy = false }) {
  const app = express();
  app.disable("x-powered-by");
  if (trustProxy) app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origen no permitido por CORS"));
    },
    credentials: false
  }));
  app.use(express.json({ limit: "25kb" }));

  app.get("/api/v1/health/live", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.get("/api/v1/health/ready", async (_request, response) => {
    try {
      await pool.query("SELECT 1");
      response.json({ status: "ready" });
    } catch {
      response.status(503).json({ error: "Base de datos no disponible" });
    }
  });

  app.use("/api/v1/products", createProductsRouter(pool));
  app.use("/api/v1/orders", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false
  }), createOrdersRouter(pool));

  app.use((_request, response) => {
    response.status(404).json({ error: "Recurso no encontrado" });
  });

  app.use((error, _request, response, _next) => {
    if (response.headersSent) return;

    if (error.message === "Origen no permitido por CORS") {
      return response.status(403).json({ error: "Origen no permitido" });
    }

    if (error.status === 400) {
      return response.status(400).json({ error: "JSON no válido" });
    }

    console.error(error);
    return response.status(500).json({ error: "Error interno del servidor" });
  });

  return app;
}