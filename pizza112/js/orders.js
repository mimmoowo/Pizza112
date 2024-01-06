const token = localStorage.getItem("userToken");

function getOrderHistory () {
  var url = 'https://pizza112.srvsrv.net/api/client/orderHistory';

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  .then((response) => response.json())
  .then((data) => {
    var ordersList = document.querySelector('.orders');
    data.forEach(order => {
      var orderItem = document.createElement('li');
      orderItem.className = 'orders__item';
      orderItem.innerHTML = `
        <span class="orders__item-date">
          ${new Date(order.date).toLocaleString('ru-RU')}
        </span>
        <span class="orders__item-id">
          № ${order.orderId}
        </span>
        <span class="orders__item-total">
          Сумма: ${order.sum} ₽
        </span>
        <a type="button" class="orders__item-btn" href="showOrder.html?orderId=${order.orderId}">
          подробнее о заказе
        </a>
      `;
      ordersList.appendChild(orderItem);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

getOrderHistory ();