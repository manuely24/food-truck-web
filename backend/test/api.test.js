import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { createApp } from "../src/app.js";

async function withServer(app, run) {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();

  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
}

test("health endpoint responds without querying MySQL", async () => {
  const app = createApp({ pool: {}, allowedOrigins: [] });

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/v1/health/live`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  });
});

test("products endpoint returns active products", async () => {
  const expected = [{
    id_plato: "P01",
    plato: "Taco al Pastor",
    categoria: "Tacos",
    insumo_critico: "Carne de cerdo",
    stock_actual: 4,
    costo: 4500,
    precio_venta: 9000
  }];
  const pool = { execute: async () => [expected, []] };

  await withServer(createApp({ pool, allowedOrigins: [] }), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/v1/products`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), expected);
  });
});

test("order endpoint rejects invalid quantities before opening a transaction", async () => {
  let connectionRequested = false;
  const pool = {
    getConnection: async () => {
      connectionRequested = true;
      throw new Error("No debe solicitar conexión");
    }
  };

  await withServer(createApp({ pool, allowedOrigins: [] }), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/v1/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items: [{ productId: "P01", quantity: -1 }] })
    });

    assert.equal(response.status, 400);
    assert.equal(connectionRequested, false);
  });
});

test("order endpoint limits the combined quantity of repeated products", async () => {
  let connectionRequested = false;
  const pool = {
    getConnection: async () => {
      connectionRequested = true;
      throw new Error("No debe solicitar conexión");
    }
  };

  await withServer(createApp({ pool, allowedOrigins: [] }), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/v1/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items: [
        { productId: "P01", quantity: 15 },
        { productId: "P01", quantity: 6 }
      ] })
    });

    assert.equal(response.status, 400);
    assert.equal(connectionRequested, false);
  });
});

test("order endpoint uses database prices and commits a stock-safe order", async () => {
  const statements = [];
  const connection = {
    beginTransaction: async () => statements.push("begin"),
    execute: async (sql, values = []) => {
      statements.push({ sql, values });
      if (sql.includes("SELECT id_plato, plato")) {
        return [[{ id_plato: "P01", plato: "Taco al Pastor", precio_venta: "9000.00", stock_actual: 5 }], []];
      }
      if (sql.includes("INSERT INTO orders")) return [{ insertId: 42 }, []];
      return [{ affectedRows: 1 }, []];
    },
    commit: async () => statements.push("commit"),
    rollback: async () => statements.push("rollback"),
    release: () => statements.push("release")
  };
  const pool = { getConnection: async () => connection };

  await withServer(createApp({ pool, allowedOrigins: [] }), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/v1/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items: [{ productId: "P01", quantity: 2 }] })
    });

    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { orderId: 42, total: 18000 });
    assert.ok(statements.includes("commit"));
    assert.ok(statements.some((entry) => Array.isArray(entry.values) && entry.values.includes(18000)));
  });
});