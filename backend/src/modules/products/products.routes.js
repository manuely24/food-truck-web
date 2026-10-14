import { Router } from "express";
import { listActiveProducts } from "./products.repository.js";

export function createProductsRouter(pool) {
  const router = Router();

  router.get("/", async (_request, response, next) => {
    try {
      response.json(await listActiveProducts(pool));
    } catch (error) {
      next(error);
    }
  });

  return router;
}