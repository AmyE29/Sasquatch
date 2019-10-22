/* eslint-disable no-unused-vars */
'use strict';

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////~~~GLOBAL VARIABLES~~~//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//USER NAME (stored in a variable to be stringified for localStorage)
var userName = [];
//RESULT VALUES (gives the score number increase 32%, 23%, 15%, 8% of 5000)
var resultValues = [1600, 1150, 750, 400];
//BIGFOOT'S LOCATION VALUE (this stores bigfoots location)
var bigfootLocation = 0;
//PLAYER'S LOCATION VALUE (this stores player's location 15% of 5000)
var playerLocation = 750;
//RESULT RETURN STATEMENTS (gives the corresponding script statement for the score number increase)
//((MVP)These are generic global return statements for every card)
var returnStatements = ['Great Choice! You bound ahead 1600 feet!', 'Nice choice, you move ahead by 1150 feet!', 'Not bad, but Big Foot is gaining on you', 'Oh no! You are losing a lot of ground'];
//ALL CARDS ARRAY (all card objects are stored in here -- from card constructor)
var allCardsArray = [];
//UNIQUE CARDS ARRAY (At the start, stores randomly selected cards from allCardsArray, in this array for use during game)
var uniqueCardsArray = [];
//MAP NUMBER OF CLICKS (way to control the movement of bigfoot - AFTER the player moves)
// NOT SURE IF WE NEED THIS

//PLACE TO ATTACH CARDS ON THE PAGE (this is the variable that the card boxes will be appended to. and then removed from)
var cardAttach = document.getElementById('question-cards');
//TARGET THE CARD ON THE PAGE FOR REMOVAL (when the cards are created, they are created with card-popup ID. this targets them to be removed later)
var removePopupDiv = document.getElementById('card-popup');
//FIRST CARD OBJECT (the first card to pop up will always get its information from this object)
var firstCardObject = [];
//PLAYER SCORE (adds up the player's score throughout the game. to be stored into local storage later)
var playerScore = 0;
//WIN OBJECT (if player wins, the final card will get its information from this object)
// var winCardObject = [];
//LOSS OBJECT (if player loses, the final card will get its information from this object)va
// var lossCardObject = [];

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////~~~OBJECT CONSTRUCTORS~~~////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//#1 CARD CONSTRUCTOR/////////////////////////////////////////////////////////
//(this takes in a few parameters: name, situation detail(1script), options(4 scripts) stored in an array, (stretchGoal)filePathOfImage)
function Card(name, prompt, options) {
  this.name = name;
  this.prompt = prompt;
  this.options = options;
  allCardsArray.push(this);
}

//#2 CARD OPTIONS CONSTRUCTOR/////////////////////////////////////////////////
//(this takes in variables from cardOptions.js as scripts, stores them into a unique options array by card)(the resulting options array object from this constructor, is entered into the card constructor as the options parameter)
function OptionsConst(opt1, opt2, opt3, opt4) {
  this.options = [opt1, opt2, opt3, opt4];
}

//(STRETCH)#3 RESULTS STATEMENTS CONSTRUCTOR//////////////////////////////////
//(this would replace our global return statements)
//(this will create unique return options for each unique selection)(and store the unique responses into each card object instead of having a GLOBAL return statement array)
//(for example, in one game, eating berries moves you way ahead 32%, you get a return option of "Eating those berries was great! You feel the power...etc.")
//(cont.. in a different game, eating berries slows you down, only move 8%, you get a return "Eating those gave you cramps...etc.")



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////~~~FUNCTIONS~~~//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//RANDOM NUMBER GENERATOR/////////////////////////////////////////////////////
//(used to decide order of cards at start of game)
var makeRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
};

//////////////////////////////////////////////////////////////////////////////
//RENDER MAP//////////////////////////////////////////////////////////////////
//(this creates the map, canvas, images, divs, etc. appends children)
var renderMap = function() {
//creates a div that will store the map in the middle of the 'main-screen'
  var mapLocation = document.createElement('div');
  var cvsAttach = document.getElementById('main-screen');
  cvsAttach.appendChild(mapLocation);  
  //creates the canvas and appends it inside of the maplocation div
  var cvs = document.createElement('canvas');
  cvs.setAttribute('id', 'mapCanvas');
  mapLocation.appendChild(cvs);
  //here we create a div that attaches to the bottom of the map (same width) and holds playerScore and distance from bigfoot
  var scoreboard = document.createElement('div');
  mapLocation.appendChild(scoreboard);
  //distance from bigfoot
  var distanceScore = document.createElement('p');
  distanceScore.setAttribute('class', 'scoreboard');
  distanceScore.setAttribute('id', 'distance-score');
  scoreboard.appendChild(distanceScore);
  distanceScore.textContent = `DISTANCE FROM BIGFOOT: ${(playerLocation - bigfootLocation)} feet`;
  //playerScore
  var playerScoreboard = document.createElement('p');
  playerScoreboard.setAttribute('class', 'scoreboard');
  playerScoreboard.setAttribute('id', 'player-scoreboard');
  scoreboard.appendChild(playerScoreboard);
  playerScoreboard.textContent = `SCORE: ${playerScore}`;
  //here will be our bigfoot and player images
  var bgPlayer = new Image();
  var bgBigfoot = new Image();
  bgPlayer.src = 'image url here';
  bgBigfoot.src = 'image url here';
  //this hides the footer row
  var showFooter = document.getElementById('footerRow');
  showFooter.setAttribute('style', 'display: none');
};

