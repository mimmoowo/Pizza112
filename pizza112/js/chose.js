var closeChose = document.getElementsByClassName("closeChose-pizza")[0];
var chosePizza = document.getElementById("chosePizza-modal");
var btnsChose = document.getElementsByClassName("catalog-pizza__chose");

for (var i = 0; i < btnsChose.length; i++) {
  btnsChose[i].onclick = function() {
    chosePizza.style.display = "block";
  }
}

closeChose.onclick = function() {
  chosePizza.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == chosePizza) {
    chosePizza.style.display = "none";
  }
}

var closeChoseDrinks = document.getElementsByClassName("closeChose-drinks")[0];
var choseDrinks = document.getElementById("choseDrinks-modal");
var btnsChoseDrinks = document.getElementsByClassName("catalog-drinks__chose");

for (var i = 0; i < btnsChoseDrinks.length; i++) {
  btnsChoseDrinks[i].onclick = function() {
    choseDrinks.style.display = "block";
  }
}

closeChoseDrinks.onclick = function() {
  choseDrinks.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == choseDrinks) {
    choseDrinks.style.display = "none";
  }
}
