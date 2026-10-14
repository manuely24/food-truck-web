export async function listActiveProducts(pool) {
  const [rows] = await pool.execute(
    `SELECT id_plato, plato, categoria, insumo_critico, stock_actual, costo, precio_venta
     FROM products
     WHERE activo = 1
     ORDER BY categoria, plato`
  );

  return rows.map((row) => ({
    ...row,
    stock_actual: Number(row.stock_actual),
    costo: Number(row.costo),
    precio_venta: Number(row.precio_venta)
  }));
}