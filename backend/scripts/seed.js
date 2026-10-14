import "dotenv/config";
import { readFile } from "node:fs/promises";
import { createDatabasePool } from "../src/config/database.js";

const pool = createDatabasePool();

try {
  const source = new URL("../../data/carta.json", import.meta.url);
  const products = JSON.parse(await readFile(source, "utf8"));

  for (const product of products) {
    await pool.execute(
      `INSERT INTO products (
         id_plato, plato, categoria, insumo_critico, stock_actual, costo, precio_venta
       ) VALUES (?, ?, ?, ?, ?, ?, ?) AS incoming
       ON DUPLICATE KEY UPDATE
         plato = incoming.plato,
         categoria = incoming.categoria,
         insumo_critico = incoming.insumo_critico,
         stock_actual = incoming.stock_actual,
         costo = incoming.costo,
         precio_venta = incoming.precio_venta,
         activo = TRUE`,
      [
        product.id_plato,
        product.plato,
        product.categoria,
        product.insumo_critico,
        product.stock_actual,
        product.costo,
        product.precio_venta
      ]
    );
  }

  console.log(`Se sincronizaron ${products.length} productos de demostración.`);
} finally {
  await pool.end();
}