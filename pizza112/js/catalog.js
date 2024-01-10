document.addEventListener("DOMContentLoaded", (event) => {
  let currentPizzaCount = 3;

  const url = "https://pizza112.srvsrv.net/api/show";

  function getPizzas(from, count) {
    if (currentPizzaCount === 9) return (currentPizzaCount = 6);
    const data = {
      from: from.toString(),
      count: count.toString(),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 3) data.splice(0, data.length - 3);
        const list = document.querySelector(".catalog-pizza__list");
        const array = Array.from(list.children);
        array.forEach((child, idx) => {
          if (idx !== 0 && idx !== array.length - 1) {
            list.removeChild(child);
          }
        });

        const rightArrow = list.querySelector('img[src="./img/right-pizza.svg"]')
          .parentNode.parentNode;

        data.forEach((item) => {
          const li = document.createElement("li");
          li.className = "catalog-pizza__item";

          li.innerHTML = `
          <img src="https://pizza112.srvsrv.net/static/images/Products/${item.imageName}" class="catalog-pizza__img">
            <h3 class="catalog-pizza__name">${item.productName}</h3>
            <p class="catalog-pizza__info">${item.productDescription}</p>
            <div class="catalog-pizza__bottom">
              <p class="catalog-pizza__price">от ${item.basePrice} ₽</p>
              <button class="catalog-pizza__chose" data-id="${item.id}"
                meta-name="${item.productName}"
                meta-bg="${item.imageName}"
                meta-info="${item.productDescription}"
                >выбрать</a>
            </div>
          `;

          list.insertBefore(li, rightArrow);
        });
      })
      .catch((error) => console.error("Ошибка:", error));
  }

  document
    .querySelector('img[src="./img/left-pizza.svg"]')
    .addEventListener("click", () => {
      if (currentPizzaCount > 3) {
        currentPizzaCount -= 3;
        getPizzas("Pizza", currentPizzaCount);
      }
    });

  document
    .querySelector('img[src="./img/right-pizza.svg"]')
    .addEventListener("click", () => {
      currentPizzaCount += 3;
      getPizzas("Pizza", currentPizzaCount);
    });

  getPizzas("Pizza", currentPizzaCount);
});

function getPizzaVariants(pizzaId) {
  const url = "https://pizza112.srvsrv.net/api/show/product";

  const data = {
    id: pizzaId.toString(),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Ошибка:", error));
}

document.addEventListener("DOMContentLoaded", (event) => {
  let currentDrinkCount = 3;

  const url = "https://pizza112.srvsrv.net/api/show";

  function getDrinks(from, count) {
    if (currentDrinkCount === 9) return (currentDrinkCount = 6);
    const data = {
      from: from.toString(),
      count: count.toString(),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 3) data.splice(0, data.length - 3);
        const list = document.querySelector(".catalog-drinks__list");
        const array = Array.from(list.children);
        array.forEach((child, idx) => {
          if (idx !== 0 && idx !== array.length - 1) {
            list.removeChild(child);
          }
        });

        const rightArrow = list.querySelector('img[src="./img/right-drink.svg"]')
          .parentNode.parentNode;

        data.forEach((item) => {
          const li = document.createElement("li");
          li.className = "catalog-drinks__item";

          li.innerHTML = `
          <img src="https://pizza112.srvsrv.net/static/images/Products/${item.imageName}" class="catalog-drinks__img">
            <h3 class="catalog-drinks__name">${item.productName}</h3>
            <p class="catalog-drinks__info">${item.productDescription}</p>
            <div class="catalog-drinks__bottom">
              <p class="catalog-drinks__price">от ${item.basePrice} ₽</p>
              <button class="catalog-drinks__chose" data-id="${item.id}"
                meta-name="${item.productName}"
                meta-bg="${item.imageName}"
                meta-info="${item.productDescription}"
                >выбрать</a>
            </div>
          `;

          list.insertBefore(li, rightArrow);
        });
      })
      .catch((error) => console.error("Ошибка:", error));
  }

  document
    .querySelector('img[src="./img/left-drink.svg"]')
    .addEventListener("click", () => {
      if (currentDrinkCount > 3) {
        currentDrinkCount -= 3;
        getDrinks("Drink", currentDrinkCount);
      }
    });

  document
    .querySelector('img[src="./img/right-drink.svg"]')
    .addEventListener("click", () => {
      currentDrinkCount += 3;
      getDrinks("Drink", currentDrinkCount);
    });

  getDrinks("Drink", currentDrinkCount);
});

function getDrinkVariants(drinkId) {
  const url = "https://pizza112.srvsrv.net/api/show/product";

  const data = {
    id: drinkId.toString(),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Ошибка:", error));
}
