var closeChose = document.getElementsByClassName("closeChose-pizza")[0];
var chosePizza = document.getElementById("chosePizza-modal");
var btnsChose = document.getElementsByClassName("catalog-pizza__chose");

for (var i = 0; i < btnsChose.length; i++) {
  btnsChose[i].onclick = function () {
    chosePizza.style.display = "block";
  };
}

closeChose.onclick = function () {
  chosePizza.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == chosePizza) {
    chosePizza.style.display = "none";
  }
};

var closeChoseDrinks = document.getElementsByClassName("closeChose-drinks")[0];
var choseDrinks = document.getElementById("choseDrinks-modal");
var btnsChoseDrinks = document.getElementsByClassName("catalog-drinks__chose");

for (var i = 0; i < btnsChoseDrinks.length; i++) {
  btnsChoseDrinks[i].onclick = function () {
    choseDrinks.style.display = "block";
  };
}

closeChoseDrinks.onclick = function () {
  choseDrinks.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == choseDrinks) {
    choseDrinks.style.display = "none";
  }
};

class Changer extends EventTarget {
  update() {
    this.dispatchEvent(new Event("update"));
  }
}

document
  .querySelector(".catalog-pizza__list")
  .addEventListener("click", async function (event) {
    if (event.target.className === "catalog-pizza__chose") {
      const pizzaId = event.target.getAttribute("data-id"); // Получаем ID пиццы из атрибута data-id

      const variables = await getPizzaVariants(pizzaId);

      //получаем мета данные
      const metaBg = event.target.getAttribute("meta-bg");
      const metaName = event.target.getAttribute("meta-name");
      const metaInfo = event.target.getAttribute("meta-info");
      //получаем блоки
      const modalBox = document.getElementById("chosePizza-modal");

      const bg = modalBox.getElementsByClassName("pizza-background")[0];

      const name = modalBox.getElementsByClassName(
        "chosePizza-content__name"
      )[0];
      const total = modalBox.getElementsByClassName(
        "chosePizza-content__ingredient"
      )[0];
      const info = modalBox.getElementsByClassName(
        "chosePizza-ingredient__info"
      )[0];

      //заполняем данные
      name.innerHTML = metaName;
      info.innerHTML = metaInfo;

      bg.src = `https://pizza112.srvsrv.net/static/images/Products/${metaBg}`;
      chosePizza.style.display = "block";

      //настройка пиццы
      const changer = new Changer();

      const variable = {
        size: "M",
        duff: "P",
      };

      const little = document.getElementById("little");
      const medium = document.getElementById("medium");
      const big = document.getElementById("big");
      const traditional = document.getElementById("traditional");
      const thin = document.getElementById("thin");

      little.onclick = (ev) => {
        ev.preventDefault();
        variable.size = "S";
        changer.update();
      };
      medium.onclick = (ev) => {
        ev.preventDefault();
        variable.size = "M";
        changer.update();
      };
      big.onclick = (ev) => {
        ev.preventDefault();
        variable.size = "L";
        changer.update();
      };
      traditional.onclick = (ev) => {
        ev.preventDefault();
        variable.duff = "P";
        changer.update();
      };
      thin.onclick = (ev) => {
        ev.preventDefault();
        variable.duff = "TP";
        changer.update();
      };

      const updateInfo = () => {
        const currVariableData = variables.find(
          (el) => el.name === variable.size + variable.duff
        );
        console.log(currVariableData);
        const duff =
          variable.duff === "P" ? "традиционное тесто" : "тонкое тесто";
        const size =
          variable.size === "S"
            ? "25см"
            : variable.size === "M"
            ? "30см"
            : "35см";
        total.innerHTML = `${size}, ${duff}, ${currVariableData.weight} г`;
      };
      updateInfo();

      changer.addEventListener("update", updateInfo);

      //настраиваем счетчик
      const counter = new Changer();

      let count = 1;

      const plus = modalBox.getElementsByClassName("plus")[0];
      const minus = modalBox.getElementsByClassName("minus")[0];

      const counterBlock = modalBox.getElementsByClassName("counter")[0];

      plus.onclick = (ev) => {
        ev.preventDefault();
        count++;
        counter.update();
      };
      minus.onclick = (ev) => {
        ev.preventDefault();
        if (count === 1) return;
        count--;
        counter.update();
      };

      const updateCounter = () => {
        counterBlock.innerHTML = count;
      };
      updateCounter();

      counter.addEventListener("update", updateCounter);

      //настраивем тотал

      const end = modalBox
        .getElementsByClassName("chosePizza-content__end")[0]
        .getElementsByTagName("span")[0];

      const showEnd = () => {
        const currVariableData = variables.find(
          (el) => el.name === variable.size + variable.duff
        );
        const sum = count * currVariableData.price;
        end.innerHTML = sum + " ₽";
      };
      counter.addEventListener("update", showEnd);
      changer.addEventListener("update", showEnd);
      showEnd();

      //добавление в корзину

      const addBtn = modalBox.getElementsByClassName(
        "chosePizza-content__end"
      )[0];

      addBtn.onclick = async (ev) => {
        ev.preventDefault();

        const token = localStorage.getItem("userToken");

        if (!token) return alert("Требуется авторизация");

        const url = "https://pizza112.srvsrv.net/api/bucket/add";

        const data = {
          productId: pizzaId,
          quantity: count,
          productVariant: variable.size + variable.duff,
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        };  
        await fetch(url, options);
        alert("Товар добавлен");
        chosePizza.style.display = "none";
      };
    }
  });
  
  document
    .querySelector(".catalog-drinks__list")
    .addEventListener("click", async function (event) {
      if (event.target.className === "catalog-drinks__chose") {
        const drinkId = event.target.getAttribute("data-id"); // Получаем ID напитка из атрибута data-id
  
        const variables = await getDrinkVariants(drinkId);
  
        //получаем мета данные
        const metaBg = event.target.getAttribute("meta-bg");
        const metaName = event.target.getAttribute("meta-name");
        const metaInfo = event.target.getAttribute("meta-info");
        //получаем блоки
        const modalBox = document.getElementById("choseDrinks-modal");
  
        const bg = modalBox.getElementsByClassName("drinks-background")[0];
  
        const name = modalBox.getElementsByClassName(
          "choseDrinks-content__name"
        )[0];
        const total = modalBox.getElementsByClassName(
          "choseDrinks-content__ingredient"
        )[0];
        const info = modalBox.getElementsByClassName(
          "choseDrinks-ingredient__info"
        )[0];
  
        //заполняем данные
        name.innerHTML = metaName;
        info.innerHTML = metaInfo;
  
        bg.src = `https://pizza112.srvsrv.net/static/images/Products/${metaBg}`;
        choseDrinks.style.display = "block";
  
        //настройка напитка
        const changer = new Changer();

        const drink = {
          size: "S",
          flavor: "V",
        };

        const small = document.getElementById("250");
        const medium = document.getElementById("350");
        const vanilla = document.getElementById("vanilla");
        const chocolate = document.getElementById("chocolate");
        const strawberry = document.getElementById("strawberry");

        small.onclick = (ev) => {
          ev.preventDefault();
          drink.size = "S";
          changer.update();
        };
        medium.onclick = (ev) => {
          ev.preventDefault();
          drink.size = "M";
          changer.update();
        };
        vanilla.onclick = (ev) => {
          ev.preventDefault();
          drink.flavor = "V";
          changer.update();
        };
        chocolate.onclick = (ev) => {
          ev.preventDefault();
          drink.flavor = "C";
          changer.update();
        };
        strawberry.onclick = (ev) => {
          ev.preventDefault();
          drink.flavor = "S";
          changer.update();
        };

        const updateInfo = () => {
          const currDrinkData = drinks.find(
            (el) => el.name === drink.size + drink.flavor
          );
          console.log(currDrinkData);
          const flavor =
            drink.flavor === "V"
              ? "ванильный"
              : drink.flavor === "C"
              ? "шоколадный"
              : "клубничный";
          const size = drink.size === "S" ? "маленький" : "средний";
          total.innerHTML = `${flavor}, ${size}, ${currDrinkData.portionInMilliliters} мл`;
        };
        updateInfo();

        changer.addEventListener("update", updateInfo);

        //настраиваем счетчик
        const counter = new Changer();
  
        let count = 1;
  
        const plus = modalBox.getElementsByClassName("plus")[0];
        const minus = modalBox.getElementsByClassName("minus")[0];
  
        const counterBlock = modalBox.getElementsByClassName("counter")[0];
  
        plus.onclick = (ev) => {
          ev.preventDefault();
          count++;
          counter.update();
        };
        minus.onclick = (ev) => {
          ev.preventDefault();
          if (count === 1) return;
          count--;
          counter.update();
        };
  
        const updateCounter = () => {
          counterBlock.innerHTML = count;
        };
        updateCounter();
  
        counter.addEventListener("update", updateCounter);
        const end = modalBox
  .getElementsByClassName("choseDrinks-content__end")[0]
  .getElementsByTagName("span")[0];

  const showEnd = () => {
    const currVariableData = variables.find(
      (el) => el.name === variable.size + variable.duff
    );
    const sum = count * currVariableData.price;
    end.innerHTML = sum + " ₽";
  };
  counter.addEventListener("update", showEnd);
  changer.addEventListener("update", showEnd);
  showEnd();

  //добавление в корзину
  const addBtn = modalBox.getElementsByClassName(
    "choseDrinks-content__end"
  )[0];

  addBtn.onclick = async (ev) => {
    ev.preventDefault();

    const token = localStorage.getItem("userToken");

    if (!token) return alert("Требуется авторизация");

    const url = "https://pizza112.srvsrv.net/api/bucket/add";

    const data = {
      productId: drinkId,
      quantity: count,
      productVariant: variable.size + variable.type,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    };  
    await fetch(url, options);
    alert("Товар добавлен");
    choseDrink.style.display = "none";
  };
  }
});
  