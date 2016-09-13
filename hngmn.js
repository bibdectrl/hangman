var words;
var currentWord;
var guessesLeft;
var guessDict;
var wrongLetters;
var drawingInstructions;

var guessButton;
var resetButton;



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
  wrongLetters = [];
  guessDict = {};
  for (var i = 0; i < currentWord.length; i++){
      guessDict[currentWord.charAt(i)] = false;
  }
  select("#input").value("");
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
  guessButton = createButton("guess").parent("submit").mousePressed(function(){
    var char = input.value().toLowerCase();
    if (char.length > 0){
        if (! guessDict[char]){
         if (currentWord.indexOf(char) >= 0){
             guessDict[char] = true;
         } else {
             guessDict[char] = true;
             wrongLetters.push(char);
             this.guessesLeft--;   
         }
        }
        select("#input").value("");
     }
  }.bind(this));
  resetButton = createButton("reset").parent("reset").mousePressed(function(){ 
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
  
  textSize(12);
  textAlign(CENTER);
  text("Incorrect guesses:", 50, 50);
  fill(255, 0, 0);
  for (var i = 0; i < wrongLetters.length; i++){
      text(wrongLetters[i], 50 + 12 * i, 70);
  }
  
  if (checkWin()){
      fill(0, 255, 0);
      textSize(26);
      text("You win!", 600, 580);
  }
  if (checkLose()){
      fill(255, 0, 0);
      textSize(26);
      textAlign(LEFT);
      text("You lose!", 600, 580);
      fill(0);
      textAlign(CENTER);
      text(currentWord, 380, 480);
  }
}