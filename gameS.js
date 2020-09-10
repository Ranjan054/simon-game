var buttoncolor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

var started = false;

//Keyboard pressed
var level = 0;
$(document).keypress(function  (){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started= true;
  }
});


//buttons clicked
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
 playsound(userChosenColor);
 animatePress(userChosenColor);
 checkAnswer(userClickPattern.length-1);
});

// Check answer
function checkAnswer (currentLevel){
if (gamePattern[currentLevel] === userClickPattern[currentLevel]){


  if (userClickPattern.length ===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
} else {

  playsound("wrong");
  $("body").addClass("game-over");
    $("level-title").text("Game Over, Press Any Key To ReStart!");

  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);



  startOver();
}

}




// next sequence
function nextSequence (){
  userClickPattern = [];
level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttoncolor[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
}


//animate pressed
function animatePress (currentColor){
  $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

// play sound
function playsound (name){
  var audio = new Audio ("sounds/"+ name +".mp3");
       audio.play();
}

// stat over the game

function startOver(){
  level=0;
  gamePattern=[];
  started = false;
}
