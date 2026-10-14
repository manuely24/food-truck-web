const fotosPorPlato = {
  P01: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=85',
  P02: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=85',
  P03: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=85',
  P04: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=900&q=85',
  P05: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=900&q=85',
  P06: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=900&q=85',
  P07: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=900&q=85',
  P08: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=85',
  P09: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  P10: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
  P11: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
  P12: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
  P13: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85',
  P14: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85',
  P15: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85'
};

const fotoPorCategoria = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85';
const iconosPorCategoria = {
  Tacos: '🌮',
  Burritos: '🌯',
  Quesadillas: '🧀',
  Entradas: '🥑',
  Bebidas: '🥤',
  Postres: '🍮',
  Especiales: '⭐'
};
const carrito = [];

function obtenerApiBaseUrl() {
  return typeof window.FOOD_TRUCK_API_URL === 'string'
    ? window.FOOD_TRUCK_API_URL.trim().replace(/\/+$/, '')
    : '';
}

function aplicarEstilos() {
  if (document.getElementById('urban-tacos-theme')) return;

  const style = document.createElement('style');
  style.id = 'urban-tacos-theme';
  style.textContent = `
    :root {
      --primary: #ff7a45;
      --primary-dark: #e85a2a;
      --dark: #f8fafc;
      --light: #0f172a;
      --muted: #a8b3c2;
      --line: #334155;
      --surface: #1e293b;
      --danger: #ff6b5f;
      --surface-raised: #243449;
    }
    * { box-sizing: border-box; }
    body {
      background: radial-gradient(circle at 100% 0%, rgba(255, 122, 69, .12) 0, transparent 30%), var(--light);
      color: var(--dark);
      font-family: Georgia, 'Times New Roman', serif;
    }
    header {
      background: #0b1120;
      padding: 1.1rem clamp(1rem, 4vw, 3rem);
      border-bottom: 4px solid var(--primary);
      box-shadow: 0 8px 24px rgba(23, 33, 43, .14);
    }
    header h1 { margin: 0; letter-spacing: .02em; }
    header nav { display: flex; gap: .4rem; }
    header a { margin-left: 0; padding: .55rem .8rem; border-radius: 999px; transition: background .2s, color .2s; }
    header a:hover, header a:focus-visible { background: var(--primary); color: #fff; }
    .container { max-width: 1180px; padding: clamp(1.4rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem); }
    .container > h2 { font-size: clamp(1.8rem, 4vw, 2.6rem); margin: 0 0 1.4rem; }
    .hero { background: linear-gradient(110deg, #111827 0%, #1e293b 65%, #7c2d12 100%); color: #fff; margin: 0 auto; max-width: 1180px; overflow: hidden; padding: clamp(2.2rem, 6vw, 4.5rem) clamp(1.2rem, 5vw, 4rem); position: relative; }
    .hero::after { border: 1px solid rgba(255,255,255,.18); border-radius: 50%; content: ''; height: 240px; position: absolute; right: -55px; top: -85px; width: 240px; }
    .hero-kicker { color: #ffc857; font: 700 .75rem/1 sans-serif; letter-spacing: .16em; text-transform: uppercase; }
    .hero h2 { font-size: clamp(2.4rem, 6vw, 4.8rem); line-height: .98; margin: .7rem 0 1rem; max-width: 690px; position: relative; }
    .hero p { color: #d9e1e4; font: 1rem/1.6 sans-serif; margin: 0 0 1.5rem; max-width: 530px; }
    .hero-action, .order-button { background: var(--primary); border: 0; border-radius: 999px; color: #fff; cursor: pointer; font: 700 .85rem/1 sans-serif; padding: .85rem 1.1rem; transition: background .2s, transform .2s; }
    .hero-action:hover, .order-button:hover { background: var(--primary-dark); transform: translateY(-2px); }
    .cart-trigger { align-items: center; background: var(--primary); border: 0; border-radius: 999px; color: #fff; cursor: pointer; display: inline-flex; font: 700 .78rem sans-serif; gap: .4rem; margin-left: .35rem; padding: .58rem .8rem; }
    .cart-count { align-items: center; background: var(--primary); border-radius: 50%; color: #fff; display: inline-flex; font-size: .68rem; height: 1.35rem; justify-content: center; width: 1.35rem; }
    .cart-panel { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; box-shadow: 0 18px 42px rgba(0,0,0,.45); max-width: 360px; padding: 1.2rem; position: fixed; right: 1rem; top: 5.7rem; width: calc(100% - 2rem); z-index: 4; }
    .cart-panel[hidden] { display: none; }
    .cart-header { align-items: center; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; padding-bottom: .8rem; }
    .cart-header h2 { font-size: 1.25rem; margin: 0; }
    .cart-close { background: none; border: 0; color: var(--muted); cursor: pointer; font-size: 1.2rem; }
    .cart-items { list-style: none; margin: .8rem 0; max-height: 220px; overflow: auto; padding: 0; }
    .cart-items li { align-items: center; border-bottom: 1px solid var(--line); display: flex; font: .85rem sans-serif; gap: .7rem; justify-content: space-between; padding: .65rem 0; }
    .cart-items small { color: var(--muted); display: block; margin-top: .2rem; }
    .cart-total { display: flex; font: 700 1rem sans-serif; justify-content: space-between; padding-top: .5rem; }
    .checkout-button { background: var(--primary); border: 0; border-radius: 999px; color: #fff; cursor: pointer; font: 700 .85rem sans-serif; margin-top: .9rem; padding: .8rem 1rem; width: 100%; }
    .checkout-button:disabled { cursor: wait; opacity: .65; }
    .cart-empty { color: var(--muted); font: .88rem sans-serif; padding: .7rem 0; }
    .toast { align-items: center; display: flex; gap: .5rem; }
    .menu-tools { align-items: center; display: flex; flex-wrap: wrap; gap: .7rem; justify-content: space-between; margin-bottom: 1.4rem; }
    .search-box { background: var(--surface); border: 1px solid var(--line); border-radius: 999px; color: var(--dark); font: 1rem sans-serif; min-width: min(100%, 310px); padding: .75rem 1rem; }
    .filter-group { display: flex; flex-wrap: wrap; gap: .45rem; }
    .filter-button { background: transparent; border: 1px solid var(--line); border-radius: 999px; color: var(--dark); cursor: pointer; font: 700 .78rem sans-serif; padding: .65rem .85rem; }
    .filter-button.active, .filter-button:hover { background: var(--dark); border-color: var(--dark); color: #fff; }
    .grid, .kpi-grid { align-items: stretch; gap: 1.25rem; }
    .menu-card, .card {
      background: rgba(30, 41, 59, .96);
      border: 1px solid var(--line);
      border-radius: 14px;
      box-shadow: 0 5px 16px rgba(0, 0, 0, .2);
      transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
    }
    .menu-card { display: flex; flex-direction: column; overflow: hidden; padding: 0; }
    .menu-card:hover, .card:hover { transform: translateY(-4px); border-color: var(--primary); box-shadow: 0 14px 28px rgba(0, 0, 0, .34); }
    .menu-image { width: 100%; height: 180px; display: block; object-fit: cover; background: #172033; }
    .menu-content { display: flex; flex: 1; flex-direction: column; padding: 1.1rem 1.2rem 1.2rem; }
    .menu-content h3 { margin: 0 0 .7rem; font-size: 1.25rem; }
    .menu-content p { color: var(--muted); margin: 0; }
    .category-badge { align-self: flex-start; background: rgba(255, 122, 69, .16); color: #ffab86; font: 700 .72rem/1 sans-serif; letter-spacing: .06em; margin-bottom: .75rem; padding: .42rem .65rem; text-transform: uppercase; }
    .price { color: var(--primary) !important; font: 700 1.25rem/1 sans-serif; margin-top: auto !important; padding-top: 1.1rem; }
    .menu-meta { align-items: center; display: flex; gap: .5rem; justify-content: space-between; margin-top: auto; padding-top: 1rem; }
    .menu-meta .price { margin: 0 !important; padding: 0; }
    .stock-tag, .status-badge { border-radius: 999px; font: 700 .68rem sans-serif; padding: .35rem .55rem; }
    .stock-tag { background: rgba(255, 122, 69, .16); color: #ffab86; }
    .stock-tag.critical { background: rgba(255, 107, 95, .16); color: var(--danger); }
    .order-button { font-size: .72rem; padding: .65rem .8rem; }
    .empty-state { color: var(--muted); grid-column: 1 / -1; padding: 2rem; text-align: center; }
    .tables-section { gap: 1.25rem; }
    .card { padding: 1.3rem; }
    .card h3 { margin-top: 0; }
    .kpi-grid .card p { color: var(--muted); margin: 0 0 .4rem; }
    .kpi-grid .card h3 { color: var(--primary); margin: 0; font-size: 1.55rem; }
    .danger { color: var(--danger); }
    #lista-stock, #top-platos { line-height: 1.8; padding-left: 1.25rem; }
    .period-tools { align-items: center; display: flex; gap: .7rem; justify-content: flex-end; margin: 0 0 1rem; }
    .period-tools label { color: var(--muted); font: 700 .78rem sans-serif; }
    .period-select { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; color: var(--dark); padding: .65rem .8rem; }
    .inventory-table { border-collapse: collapse; font: .9rem sans-serif; width: 100%; }
    .inventory-table th { color: var(--muted); font-size: .7rem; letter-spacing: .06em; text-align: left; text-transform: uppercase; }
    .inventory-table th, .inventory-table td { border-bottom: 1px solid var(--line); padding: .75rem .35rem; vertical-align: middle; }
    .inventory-table tr:last-child td { border-bottom: 0; }
    .progress-track { background: #334155; border-radius: 99px; height: 7px; min-width: 90px; overflow: hidden; }
    .progress-bar { background: #54a873; border-radius: inherit; height: 100%; }
    .progress-bar.critical { background: var(--danger); }
    .status-badge.critical { background: rgba(255, 107, 95, .16); color: var(--danger); }
    .status-badge.acceptable { background: rgba(255, 122, 69, .16); color: #ffab86; }
    .status-badge.available { background: rgba(74, 222, 128, .14); color: #86efac; }
    .site-footer { background: #0b1120; color: #e1e8eb; display: grid; gap: 1.5rem; grid-template-columns: 1.5fr repeat(3, 1fr); margin-top: 2rem; padding: 2.5rem max(1rem, calc((100% - 1180px) / 2)); }
    .site-footer h3, .site-footer h4 { color: #fff; margin: 0 0 .7rem; }
    .site-footer p { color: #b8c3c8; font: .87rem/1.6 sans-serif; margin: 0; }
    .site-footer a { color: #ffc857; display: block; font: .87rem/1.8 sans-serif; text-decoration: none; }
    .toast { background: var(--dark); border-left: 4px solid var(--primary); border-radius: 8px; bottom: 1.2rem; color: #fff; font: .9rem sans-serif; padding: 1rem 1.2rem; position: fixed; right: 1.2rem; z-index: 5; }
    @media (max-width: 620px) {
      header { align-items: flex-start; flex-direction: column; gap: .8rem; }
      header nav { width: 100%; }
      header a { flex: 1; text-align: center; }
      .site-footer { grid-template-columns: 1fr 1fr; }
      .inventory-table { font-size: .78rem; }
      .inventory-table th:nth-child(3), .inventory-table td:nth-child(3) { display: none; }
    }
  `;
  document.head.appendChild(style);
}

