# Urban Tacos · Food Truck

Prototipo académico de catálogo y panel de administración para un food truck. El menú, los filtros y el carrito local funcionan con datos de demostración. Con el backend configurado, el menú puede leer productos desde MySQL y registrar pedidos sin guardar datos personales ni procesar pagos.

## Funciones

- Catálogo con búsqueda y filtros por categoría.
- Carrito local con total calculado en el navegador.
- API Express opcional para consultar productos y guardar pedidos.
- Panel administrativo con métricas calculadas a partir de `data/pedidos.json`; los datos son ficticios y el panel no tiene autenticación.

## Tecnologías

`HTML` · `CSS` · `JavaScript` · `Node.js` · `Express` · `MySQL`

## API local

Requisitos: Node.js 20 o superior y MySQL 8.0.19 o superior.

1. Crea una base de datos MySQL vacía llamada `urban_tacos`.
2. Ejecuta `database/migrations/001_initial_schema.sql` en esa base de datos.
3. Copia `backend/.env.example` como `backend/.env` y completa la conexión local. No publiques `.env`.
4. Desde `backend/`, instala dependencias, carga el catálogo ficticio y arranca la API:

```powershell
npm install
npm run db:seed
npm test
npm run dev
```

La API queda disponible en `http://localhost:3000`. Configura `js/config.js` con `window.FOOD_TRUCK_API_URL = "http://localhost:3000"` para que el menú lea el catálogo desde MySQL. Sin esa URL, usa el JSON local.

## Endpoints

- `GET /api/v1/health/live`: proceso activo.
- `GET /api/v1/health/ready`: conexión a MySQL disponible.
- `GET /api/v1/products`: productos activos.
- `POST /api/v1/orders`: registra productos y cantidades; el servidor valida stock y calcula precios dentro de una transacción.

## Límites

El panel administrativo sigue usando ventas ficticias locales y no debe conectarse a datos reales hasta añadir autenticación y autorización. La API no incluye pagos, cuentas de usuario ni datos de contacto. En producción, usa una base MySQL administrada, configura secretos en el proveedor de despliegue y limita `CORS_ORIGINS` al dominio del frontend.