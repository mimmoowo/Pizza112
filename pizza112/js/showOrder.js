const token = localStorage.getItem("userToken");
var urlParams = new URLSearchParams(window.location.search);
var orderId = urlParams.get('orderId');

async function showOrderDetails(id) {
  if (!token) return alert("Требуется авторизация");

  const url = 'https://pizza112.srvsrv.net/api/bucket/showOrder';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ id: id })
  };

  const response = await fetch(url, options);
  const data = await response.json();

  let totalAmount = 0; 

  data.forEach(item => {
    try {
      const size =
        item.productVariant[0] === 'S'
          ? '25см'
          : item.productVariant[0] === 'M'
          ? '30см'
          : '35см';
      const duff =
        item.productVariant[1] === 'P' ? 'традиционное тесто' : 'тонкое тесто';

      const listItem = document.createElement('li');
      listItem.className = 'shop-item';

      listItem.innerHTML = `
        <img src="https://pizza112.srvsrv.net/static/images/Products/${item.image}" alt="${item.name}" class="shop-item__img">
        <div class="shop-element">
          <p class="shop-element__name">${item.name}</p>
          <p class="shop-element__info">${size}, ${duff}</p>
          <div class="shop-element__finaly">
            <p class="shop-element__price">${item.productVariantPrice} ₽</p>
          </div>
          <div class="shop-element__count">
          <p class="counter"> Количество: ${item.quantity}</p>
          </div>
        </div>
      `;

      document.querySelector('.shop-list').appendChild(listItem);

      totalAmount += item.productVariantPrice; 

      
      document.querySelector('.adressOrder-result').innerHTML = item.address ? item.address : "Самовывоз";
      document.querySelector('.paymentsOrder-result').innerHTML = item.payType === 'card' ? "Картой" : "Наличный расчет";
    } catch (error) {
      console.error('Error:', error);
    }
  });

  document.querySelector('.payments-result').innerHTML = new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽"; 
}

showOrderDetails(orderId);