function agregarFooter() {
  if (document.querySelector('.site-footer')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-footer">
      <div><h3>🌮 Urban Tacos</h3><p>Prototipo académico de menú y panel de administración.</p></div>
      <div><h4>Alcance</h4><p>La demo no recibe ni procesa pedidos reales.</p></div>
      <div><h4>Datos</h4><p>El catálogo y las ventas son registros ficticios de demostración.</p></div>
      <div><h4>Vistas</h4><a href="index.html">Menú</a><a href="admin.html">Panel de administración</a></div>
    </footer>
  `);
}

function mostrarToast(mensaje) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = mensaje;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function renderizarCarrito() {
  const count = carrito.reduce((total, item) => total + item.cantidad, 0);
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) cartCount.textContent = count;
  const items = document.querySelector('.cart-items');
  const total = document.querySelector('.cart-total strong');
  if (!items || !total) return;
  items.innerHTML = carrito.length ? carrito.map(item => `<li><span>${item.plato}<small>${item.cantidad} x $${item.precio.toLocaleString('es-CO')}</small></span><strong>$${(item.cantidad * item.precio).toLocaleString('es-CO')}</strong></li>`).join('') : '<li class="cart-empty">Tu pedido está vacío. Elige algo rico del menú.</li>';
  total.textContent = `$${carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0).toLocaleString('es-CO')}`;
}

async function enviarPedido() {
  const apiBaseUrl = obtenerApiBaseUrl();
  if (!apiBaseUrl) {
    mostrarToast('Modo demostración: el pedido no se envió.');
    return;
  }
  if (!carrito.length) {
    mostrarToast('Agrega al menos un producto al pedido.');
    return;
  }

  const button = document.querySelector('.checkout-button');
  button.disabled = true;
  try {
    const response = await fetch(`${apiBaseUrl}/api/v1/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        items: carrito.map(item => ({ productId: item.id_plato, quantity: item.cantidad }))
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'No se pudo registrar el pedido.');

    carrito.length = 0;
    renderizarCarrito();
    mostrarToast(`Pedido #${result.orderId} registrado.`);
  } catch (error) {
    mostrarToast(error.message || 'No se pudo conectar con la API.');
  } finally {
    button.disabled = false;
  }
}

