const closeButton = document.querySelector('.closePayment');
const resultSubmit = document.querySelector('.result-submit');
const modal = document.querySelector('#paymentOrder-modal');

  resultSubmit.addEventListener('click', function() {
    showModalWindow();
  });

  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });

  const deliveryType = document.getElementsByName('deliveryType');
  const addressDiv = document.getElementById('address');

  for(let i = 0; i < deliveryType.length; i++) {
    deliveryType[i].addEventListener('change', function() {
        if(this.value === 'delivery') {
            addressDiv.style.display = 'block';
        } else {
            addressDiv.style.display = 'none';
        }
    });
  }

  async function showModalWindow() {
    if (!token) return alert("Требуется авторизация");
  
    const url = "https://pizza112.srvsrv.net/api/bucket/showBucket";
  
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
  
    const response = await fetch(url, options);
    const data = await response.json();
  
    const orderDetailsList = document.querySelector(".order-details .order-detalis__list");

    orderDetailsList.innerHTML = '';
  
    totalCount = 0;
    totalAmount = 0;
  
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "order-detalis__item";

      const size =
        item.productVariant[0] === 'S'
          ? '25см'
          : item.productVariant[0] === 'M'
          ? '30см'
          : '35см';
      const duff =
        item.productVariant[1] === 'P' ? 'традиционное тесто' : 'тонкое тесто';
  
      listItem.innerHTML = `
        <div>
          <p class="order-detalis__item-name">${item.name}</p>
          <p class="order-detalis__item-parametr">${size}, ${duff}</p>
        </div>
        <div class="order-detalis__item-block">
          <p class="order-detalis__item-quantity">${item.quantity}</p>
          <p class="order-detalis__item-price">${item.productVariantPrice} ₽</p>
        </div>
      `;
  
      orderDetailsList.appendChild(listItem);
  
      updateTotalCountAndAmount(item.quantity, item.productVariantPrice);
    });
  
    document.querySelector('.order-total__quantity .order-total_count').innerHTML = `${totalCount} ${formatWord(
      totalCount,
      "товар",
      "товара",
      "товаров"
    )  + " шт"}`;
    document.querySelector('.order-total__price .order-total_price').innerHTML = new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽";
    document.querySelector('.order-total__quantity .order-total_price').innerHTML = new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽";
  
    modal.style.display = 'block';
  }


  document.getElementById('street').addEventListener('input', function (e) {
    var value = e.target.value;
    var digits = value.replace(/[^0-9]/g, '');
    var nonRussianLetters = value.replace(/[а-яА-ЯёЁ0-9\s]/g, '');
    if (digits.length > 3 || nonRussianLetters.length > 0) {
      e.target.value = value.substring(0, value.length-1);
    }
  });
  