//////////////////////////////////////////////////////////////////////////////
//UPDATE SCOREBOARD///////////////////////////////////////////////////////////
//updates the scoreboard after a result card
var updateScoreboard = function(){
//updates distance from bigfoot value
  var distUpdate = document.getElementById('distance-score');
  distUpdate.textContent = `DISTANCE FROM BIGFOOT: ${(playerLocation - bigfootLocation)} feet`;
  //updates player score
  var scoreUpdate = document.getElementById('id', 'player-scoreboard');
  scoreUpdate.textContent = `SCORE: ${playerScore}`;
};

//////////////////////////////////////////////////////////////////////////////
//CREATE CARD DIV/////////////////////////////////////////////////////////////
//(this creates a card div, creates p tags, assigns p tags IDs(for event listener to tell which number user clicks) AND fills those p tags with the information from a card object)
var renderCardDiv = function(){
  var cardAttach = document.getElementById('question-cards');
  var temp = uniqueCardsArray.shift();
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'card-popup');
  cardAttach.appendChild(cardDiv);
  //   created prompt paragraph on card
  var cardPromptParagraph = document.createElement('p');
  cardDiv.appendChild(cardPromptParagraph);
  cardPromptParagraph.textContent = temp.prompt;

  var questionDiv = document.createElement('div');
  cardDiv.appendChild(questionDiv);

  for (var i= 0; i < 4; i ++) {
    var newPTag = document.createElement('p');
    questionDiv.appendChild(newPTag);
    newPTag.textContent = temp.options.options[i];
  }
};
//////////////////////////////////////////////////////////////////////////////
//CREATE FIRST CARD DIV///////////////////////////////////////////////////////
//(almost same as above)(has a unique ID and unique event listener so that a click will just remove 1st card and WONT try to store a value from the card)(always calls the first card object)
var renderFirstCardDiv = function(){
  var cardAttach = document.getElementById('question-cards');
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'card-popup');
  cardAttach.appendChild(cardDiv);
  //   created prompt paragraph on card
  var cardPromptParagraph = document.createElement('p');
  cardDiv.appendChild(cardPromptParagraph);
  cardPromptParagraph.textContent = firstCardObject.prompt;
};
//////////////////////////////////////////////////////////////////////////////
//CREATE RESULT CARD DIV/////////////////////////////////////////////////////
//(this creates the result card)(appends score from chosen answer)(appends corresponding resultStatement (global))
//(needs the score from event listener)
var renderResultCardDiv = function(){
  var removePopupDiv = document.getElementById('card-popup');
  removePopupDiv.remove();
  var cardAttach = document.getElementById('question-cards');
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'card-popup');
  cardAttach.appendChild(cardDiv);
  var randomResult = makeRandom(0,3);
  var randomResultValue = resultValues[randomResult];
  //creates p tag and displays returnStatement from array
  var cardResultParagraph = document.createElement('p');
  cardDiv.appendChild(cardResultParagraph);
  cardResultParagraph.textContent = returnStatements[randomResult];
  //creates p tag that holds the +score value.
  var resultingScoreParagraph = document.createElement('p');
  cardDiv.appendChild(resultingScoreParagraph);
  resultingScoreParagraph.textContent = `+ ${randomResultValue} points`;
  playerScore += randomResultValue;
};

