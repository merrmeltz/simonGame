var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var checkPattern = 0;



$(document).keypress(function(event) {
  if (!started) {
    started = true;
    nextSequence();
  }
});


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePressed(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
  userClickedPattern = [];

  $("#level-title").text("level " + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  setTimeout(function() {
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
  }, 100);


};

function checkAnswer(currentLength) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (userClickedPattern[currentLength] === gamePattern[currentLength]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

};

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

};
