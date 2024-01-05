const token = localStorage.getItem("userToken");

const resultCount = document.querySelector(".result-count");
const paymentsResult = document.querySelector(".payments-result");

let totalCount = 0;
let totalAmount = 0;

const updateTotalCountAndAmount = (countChange, amountChange) => {
  try {
    totalCount += countChange;
    totalAmount += amountChange * countChange; 

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
      const size =
      item.productVariant[0] === "S"
        ? "25см"
        : item.productVariant[0] === "M"
          ? "30см"
          : "35см";
    const duff =
      item.productVariant[1] === "P" ? "традиционное тесто" : "тонкое тесто";

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
      updateTotalCountAndAmount(1, item.productVariantPrice);
      await addItem(item.productId, item.productVariant, 1); 
    };
    minus.onclick = async (ev) => {
      ev.preventDefault();
      if (count === 1) {
        ev.target.disabled = true;
        updateTotalCountAndAmount(-1, item.productVariantPrice);
        await resetItem(item.productId, item.productVariant);
        listItem.remove();
        return;
      }
      count--;
      counterBlock.innerHTML = count;
      updateTotalCountAndAmount(-1, item.productVariantPrice);
      await deleteItem(item.productId, item.productVariant);
    };
    deleteButton.onclick = async (ev) => {
      ev.preventDefault();
      updateTotalCountAndAmount(-count, item.productVariantPrice * count);
      await resetItem(item.productId, item.productVariant);
      listItem.remove();
    };

    totalCount += item.quantity;
    totalAmount += item.productVariantPrice * item.quantity;
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
  const resultSubmit = document.querySelector('.result-submit');


  resultSubmit.addEventListener('click', async (event) => {
  event.preventDefault();

  const url = 'https://pizza112.srvsrv.net/api/bucket/confirm';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    alert('Заказ успешно оплачен!');
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
