//Attemp at simple memory card game
//Rendering Logic
var cardId = 1;
var myColor;
//Create random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//render overlaycards / hide paired below cards;
function hideCards() {
  var blackCardId = 101;
  var io = 0;
  console.log('1st phase');
  while (io < 8) {
    console.log('2st phase');
    myColor = "rgb(247, 230, 180)";
    for (var i = 0; i < 2; i++) {
      console.log("print black box");
      $('.map2').append('<div class="box" onClick="gameLogic(this.id)" id="loadID""></div>');
      $("#loadID").attr("id", blackCardId);
      $("#" + blackCardId).css("background-color", myColor);
      blackCardId++;
    };
    io++;
  };
  restartBool = true;
}
//Create cards paired by Color
function makeCards() {
  var io = 0;
  while (io < 8) {
    myColor = getRandomColor();
    for (var i = 0; i < 2; i++) {
      $('.map').append('<div class="box" id="loadID""></div>');
      $("#loadID").attr("id", cardId);
      $("#" + cardId).css("background-color", myColor);
      cardId++;
    };
    if (cardId > 16) { mesh(); };
    io++;
  };
} makeCards();
//Mix paired colors up and then render hidden cards over
function mesh() {
  for (var i = 1; i < 20; i++) {
    randomCard = Math.floor((Math.random() * 16) + 1);
    primeColor = $("#" + 1).css("background-color");
    $("#" + 1).css("background-color", $("#" + randomCard).css("background-color"));
    $("#" + randomCard).css("background-color", primeColor);
  }
  setTimeout(function () {
    console.log("sucesfully meshed"); $(".map2").show();
    hideCards();
  }, 2000);
}
//GAME LOGIC
var gameScore = 0;
var gameTimer = 1;
var guessColor = 0;
var previousCard = 0;
function gameLogic(_id) {
  $(".score").css("animation", "none")
  $(".box").css({
    transition: 'all 0.3s ease-in-out'
  });
  _newId = _id - 100;
  console.log(gameScore, gameTimer, guessColor, _id);
  if (gameTimer > 2) { return };
  $("#" + _id).css("animation", "float 0.5s ease-in");
  //get first cards
  if (gameTimer === 1) { $("#" + _id).css("background-color", $("#" + _newId).css("background-color")); gameTimer = 2; previousCard = _id; guessColor = $("#" + _newId).css("background-color"); return; }
  if (gameTimer === 2 && previousCard != _id) {
    gameTimer++;
    // guess correct
    if ($("#" + _newId).css("background-color") === guessColor) {
      console.log("PARTY WIN"); gameScore++; $(".score").css("animation", "float 0.4s ease-in-out").text(gameScore); $("#" + _id).css("background-color", $("#" + _newId).css("background-color")); gameTimer = 1; $("#" + _id).attr("onClick", ""); $("#" + previousCard).attr("onClick", "");
      return;
    }
    //guess wrong
    else if ($("#" + _newId).css("background-color") != guessColor) {
      console.log("LOSE"); gameScore--; $(".score").css("animation", "float 0.1s ease-in-out").text(gameScore);
      $("#" + _id).css("background-color", $("#" + _newId).css("background-color"));
      setTimeout(function () {
        $("#" + _id).css("background-color", "rgb(247, 230, 180)");
        $("#" + previousCard).css("background-color", "rgb(247, 230, 180)"); gameTimer = 1;
      }, 1000); return;
    };
  }
  return;
}
var restartBool = false;
function restartGame() {
  if (restartBool === true) {
    console.log("deleta all cards and make new ones");
    $(".box").remove();
    $(".score").text(0);
    gameScore = 0;
    gameTimer = 1;
    guessColor = 0;
    previousCard = 0;
    cardId = 1;
    myColor;
    restartBool = false;
    makeCards();
  }
} 