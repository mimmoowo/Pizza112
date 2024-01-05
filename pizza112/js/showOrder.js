const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

fetch(`https://pizza112.srvsrv.net/api/bucket/showOrder?orderId=${orderId}`)
  .then(response => response.json())
  .then(data => {
    const ordersList = document.querySelector('.orders');
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('orders__item');

      listItem.innerHTML = `
        <img src="https://pizza112.srvsrv.net/static/images/Products/${item.image}" alt="${item.name}" class="shop-item__img">
        <div class="shop-element">
          <p class="shop-element__name">${item.name}</p>
          <p class="shop-element__info">${item.productVariant}, ${item.quantity}</p>
          <div class="shop-element__finaly">
            <p class="shop-element__price">${item.productVariantPrice} ₽</p>
            <div class="shop-element__count">
              <a href="#" class="minus"><img src="./img/minus.svg" alt="Минус"></a>
              <p class="counter">${item.quantity}</p>
              <a href="#" class="plus"><img src="./img/plus.svg" alt="Плюс"></a>
            </div>
          </div>
        </div>
        <a href="#" class="delete"><img src="./img/basket.svg" alt="Удалить с корзины"></a>
      `;

      ordersList.append(listItem);
    });
  })
  .catch(error => console.error('Ошибка:', error));
