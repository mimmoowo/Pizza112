const token = localStorage.getItem("userToken");

function getData(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Error:', error));
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Функция для добавления заказов в HTML
function renderOrders(orders) {
  const ordersList = document.getElementById('ordersList');

  orders.forEach(order => {
    const listItem = document.createElement('li');
    listItem.className = 'orders__item';

    listItem.innerHTML = `
      <span class="orders__item-date">
        ${formatDate(order.date)}
      </span>
      <span class="orders__item-id">
        № ${order.orderId}
      </span>
      <span class="orders__item-total">
        Сумма: ${order.sum} ₽
      </span>
      <a type="button" class="orders__item-btn" href="showOrder.html">
        подробнее о заказе
      </a>
    `;

    ordersList.appendChild(listItem);
  });
}

// Выполняем GET запрос и обрабатываем данные
getData('https://pizza112.srvsrv.net/api/client/orderHistory', renderOrders);