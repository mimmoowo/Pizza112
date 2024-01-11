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
        const drinks = await getDrinkVariants(drinkId);


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




        const small = document.getElementById("25");
        const medium = document.getElementById("35");
          let drink = {
            size: "S",
            flavor: "MV",
          };

        if(drinkId == 11){
          document.getElementById("25").innerText = "средний";
          document.getElementById("35").innerText = "большой";
                small.onclick = (ev) => {
                  ev.preventDefault();
                  drink.size = "M";
                  changer.update();
                };
                medium.onclick = (ev) => {
                  ev.preventDefault();
                  drink.size = "L";
                  changer.update();
                };


        }else{
          document.getElementById("25").innerText = "маленький";
          document.getElementById("35").innerText = "средний";

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
        }

        if(drinkId == 8){
          document.getElementById("drink_btns")
          .innerHTML = '<a href="#" id="vanilla" >ванильный</a><a href="#" id="chocolate">шоколадный</a><a href="#" id="strawberry">молочный</a>'

          const vanilla = document.getElementById("vanilla");
          const chocolate = document.getElementById("chocolate");
          const strawberry = document.getElementById("strawberry");


          vanilla.onclick = (ev) => {
            ev.preventDefault();
            drink.flavor = "MV";
            changer.update();
          };
          chocolate.onclick = (ev) => {
            ev.preventDefault();
            drink.flavor = "MC";
            changer.update();
          };
          strawberry.onclick = (ev) => {
            ev.preventDefault();
            drink.flavor = "MS";
            changer.update();
          };
        }else if(drinkId == 9){
           document.getElementById("drink_btns")
          .innerHTML = '<a href="#" id="yabloko" >яблочный</a><a href="#" id="apelsin">апельсиновый</a><a href="#" id="vishnya">вишневый</a>'

          const yabloko = document.getElementById("yabloko");
          const apelsin = document.getElementById("apelsin");
          const vishnya = document.getElementById("vishnya");
           drink = {
            size: "S",
            flavor: "JA",
          };

          yabloko.onclick = (ev) => {
            ev.preventDefault();
            drink.flavor = "JA";
            changer.update();
          };
          apelsin.onclick = (ev) => {
            ev.preventDefault();
            drink.flavor = "JO";
            changer.update();
          };
          vishnya.onclick = (ev) => {
            ev.preventDefault();
            drink.flavor = "JC";
            changer.update();
          };

        }else if(drinkId == 10){
          document.getElementById("drink_btns").innerHTML = ''
          drink = {
            size: "S",
            flavor: "D",
          };

        }else if(drinkId == 11){
          document.getElementById("drink_btns").innerHTML = ''
          drink = {
            size: "M",
            flavor: "D",
          };

        }else if(drinkId == 12 || drinkId == 13){
          document.getElementById("drink_btns").innerHTML = ''
          drink = {
            size: "S",
            flavor: "D",
          };

        }
        
         const updateInfo = () => {
          const currDrinkData = drinks.find(
            (el) => el.name === drink.size + drink.flavor
          );
          if (drinkId == 8) {
                      const flavor =
            drink.flavor === "MV"
              ? "ванильный"
              : drink.flavor === "MC"
              ? "шоколадный"
              : 
              "клубничный"; 
          const size = drink.size === "S" ? "маленький" : "средний";
          total.innerHTML = `${flavor}, ${size}, ${currDrinkData.portionInMilliliters} мл`;

          }else if (drinkId == 9) {
              const flavor =
              drink.flavor === "JA"
                ? "яблочный"
                : drink.flavor === "JO"
                ? "апельсиновый"
                : 
                "вишневый"; 
            const size = drink.size === "S" ? "маленький" : "средний";
            total.innerHTML = `${flavor}, ${size}, ${currDrinkData.portionInMilliliters} мл`;
            
          }else if (drinkId == 10) {
              const flavor ="Капучино"; 
            const size = drink.size === "S" ? "маленький" : "средний";
            total.innerHTML = `${flavor}, ${size}, ${currDrinkData.portionInMilliliters} мл`;
            
          }else if (drinkId == 11) {
              const flavor ="Латте"; 
            const size = drink.size === "S" ? "средний" : "большой";
            total.innerHTML = `${flavor}, ${size}, ${currDrinkData.portionInMilliliters} мл`;
            
          }else if (drinkId == 12) {
              const flavor ="Американо"; 
            const size = drink.size === "S" ? "маленький" : "средний";
            total.innerHTML = `${flavor}, ${size}, ${currDrinkData.portionInMilliliters} мл`;
            
          }else if (drinkId == 13) {
              const flavor ="Какао"; 
            const size = drink.size === "S" ? "маленький" : "средний";
            total.innerHTML = `${flavor}, ${size}, ${currDrinkData.portionInMilliliters} мл`;
            
          }
          

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
    const currDrinkData = drinks.find(
      (el) => el.name === drink.size + drink.flavor
    );
    const sum = count * currDrinkData.price;
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
      productVariant: drink.size + drink.flavor,
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
    choseDrinks.style.display = "none";
  };
  }
});
  