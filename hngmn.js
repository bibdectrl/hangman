var words;
var currentWord;
var guessesLeft;
var guessDict;

var drawingInstructions;
var guessButton;

function preload(){
  words = loadStrings("words.txt");
}

function chooseWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function checkWin(){
    for (var i = 0; i < currentWord.length; i++){
        if (! guessDict[currentWord.charAt(i)]){
            return false;
        }
    }
    return true;
}

function checkLose(){
    return ! checkWin() && guessesLeft <= 0;
}

function reset(){
  guessesLeft = 6;
  currentWord = chooseWord();
  guessDict = {};
  for (var i = 0; i < currentWord.length; i++){
      guessDict[currentWord.charAt(i)] = false;
  }
}

function setup(){
  reset();
  drawingInstructions = [
      "ellipse(400, 100, 100, 100)",
      "line(400, 150, 400, 350)",
      "line(400, 350, 450, 450)",
      "line(400, 350, 355, 450)",
      "line(400, 250, 500, 200)",
      "line(400, 250, 300, 200)"
  ];
  var canvas = createCanvas(800, 600).parent('canvasHere');
  var input = select("#input");
  var guessButton = createButton("guess").parent("submit").mousePressed(function(){
    var char = input.value().toLowerCase();
    if (char.length > 0){
        if (! guessDict[char]){
         if (currentWord.indexOf(char) >= 0){
             guessDict[char] = true;
         } else {
             guessDict[char] = true;         
             this.guessesLeft--;   
         }
        }
     }
  }.bind(this));
  var guessButton = createButton("reset").parent("reset").mousePressed(function(){ 
      reset();
  });
}

function draw(){
  background(255);
  fill(0);
  rect(25, 500, 750, 50);
  rect(600, 10, 20, 500);
  rect(390, 10, 210, 20);
  rect(390, 10, 20, 50);
  fill(255);
  for (var i = 0; i < drawingInstructions.length - this.guessesLeft; i++){
      eval(drawingInstructions[i]);
  }
  for (var i = 0; i < currentWord.length; i++){
      textSize(12);
      fill(0);
      if (guessDict[currentWord.charAt(i)]){
        text(currentWord.charAt(i), 100 + 26 * i, 590);
      } else {
        text("_", 100 + 26 * i, 590);
      }
  }
  if (checkWin()){
      fill(0, 255, 0);
      textSize(26);
      text("You win!", 600, 580);
  }
  if (checkLose()){
      fill(255, 0, 0);
      textSize(26);
      text("You lose!", 600, 580);
  }
}