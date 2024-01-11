const token = localStorage.getItem("userToken");

const resultCount = document.querySelector(".result-count");
const paymentsResult = document.querySelector(".payments-result");

let totalCount = 0;
let totalAmount = 0;

const updateTotalCountAndAmount = (countChange, amountChange) => {
  try {
    totalCount += countChange;
    totalAmount += amountChange 

    if (resultCount && totalCount >= 0) {
      resultCount.innerHTML = `${totalCount} ${formatWord(
        totalCount,
        "товар",
        "товара",
        "товаров"
      )}`;
      paymentsResult.innerHTML =
        new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽";
    }
    if (paymentsResult && totalAmount > 0) {
      paymentsResult.innerHTML =
        new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽";
    }
  } catch (error) {
    console.log(error)
  }
};

const resetItem = async (productId, productVariant) => {
  try {
    const url = `https://pizza112.srvsrv.net/api/bucket/reset`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId,
        productVariant,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
};

// Функция для удаления одного товара
const deleteItem = async (productId, productVariant) => {
  try {
    const url = `https://pizza112.srvsrv.net/api/bucket/delete`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId,
        productVariant,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
};

// Функция для добавления товара
const addItem = async (productId, productVariant, quantity) => {
  try {
    const url = `https://pizza112.srvsrv.net/api/bucket/add`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId,
        quantity,
        productVariant,  
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    }
  } catch (error) {
    console.error(error)
  }
};

async function showBucket() {
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

  // Получаем ссылку на элемент списка с промокодом
  const promoCodeItem = document.querySelector(".shop-list .shop-item");

  data.forEach((item) => {
    try {
      // Расшифровываем значения info

let duff;
      if(item.productId == 8){
        if(item.productVariant == "SMV"){
          size = "250 мл, ванильный";
           duff ="маленький";
        }else if(item.productVariant == "SMS"){
          size = "250 мл, клубничный";
           duff ="маленький";
        }else if(item.productVariant == "SMC"){
          size = "250 мл, шоколадный";
           duff ="маленький";
        }else if(item.productVariant == "MMV"){
          size = "350 мл, ванильный";
          duff ="средний";
        }else if(item.productVariant == "MMC"){
          size = "350 мл, шоколадный";
          duff ="средний";
        }
        else if(item.productVariant == "MMS"){
          size = "350 мл, клубничный";
           duff ="средний";
        }
      }else if(item.productId == 9){
        if(item.productVariant == "SJC"){
          size = "500 мл, вишневый";
           duff ="маленький";
        }else if(item.productVariant == "SJO"){
          size = "500 мл, апельсиновый";
           duff ="маленький";
        }else if(item.productVariant == "SJA"){
          size = "250 мл, яблочный";
           duff ="маленький";
        }else if(item.productVariant == "MJC"){
          size = "1000 мл, вишневый";
          duff ="средний";
        }else if(item.productVariant == "MJO"){
          size = "1000 мл, апельсиновый";
          duff ="средний";
        }
        else if(item.productVariant == "MJA"){
          size = "1000 мл, яблочный";
           duff ="средний";
        }
      }else if(item.productId == 10){
        if(item.productVariant == "MD"){
          size = "400 мл";
           duff ="средний";
        }else if(item.productVariant == "SD"){
          size = "200 мл";
           duff ="маленький";
        }
      }else if(item.productId == 11){
        if(item.productVariant == "LD"){
          size = "400 мл";
           duff ="большой";
        }else if(item.productVariant == "MD"){
          size = "300 мл";
           duff ="средний";
        }
      }else if(item.productId == 12){
        if(item.productVariant == "SD"){
          size = "200 мл";
           duff ="маленький";
        }else if(item.productVariant == "MD"){
          size = "300 мл";
           duff ="средний";
        }
      }else if(item.productId == 13){
        if(item.productVariant == "SD"){
          size = "150 мл";
           duff ="маленький";
        }else if(item.productVariant == "MD"){
          size = "300 мл";
           duff ="средний";
        }
      }else{

        const size =
      item.productVariant[0] === "S"
        ? "25см"
        : item.productVariant[0] === "M"
          ? "30см"
          : "35см";
     duff =
      item.productVariant[1] === "P" ? "традиционное тесто" : "тонкое тесто";
    }


    // Создаем элемент списка для каждого товара
    const listItem = document.createElement("li");
    listItem.className = "shop-item";

    // Заполняем элемент списка информацией о товаре
    listItem.innerHTML = `
      <img src="https://pizza112.srvsrv.net/static/images/Products/${item.image}" alt="${item.name}" class="shop-item__img">
      <div class="shop-element">
        <p class="shop-element__name">${item.name}</p>
        <p class="shop-element__info">${size}, ${duff}</p>
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

    // Добавляем элемент списка в корзину перед элементом с промокодом
    document.querySelector(".shop-list").insertBefore(listItem, promoCodeItem);

    // Получаем ссылки на элементы счетчика для этого товара
    const plus = listItem.querySelector(".plus");
    const minus = listItem.querySelector(".minus");
    const counterBlock = listItem.querySelector(".counter");
    const deleteButton = listItem.querySelector(".delete");

    let count = item.quantity;

    plus.onclick = async (ev) => {
      ev.preventDefault();
      count++;
      counterBlock.innerHTML = count;
      updateTotalCountAndAmount(1, item.itemPrice);
      await addItem(item.productId, item.productVariant, 1); 
    };
    minus.onclick = async (ev) => {
      ev.preventDefault();
      if (count === 1) {
        ev.target.disabled = true;
        updateTotalCountAndAmount(-1, -item.itemPrice);
        await resetItem(item.productId, item.productVariant);
        listItem.remove();
        return;
      }
      count--;
      counterBlock.innerHTML = count;
      updateTotalCountAndAmount(-1, -item.itemPrice);
      await deleteItem(item.productId, item.productVariant);
    };
    deleteButton.onclick = async (ev) => {
      ev.preventDefault();
      updateTotalCountAndAmount(-count, -item.productVariantPrice);
      await resetItem(item.productId, item.productVariant);
      listItem.remove();
    };

    totalCount += item.quantity;
    totalAmount += item.productVariantPrice;
    } catch (error) {
      console.error(error)
    }
  });

  if (resultCount && totalCount > 0) {
    resultCount.innerHTML = `${totalCount} ${formatWord(
      totalCount,
      "товар",
      "товара",
      "товаров"
    )}`;
    paymentsResult.innerHTML = totalAmount + " ₽";
  }

  if (paymentsResult && totalAmount > 0) {
    paymentsResult.innerHTML =
      new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽";
  }
  
  //Оплата товара 
  const resultSubmit = document.querySelector('.submitOrder');

  resultSubmit.addEventListener('click', async (event) => {
  event.preventDefault();

  const payType = document.querySelector('input[name="paymentMethod"]:checked').value;
  const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
  console.log(payType);
  console.log(deliveryType);
  let address = null;
  if (deliveryType !== 'pickup') {
    address = document.querySelector('#street').value;
  }

  const url = 'https://pizza112.srvsrv.net/api/bucket/confirm';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      address,
      payType,
    }),    
  };

  const response = await fetch(url, options);

  if (response.ok) {
    alert('Заказ успешно оплачен!');
    location.reload();
  } else {
    alert('Произошла ошибка при оплате заказа');
  }
});

}

const formatWord = (count, one, two, five) => {
  let n = Math.abs(count) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) return five;
  if (n1 > 1 && n1 < 5) return two;
  if (n1 == 1) return one;
  return five;
};

showBucket();