function prepararCarrito(carta) {
  const nav = document.querySelector('header nav');
  if (!nav || !document.getElementById('menu-grid') || document.querySelector('.cart-trigger')) return;
  nav.insertAdjacentHTML('beforeend', '<button class="cart-trigger" type="button" aria-expanded="false" aria-controls="cart-panel">🛒 Pedido <span class="cart-count">0</span></button>');
  document.body.insertAdjacentHTML('beforeend', '<aside class="cart-panel" id="cart-panel" hidden><div class="cart-header"><h2>Tu pedido</h2><button class="cart-close" type="button" aria-label="Cerrar pedido">×</button></div><ul class="cart-items"></ul><div class="cart-total"><span>Total</span><strong>$0</strong></div><button class="checkout-button" type="button">Confirmar pedido</button></aside>');
  const trigger = document.querySelector('.cart-trigger');
  const panel = document.getElementById('cart-panel');
  trigger.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    trigger.setAttribute('aria-expanded', String(!panel.hidden));
  });
  panel.querySelector('.cart-close').addEventListener('click', () => {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  });
  panel.querySelector('.checkout-button').addEventListener('click', enviarPedido);
  document.getElementById('menu-grid')?.addEventListener('click', event => {
    const button = event.target.closest('.order-button');
    if (!button) return;
    const plato = carta.find(item => item.id_plato === button.dataset.productId);
    if (!plato) return;
    const existente = carrito.find(item => item.plato === plato.plato);
    if (existente) existente.cantidad += 1;
    else carrito.push({ id_plato: plato.id_plato, plato: plato.plato, precio: plato.precio_venta, cantidad: 1 });
    renderizarCarrito();
    mostrarToast(`✓ ${plato.plato} agregado al pedido`);
  });
  renderizarCarrito();
}

