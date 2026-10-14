import { Router } from "express";
import { createOrder, OrderError } from "./orders.service.js";

export function createOrdersRouter(pool) {
  const router = Router();

  router.post("/", async (request, response, next) => {
    try {
      const order = await createOrder(pool, request.body?.items);
      response.status(201).json(order);
    } catch (error) {
      if (error instanceof OrderError) {
        return response.status(error.status).json({ error: error.message });
      }
      return next(error);
    }
  });

  return router;
}