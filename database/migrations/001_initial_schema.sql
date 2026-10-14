CREATE TABLE IF NOT EXISTS products (
  id_plato VARCHAR(12) NOT NULL,
  plato VARCHAR(120) NOT NULL,
  categoria VARCHAR(60) NOT NULL,
  insumo_critico VARCHAR(120) NOT NULL,
  stock_actual INT UNSIGNED NOT NULL DEFAULT 0,
  costo DECIMAL(12, 2) UNSIGNED NOT NULL,
  precio_venta DECIMAL(12, 2) UNSIGNED NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_plato),
  CONSTRAINT chk_products_cost CHECK (costo >= 0),
  CONSTRAINT chk_products_price CHECK (precio_venta >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  total DECIMAL(14, 2) UNSIGNED NOT NULL,
  order_status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_orders_created_at (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  order_id BIGINT UNSIGNED NOT NULL,
  id_plato VARCHAR(12) NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  unit_price DECIMAL(12, 2) UNSIGNED NOT NULL,
  line_total DECIMAL(14, 2) UNSIGNED NOT NULL,
  PRIMARY KEY (order_id, id_plato),
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product
    FOREIGN KEY (id_plato) REFERENCES products (id_plato) ON DELETE RESTRICT,
  CONSTRAINT chk_order_items_quantity CHECK (quantity > 0)
) ENGINE=InnoDB;