function prepararHero() {
  if (document.querySelector('.hero')) return;
  const main = document.querySelector('main.container');
  if (!main || !document.getElementById('menu-grid')) return;
  main.insertAdjacentHTML('beforebegin', `
    <section class="hero">
      <span class="hero-kicker">Cocina urbana mexicana</span>
      <h2>El sabor que mueve la ciudad.</h2>
      <p>Tacos, burritos y antojos hechos al momento para ponerle algo especial a tu día.</p>
      <button class="hero-action" type="button">Ver Especiales ↓</button>
    </section>
  `);
  document.querySelector('.hero-action').addEventListener('click', () => {
    document.getElementById('menu-grid').scrollIntoView({ behavior: 'smooth' });
  });
}

function prepararHerramientasMenu(carta, render) {
  const grid = document.getElementById('menu-grid');
  if (!grid || document.querySelector('.menu-tools')) return;
  grid.insertAdjacentHTML('beforebegin', `
    <div class="menu-tools">
      <input class="search-box" type="search" placeholder="🔎 Buscar un plato..." aria-label="Buscar platos">
      <div class="filter-group" role="group" aria-label="Filtrar por categoría">
        ${['Todos', 'Tacos', 'Burritos', 'Bebidas'].map((categoria, index) => `<button class="filter-button${index === 0 ? ' active' : ''}" type="button" data-category="${categoria}">${categoria}</button>`).join('')}
      </div>
    </div>
  `);
  const input = document.querySelector('.search-box');
  let categoriaActiva = 'Todos';
  const actualizar = () => {
    const busqueda = input.value.trim().toLowerCase();
    render(carta.filter(item => {
      const coincideCategoria = categoriaActiva === 'Todos' || item.categoria === categoriaActiva;
      return coincideCategoria && `${item.plato} ${item.categoria}`.toLowerCase().includes(busqueda);
    }));
  };
  input.addEventListener('input', actualizar);
  document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
    categoriaActiva = button.dataset.category;
    document.querySelectorAll('.filter-button').forEach(item => item.classList.toggle('active', item === button));
    actualizar();
  }));
}

