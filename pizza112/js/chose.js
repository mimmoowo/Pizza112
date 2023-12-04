var closeChose = document.getElementsByClassName("closeChose-pizza")[0];
var chosePizza= document.getElementById("chosePizza-modal");
var btnChose = document.getElementById("chosePizza");

btnChose.onclick = function() {
  chosePizza.style.display = "block";
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
var choseDrinks= document.getElementById("choseDrinks-modal");
var btnChoseDrinks = document.getElementById("choseDrinks");

btnChoseDrinks.onclick = function() {
  choseDrinks.style.display = "block";
}

closeChoseDrinks.onclick = function() {
  choseDrinks.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == choseDrinks) {
    choseDrinks.style.display = "none";
  }
}