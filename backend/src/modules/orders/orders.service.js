export class OrderError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function createOrder(pool, requestedItems) {
  if (!Array.isArray(requestedItems) || requestedItems.length < 1 || requestedItems.length > 20) {
    throw new OrderError(400, "El pedido debe incluir entre 1 y 20 productos");
  }

  const quantities = new Map();
  for (const item of requestedItems) {
    const productId = String(item?.productId ?? "");
    const quantity = Number(item?.quantity);
    if (!/^[A-Za-z0-9_-]{1,12}$/.test(productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new OrderError(400, "Producto o cantidad no válidos");
    }
    const combinedQuantity = (quantities.get(productId) || 0) + quantity;
    if (combinedQuantity > 20) {
      throw new OrderError(400, "La cantidad máxima por producto es 20");
    }
    quantities.set(productId, combinedQuantity);
  }

  const connection = await pool.getConnection();
  let transactionStarted = false;
  try {
    await connection.beginTransaction();
    transactionStarted = true;
    const productIds = [...quantities.keys()];
    const placeholders = productIds.map(() => "?").join(", ");
    const [products] = await connection.execute(
      `SELECT id_plato, plato, precio_venta, stock_actual
       FROM products
       WHERE activo = 1 AND id_plato IN (${placeholders})
       FOR UPDATE`,
      productIds
    );

    if (products.length !== productIds.length) {
      throw new OrderError(404, "Uno o más productos no están disponibles");
    }

    const lines = products.map((product) => {
      const quantity = quantities.get(product.id_plato);
      if (Number(product.stock_actual) < quantity) {
        throw new OrderError(409, `Stock insuficiente para ${product.plato}`);
      }
      const unitPrice = Number(product.precio_venta);
      if (!Number.isSafeInteger(unitPrice) || unitPrice < 0) {
        throw new Error("El precio del producto no es válido");
      }
      return {
        productId: product.id_plato,
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity
      };
    });

    const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    if (!Number.isSafeInteger(total)) throw new OrderError(400, "El total del pedido no es válido");

    const [order] = await connection.execute(
      "INSERT INTO orders (total) VALUES (?)",
      [total]
    );

    for (const line of lines) {
      await connection.execute(
        "UPDATE products SET stock_actual = stock_actual - ? WHERE id_plato = ?",
        [line.quantity, line.productId]
      );
      await connection.execute(
        `INSERT INTO order_items (order_id, id_plato, quantity, unit_price, line_total)
         VALUES (?, ?, ?, ?, ?)`,
        [order.insertId, line.productId, line.quantity, line.unitPrice, line.lineTotal]
      );
    }

    await connection.commit();
    return { orderId: order.insertId, total };
  } catch (error) {
    if (transactionStarted) await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}