function renderizarMenu(carta) {
  const menuGrid = document.getElementById('menu-grid');
  if (!menuGrid) return;

  if (!carta.length) {
    menuGrid.innerHTML = '<p class="empty-state">No encontramos platos con esa búsqueda.</p>';
    return;
  }

  menuGrid.innerHTML = carta.map(item => {
    const icono = iconosPorCategoria[item.categoria] || '🍽️';
    const foto = fotosPorPlato[item.id_plato] || fotoPorCategoria;
    const stockCritico = item.stock_actual < 10;
    return `
      <article class="card menu-card">
        <img class="menu-image" src="${foto}" alt="${item.plato}" loading="lazy">
        <div class="menu-content">
          <span class="category-badge">${icono} ${item.categoria}</span>
          <h3>${item.plato}</h3>
          <p>Preparado al momento con ingredientes frescos.</p>
          <div class="menu-meta">
            <span class="stock-tag${stockCritico ? ' critical' : ''}">${stockCritico ? '⚠️ Últimas unidades' : '★ Favorito'}</span>
            <p class="price">$${item.precio_venta.toLocaleString('es-CO')}</p>
          </div>
          <button class="order-button" type="button" data-product-id="${item.id_plato}">Agregar al pedido +</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderizarInventario(carta) {
  const listaStock = document.getElementById('lista-stock');
  if (!listaStock) return;
  const card = listaStock.closest('.card');
  if (!card) return;
  const cuerpo = carta.map(item => {
    const estado = item.stock_actual < 10 ? ['Crítico', 'critical'] : item.stock_actual <= 15 ? ['Aceptable', 'acceptable'] : ['Disponible', 'available'];
    const porcentaje = Math.min(item.stock_actual * 2, 100);
    return `<tr><td><strong>${item.plato}</strong><br><small>${item.insumo_critico}</small></td><td>${item.stock_actual}</td><td><div class="progress-track"><div class="progress-bar ${estado[1]}" style="width:${porcentaje}%"></div></div></td><td><span class="status-badge ${estado[1]}">${estado[0]}</span></td></tr>`;
  }).join('');
  card.querySelector('h3').textContent = '📦 Estado del inventario';
  listaStock.outerHTML = `<div class="inventory-scroll"><table class="inventory-table"><thead><tr><th>Producto</th><th>Stock</th><th>Nivel</th><th>Estado</th></tr></thead><tbody>${cuerpo}</tbody></table></div>`;
}

function obtenerPedidosPorPeriodo(pedidos, periodo) {
  if (periodo === 'todos' || !pedidos.length) return pedidos;
  const fechaReferencia = new Date();
  fechaReferencia.setHours(0, 0, 0, 0);
  const dias = periodo === 'hoy' ? 0 : periodo === 'semana' ? 6 : 29;
  const limite = new Date(fechaReferencia);
  limite.setDate(limite.getDate() - dias);

  return pedidos.filter(pedido => {
    const fechaPedido = new Date(`${pedido.fecha}T00:00:00`);
    return !Number.isNaN(fechaPedido.getTime()) && fechaPedido >= limite && fechaPedido <= fechaReferencia;
  });
}

function renderizarDashboard(carta, pedidos) {
  if (!document.getElementById('kpi-ventas')) return;

  const kpiGrid = document.querySelector('.kpi-grid');
  kpiGrid.insertAdjacentHTML('beforebegin', '<div class="period-tools"><label for="period-select">Periodo</label><select id="period-select" class="period-select"><option value="todos">Todo el historial</option><option value="hoy">Último día</option><option value="semana">Última semana</option><option value="mes">Último mes</option></select></div>');

  const actualizarMetricas = () => {
    const pedidosFiltrados = obtenerPedidosPorPeriodo(pedidos, document.getElementById('period-select').value);
    const totalVentas = pedidosFiltrados.reduce((acc, p) => acc + (p.total || 0), 0);
    const ticketPromedio = pedidosFiltrados.length ? Math.round(totalVentas / pedidosFiltrados.length) : 0;
    document.getElementById('kpi-ventas').innerText = `$${totalVentas.toLocaleString('es-CO')}`;
    document.getElementById('kpi-ticket').innerText = `$${ticketPromedio.toLocaleString('es-CO')}`;

    const horasCount = {};
    pedidosFiltrados.forEach(p => {
      const hora = p.hora || p.hora_pedido;
      if (hora) {
        const horaStr = `${hora.split(':')[0]}:00`;
        horasCount[horaStr] = (horasCount[horaStr] || 0) + 1;
      }
    });
    const horaPico = Object.entries(horasCount).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('kpi-horapico').innerText = horaPico ? horaPico[0] : '-';

    const ventasPorPlato = {};
    pedidosFiltrados.forEach(p => {
      ventasPorPlato[p.plato] = (ventasPorPlato[p.plato] || 0) + (p.cantidad || 1);
    });
    const ranking = Object.entries(ventasPorPlato).sort((a, b) => b[1] - a[1]);
    document.getElementById('kpi-top').innerText = ranking[0] ? ranking[0][0] : '-';
    const topOl = document.getElementById('top-platos');
    if (topOl) {
      topOl.innerHTML = ranking.length ? ranking.slice(0, 5).map(([plato, cantidad]) =>
        `<li><strong>${plato}</strong>: ${cantidad} unidades</li>`
      ).join('') : '<li>Sin ventas en este periodo</li>';
    }
  };

  document.getElementById('period-select').addEventListener('change', actualizarMetricas);
  actualizarMetricas();
  renderizarInventario(carta);
}

document.addEventListener('DOMContentLoaded', async () => {
  aplicarEstilos();
  prepararHero();
  agregarFooter();
  try {
    const apiBaseUrl = obtenerApiBaseUrl();
    const [resCarta, resPedidos] = await Promise.all([
      fetch(apiBaseUrl ? `${apiBaseUrl}/api/v1/products` : 'data/carta.json'),
      fetch('data/pedidos.json')
    ]);
    if (!resCarta.ok || !resPedidos.ok) throw new Error('No se pudieron cargar los datos.');

    const [carta, pedidos] = await Promise.all([resCarta.json(), resPedidos.json()]);
    renderizarMenu(carta);
    prepararHerramientasMenu(carta, renderizarMenu);
    prepararCarrito(carta);
    renderizarDashboard(carta, pedidos);
  } catch (err) {
    console.error('Error cargando los datos:', err);
  }
});