//RENDER WINNER FUNCTION/////////////////////////////////////////////////////
//(winner function removes/hides game canvas, and in its place, displays the winning newspaper image, play again button, and reveals the footer row again)
var renderWinner = function(){
  //removes the game canvas so that we can display the player's victory
  var gameCanvas = document.getElementById('mapCanvas');
  gameCanvas.remove();
  //creates an image element that will hold the newspaper appends to main-screen
  var winningNewspaper = document.createElement('img');
  var mapAttach = document.getElementById('main-screen');
  mapAttach.appendChild(winningNewspaper);
  //creates and appends a play button to the image
  var playAgainButton = document.createElement('button');
  winningNewspaper.appendChild(playAgainButton);
  playAgainButton.textContent = 'PLAY AGAIN';
  //reveals the footer row again
  var showFooter = document.getElementById('footerRow');
  showFooter.setAttribute('style', 'display: block');
};

//RENDER LOSER FUNCTION/////////////////////////////////////////////////////
//(loser function removes/hides canvas, and in its place, displays the losing tombstone image, play again button and reveals the footer row again)
var renderLoser = function(){
  //removes the game canvas so that we can display the player's loss
  var gameCanvas = document.getElementById('mapCanvas');
  gameCanvas.remove();
  //creates an image element that will hold the game-over tombstone, appends to main-screen
  var gameOverTombstone = document.createElement('img');
  var mapAttach = document.getElementById('main-screen');
  mapAttach.appendChild(gameOverTombstone);
  //creates and appends a play button to the image
  var playAgainButton = document.createElement('button');
  gameOverTombstone.appendChild(playAgainButton);
  playAgainButton.textContent = 'PLAY AGAIN';
  //reveals the footer row again
  var showFooter = document.getElementById('footerRow');
  showFooter.setAttribute('style', 'display: block');
};

//RANDOMIZE ALL CARDS/////////////////////////////////////////////////////////
//(say you have 5 cards)(this picks a random number between 0 and 4)(the temp result is used, as the index of allCardsArray, to push that card into uniqueCardsArray)
//(then the randomly picked number is stored)(the function runs again, a random number between 0 and 4, as long as the number is not the same as one before it picks that index.)
//(it loops on untill all 5 cards are moved into unique array in a random order)
var uniqueNumberArray = [];
var randomizeAllCards = function(){
  var uniqueRandomNumber = makeRandom(0,4);
  while(uniqueNumberArray.length < 5){
    if(!uniqueNumberArray.includes(uniqueRandomNumber)){
      uniqueNumberArray.push(uniqueRandomNumber);
    } else {
      uniqueRandomNumber = makeRandom(0,4);
    }
  }
  for(var i = 0; i < uniqueNumberArray.length; i++){
    uniqueCardsArray.push(allCardsArray[uniqueNumberArray[i]]);
  }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////~~~EVENT LISTENERS~~~///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//#1 SUBMIT BUTTON////////////////////////////////////////////////////////////
//(when user presses start button, checks "if" a valid name is entered, removes starting fieldset/form, calls render map, delays (if possible), calls create FIRST card div function)
function makeOnSubmitWork(){
  var onSubmit = document.getElementById('user-form');
  onSubmit.addEventListener('submit', handleSubmit);
}

function handleSubmit(){
  event.preventDefault();
  //checks if the user entered something for their player's name. stores name in userName.
  if(event.target.playerName.value === ''){
    alert('Invalid Entry. Please enter your player name.');
    return;
  } else {
    userName.push(event.target.playerName.value);
    //removes fieldset
    var fieldsetRemove = document.getElementById('user-form');
    fieldsetRemove.remove();
    //creates map
    renderMap();
    setTimeout(renderCardDiv, 4000);
  }
};
//#2 CLICK FIRST CARD, SHOWS MAP AGAIN////////////////////////////////////////
//(when user clicks the first card, it removes first card, shows map)

//#3 CLICK MAP, SHOWS CARDS///////////////////////////////////////////////////
//(when user clicks map it calls create card div function, shows card in middle of map)

//#4 CLICK CARD ANSWER, RENDERS RESULT CARD///////////////////////////////////
//(when user clicks an answer on the card div it stores value, removes card div, calls createResultCardDiv function)

//#5 REMOVE RESULT CARD && SHOW MAP AGAIN/////////////////////////////////////
//(when the user clicks on the result card div, it removes the result div)(map is visible again)(moves the characters based on the value chosen)(after move THEN it runs if statement)(if win/lose those functions run)(else: game continues on - back to event listener #3)

//////////////////////////////////////////////////////////////////////////////
//WIN CONDITION IF STATEMENT//////////////////////////////////////////////////
//(this sets "if user location = finishline location" then "run winner function")
if(playerLocation >= 5000){
  renderWinner();
}
//////////////////////////////////////////////////////////////////////////////
//LOSS CONDITION IF STATEMENT/////////////////////////////////////////////////
//(this sets "if bigfoot location >= user location" then "run loser function")
if(bigfootLocation >= playerLocation){
  renderLoser();
}


