/* eslint-disable no-unused-vars */
'use strict';

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////~~~GLOBAL VARIABLES~~~//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
var winners = [];
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
// var cardAttach = document.getElementById('mapCanvas');
//TARGET THE CARD ON THE PAGE FOR REMOVAL (when the cards are created, they are created with card-popup ID. this targets them to be removed later)
var removePopupDiv = document.getElementById('card-popup');
//FIRST CARD OBJECT (the first card to pop up will always get its information from this object)
// var firstCardObject = [];
var firstCard = 'You\'ve just spent a beautiful afternoon hiking on Mt. Rainier, when all of a sudden you encounter Big Foot!  You need to make it back down the mountain and to your car before Big Foot reaches you.  Make the right choices and you will stay ahead of him,the wrong choices will put you in peril';
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

//#3 PLAYER NAME/SCORE CONSTRUCTOR////////////////////////////////////////////
//(this creates 'people' with a name and a score property)
function Player(name, score) {
  this.name = name;
  this.score = score;

}
//(STRETCH)#4 RESULTS STATEMENTS CONSTRUCTOR//////////////////////////////////
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
var makeRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//////////////////////////////////////////////////////////////////////////////
//RENDER MAP//////////////////////////////////////////////////////////////////
//(this creates the map, canvas, images, divs, etc. appends children)
var renderMap = function () {
  var mainLocation = document.getElementById('main');
  
  //creates a div that will store the map in the middle of the 'main-screen'
  var mapLocation = document.createElement('div');
  mapLocation.setAttribute('style', 'position: relative');
  mapLocation.setAttribute('id', 'mapCanvas');
  var cvsAttach = document.getElementById('main-screen');
  cvsAttach.appendChild(mapLocation);
  //creates the canvas and appends it inside of the maplocation div
  var cvs = document.createElement('div');
  cvs.setAttribute('class', 'background');
  mapLocation.appendChild(cvs);
  var backgroundImage = document.createElement('img');
  backgroundImage.setAttribute('src', 'Media/background.png');
  backgroundImage.setAttribute('id', 'background-image');
  cvs.appendChild(backgroundImage);
  //create car image
  var amysPurpleCar = document.createElement('img');
  amysPurpleCar.setAttribute('id', 'purple-car');
  amysPurpleCar.setAttribute('src', 'Media/car.png');
  cvs.appendChild(amysPurpleCar);
  //create bigfoot image
  var bigfootImage = document.createElement('img');
  bigfootImage.setAttribute('id', 'bigfoot');
  bigfootImage.setAttribute('class', 'character');
  bigfootImage.setAttribute('src', 'Media/bigfoot.png');
  cvs.appendChild(bigfootImage);
  //create player image
  var playerImage = document.createElement('img');
  playerImage.setAttribute('id', 'hiker');
  playerImage.setAttribute('class', 'character');
  playerImage.setAttribute('src', 'Media/hiker.gif');
  cvs.appendChild(playerImage);
  //here we create a div that attaches to the bottom of the map (same width) and holds playerScore and distance from bigfoot
  var scoreboard = document.createElement('div');
  scoreboard.setAttribute('id', 'scoreboard-ID');
  cvsAttach.appendChild(scoreboard);
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
  //this hides the footer row
  var showFooter = document.getElementById('footerRow');
  showFooter.setAttribute('style', 'display: none');
};

//////////////////////////////////////////////////////////////////////////////
//UPDATE SCOREBOARD///////////////////////////////////////////////////////////
//updates the scoreboard after a result card
var updateScoreboard = function () {
  //updates distance from bigfoot value
  var distUpdate = document.getElementById('distance-score');
  distUpdate.textContent = `DISTANCE FROM BIGFOOT: ${(playerLocation - bigfootLocation)} feet`;
  //updates player score
  var scoreUpdate = document.getElementById('player-scoreboard');
  scoreUpdate.textContent = `SCORE: ${playerScore}`;
};

//////////////////////////////////////////////////////////////////////////////
//CREATE CARD DIV/////////////////////////////////////////////////////////////
//(this creates a card div, creates p tags, assigns p tags IDs(for event listener to tell which number user clicks) AND fills those p tags with the information from a card object)
var renderCardDiv = function () {
  var cardAttach = document.getElementById('mapCanvas');
  var temp = uniqueCardsArray.shift();
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'card-popup');
  cardAttach.appendChild(cardDiv);
  //   created prompt paragraph on card
  var cardPromptParagraph = document.createElement('p');
  cardDiv.appendChild(cardPromptParagraph);
  cardPromptParagraph.textContent = temp.prompt;

  var questionDiv = document.createElement('div');
  questionDiv.setAttribute('id', 'question-div');
  cardDiv.appendChild(questionDiv);

  for (var i = 0; i < 4; i++) {
    var newPTag = document.createElement('p');
    newPTag.setAttribute('class', 'ptag-options');
    questionDiv.appendChild(newPTag);
    newPTag.textContent = temp.options.options[i];
  }
};
//////////////////////////////////////////////////////////////////////////////
//CREATE FIRST CARD DIV///////////////////////////////////////////////////////
//(almost same as above)(has a unique ID and unique event listener so that a click will just remove 1st card and WONT try to store a value from the card)(always calls the first card object)
var renderFirstCardDiv = function () {
  var cardAttach = document.getElementById('mapCanvas');
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'firstCard');
  cardAttach.appendChild(cardDiv);
  //   created prompt paragraph on card
  var firstCardPromptParagraph = document.createElement('p');
  cardDiv.appendChild(firstCardPromptParagraph);
  firstCardPromptParagraph.textContent = firstCard;
};
//////////////////////////////////////////////////////////////////////////////
//CREATE WIN CARD DIV///////////////////////////////////////////////////////
//(almost same as above)(has a unique ID and unique event listener so that a click will just remove 1st card and WONT try to store a value from the card)(always calls the first card object)
var renderWinCardDiv = function () {
  var cardAttach = document.getElementById('mapCanvas');
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'firstCard');
  cardAttach.appendChild(cardDiv);
  //   created prompt paragraph on card
  var firstCardPromptParagraph = document.createElement('p');
  cardDiv.appendChild(firstCardPromptParagraph);
  firstCardPromptParagraph.textContent = winCard;
};//////////////////////////////////////////////////////////////////////////////
//CREATE LOSS CARD DIV///////////////////////////////////////////////////////
//(almost same as above)(has a unique ID and unique event listener so that a click will just remove 1st card and WONT try to store a value from the card)(always calls the first card object)
var renderLossCardDiv = function () {
  var cardAttach = document.getElementById('mapCanvas');
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'firstCard');
  cardAttach.appendChild(cardDiv);
  //   created prompt paragraph on card
  var firstCardPromptParagraph = document.createElement('p');
  cardDiv.appendChild(firstCardPromptParagraph);
  firstCardPromptParagraph.textContent = loseCard;
};
//////////////////////////////////////////////////////////////////////////////
//CREATE RESULT CARD DIV/////////////////////////////////////////////////////
//(this creates the result card)(appends score from chosen answer)(appends corresponding resultStatement (global))
//(needs the score from event listener)
var renderResultCardDiv = function () {
  var removePopupDiv = document.getElementById('card-popup');
  removePopupDiv.remove();
  var cardAttach = document.getElementById('mapCanvas');
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'card-popup');
  cardAttach.appendChild(cardDiv);
  var randomResult = makeRandom(0, 3);
  var randomResultValue = resultValues[randomResult];
  //creates p tag and displays returnStatement from array
  var cardResultParagraph = document.createElement('p');
  cardDiv.appendChild(cardResultParagraph);
  cardResultParagraph.textContent = returnStatements[randomResult];
  //creates p tag that holds the +score value.
  var resultingScoreParagraph = document.createElement('p');
  resultingScoreParagraph.setAttribute('id', 'resultingscore');
  cardDiv.appendChild(resultingScoreParagraph);
  resultingScoreParagraph.textContent = `+ ${randomResultValue} points.`;
  var clicktoContinue = document.createElement('p');
  cardDiv.appendChild(clicktoContinue);
  clicktoContinue.textContent = 'CLICK TO CONTINUE';
  playerScore += randomResultValue;
  playerLocation += randomResultValue;
  bigfootLocation += 1000;
  if(randomResultValue === 1600 || randomResultValue === 1150){
    setTimeout(goodChoiceSound, 500);
  } else {
    badChoiceSound();
  }
};

//////////////////////////////////////////////////////////////////////////////
//MOVING OUR FIGURES//////////////////////////////////////////////////////////
//this uses translate(x-axis, y-axis) to move our characters south east across the screen
var grabbingBigfoot = document.getElementById('bigfoot');
function moveBigfoot(bigfootLocation){
  var grabbingBigfoot = document.getElementById('bigfoot');
  // grabbingBigfoot.setAttribute('style', `transform: translate(${(bigfootLocation/155)}vw, ${(bigfootLocation*0.004)}vw);`);
  if(bigfootLocation > playerLocation){
    bigfootLocation = playerLocation;
    grabbingBigfoot.setAttribute('style', `transform: translate(${(bigfootLocation/140)}vw, ${(bigfootLocation/250)}vw);`);
  }else if(playerScore === 400){
    grabbingBigfoot.setAttribute('style', `transform: translate(${(bigfootLocation/200)}vw, ${(bigfootLocation*0.004)}vw);`);
  } else {
    grabbingBigfoot.setAttribute('style', `transform: translate(${(bigfootLocation/155)}vw, ${(bigfootLocation*0.004)}vw);`);
  }
}
var grabbingPlayer = document.getElementById('hiker');
function movePlayer(playerScore){
  var grabbingPlayer = document.getElementById('hiker');
  if(playerLocation > 5750){
    grabbingPlayer.setAttribute('style', 'transform: translate(37.037vw, 20vw);');
    // grabbingPlayer.setAttribute('style', `${movePlayer(5000)}`);
  } else {
    grabbingPlayer.setAttribute('style', `transform: translate(${(playerScore/135)}vw, ${(playerScore/250)}vw);`);
  }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//STORING USER NAME AND SCORE IN LOCAL STORAGE////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//this function grabs local storage, parses the array, reconstructs the players, stores the reconstructed players in winners, sorts the winners by score low to high, if more than 10 high scores it removes the lowest
function grabLocalStorage() {
  if(localStorage.leaderboard === undefined){
    return;
  } else{
    var grabData = localStorage.getItem('leaderboard');
    var dataParsed = JSON.parse(grabData);
    for (var i = 0; i < dataParsed.length; i++) {
      var newPlaya = new Player(dataParsed[i].name, dataParsed[i].score);
      winners.push(newPlaya);
    }
  }


  //function that 1. sorts an array 2. loops through the array and returns the lowest then next lowest, etc 3. checks that for every a, there is no b that is smaller (that is how it decides) 4. while loop - after all the scores are sorted smallest to largest, if the array is longer than 10, the 1st in the array (smallest) is shifted off
  winners.sort((a,b) => {
    if(a.score > b.score){
      return 1;
    } else {
      return -1;
    }
  });
  while (winners.length > 10) {
    winners.shift();
  }
}

//////////////////////////////////////////////////////////////////////////////
//RENDER WINNER FUNCTION/////////////////////////////////////////////////////
//(winner function removes/hides game canvas, and in its place, displays the winning newspaper image, play again button, and reveals the footer row again)
var renderWinner = function () {
  //create player object
  var winningPlayer = new Player(userName[0], playerScore);
  winners.push(winningPlayer);
  //retrieve the local storage so that we can ADD our winner to the array. Not replace the array.
  grabLocalStorage();
  // stringify and store in local storage
  var storePlayers = JSON.stringify(winners);
  localStorage.setItem('leaderboard', storePlayers);
  //removes the game canvas so that we can display the player's victory
  var scoreBar = document.getElementById('scoreboard-ID');
  scoreBar.remove();
  var gameCanvas = document.getElementById('mapCanvas');
  gameCanvas.remove();
  //creates an image element that will hold the newspaper appends to main-screen
  var winningNewspaper = document.createElement('img');
  winningNewspaper.setAttribute('id', 'newspaperImage');
  winningNewspaper.setAttribute('src', 'Media/newspaper2.png');
  var mapAttach = document.getElementById('main-screen');
  mapAttach.appendChild(winningNewspaper);
  //creates and appends a play button to the image
  var playAgainButton = document.createElement('button');
  playAgainButton.setAttribute('id', 'playAgain-id');
  mapAttach.appendChild(playAgainButton);
  var playAgainLink = document.createElement('a');
  playAgainLink.setAttribute('href', 'index.html');
  playAgainButton.appendChild(playAgainLink);
  var playAgainButtonImg = document.createElement('img');
  playAgainButtonImg.setAttribute('id', 'playnowButton');
  playAgainButtonImg.setAttribute('src', 'Media/playnowButtion.png');
  playAgainLink.appendChild(playAgainButtonImg);
  // playAgainButton.textContent = 'PLAY AGAIN';
  //reveals the footer row again
  var showFooter = document.getElementById('footerRow');
  showFooter.setAttribute('style', 'display: block');
};

//////////////////////////////////////////////////////////////////////////////
//RENDER LOSER FUNCTION/////////////////////////////////////////////////////
//(loser function removes/hides canvas, and in its place, displays the losing tombstone image, play again button and reveals the footer row again)
var renderLoser = function () {
  //create player object
  var winningPlayer = new Player(userName[0], playerScore);
  winners.push(winningPlayer);
  //retrieve the local storage so that we can ADD our winner to the array. Not replace the array.
  grabLocalStorage();
  // stringify and store in local storage
  var storePlayers = JSON.stringify(winners);
  localStorage.setItem('leaderboard', storePlayers);
  //removes the game canvas so that we can display the player's loss
  var scoreBar = document.getElementById('scoreboard-ID');
  scoreBar.remove();
  var gameCanvas = document.getElementById('mapCanvas');
  gameCanvas.remove();
  //creates an image element that will hold the game-over tombstone, appends to main-screen
  var gameOverTombstone = document.createElement('img');
  gameOverTombstone.setAttribute('id', 'tombstone-id');
  gameOverTombstone.setAttribute('src', 'Media/tombstone.png');
  gameOverTombstone.setAttribute('id', 'Game-Over');
  var mapAttach = document.getElementById('main-screen');
  mapAttach.appendChild(gameOverTombstone);
  //creates and appends a play button to the image
  var playAgainButton = document.createElement('button');
  playAgainButton.setAttribute('id', 'playAgain-id');
  mapAttach.appendChild(playAgainButton);
  var playAgainLink = document.createElement('a');
  playAgainLink.setAttribute('href', 'index.html');
  playAgainButton.appendChild(playAgainLink);
  var playAgainButtonImg = document.createElement('img');
  playAgainButtonImg.setAttribute('id', 'playnowButton');
  playAgainButtonImg.setAttribute('src', 'Media/playnowButtion.png');
  playAgainLink.appendChild(playAgainButtonImg);
  // playAgainButton.textContent = 'PLAY AGAIN';
  //reveals the footer row again
  var showFooter = document.getElementById('footerRow');
  showFooter.setAttribute('style', 'display: block');
};

//////////////////////////////////////////////////////////////////////////////
//RANDOMIZE ALL CARDS/////////////////////////////////////////////////////////
//(say you have 5 cards)(this picks a random number between 0 and 4)(the temp result is used, as the index of allCardsArray, to push that card into uniqueCardsArray)
//(then the randomly picked number is stored)(the function runs again, a random number between 0 and 4, as long as the number is not the same as one before it picks that index.)
//(it loops on untill all 5 cards are moved into unique array in a random order)
var uniqueNumberArray = [];
var randomizeAllCards = function(){
  var uniqueRandomNumber = makeRandom(0,9);
  while(uniqueNumberArray.length < 10){
    if(!uniqueNumberArray.includes(uniqueRandomNumber)){
      uniqueNumberArray.push(uniqueRandomNumber);
    } else {
      uniqueRandomNumber = makeRandom(0,9);
    }
  }
};
function fillUniqueCardsArray() {
  for (var i = 0; i < uniqueNumberArray.length; i++) {
    uniqueCardsArray.push(allCardsArray[uniqueNumberArray[i]]);
  }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////~~~EVENT LISTENERS~~~///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//FUNCTIONS TO CREATE THE EVENT LISTENERS/////////////////////////////////////
//we need these to "add" the event listener AFTER the element with the corresponding ID is created

//#1
function makeOnSubmitWork() {
  var onSubmit = document.getElementById('user-form');
  if(onSubmit != undefined){
    onSubmit.addEventListener('submit', handleSubmit);
  }
}
//#2
function makeClickFirstCardWork() {
  var afterFirstCard = document.getElementById('firstCard');
  afterFirstCard.addEventListener('click', handleFirstClick);
}

//#3
// function makeMapClickWork(){
//   var theMap = document.getElementById('mapCanvas');
//   theMap.addEventListener('click', handleMapClick);
// }
//#4
function makeCardClickWork() {
  var theCard = document.getElementById('question-div');
  theCard.addEventListener('click', handleCardClick);
}
//#5
function makeResultClickWork() {
  var theResult = document.getElementById('card-popup');
  theResult.addEventListener('click', handleResultClick);
}
//#1 SUBMIT BUTTON////////////////////////////////////////////////////////////
//(when user presses start button, checks "if" a valid name is entered, removes starting fieldset/form, calls render map, delays (if possible), calls create FIRST card div function)

function handleSubmit() {
  event.preventDefault();
  //checks if the user entered something for their player's name. stores name in userName.
  if (event.target.playerName.value === '') {
    alert('Invalid Entry. Please enter your player name.');
    return;
  } else {
    var makeNameCaps = event.target.playerName.value;
    var res = makeNameCaps.toUpperCase();
    userName.push(res);
    //removes fieldset
    var fieldsetRemove = document.getElementById('user-form');
    fieldsetRemove.remove();
    //creates map
    renderMap();
    setTimeout(renderFirstCardDiv, 2000);
    setTimeout(makeClickFirstCardWork, 4200);
  }
}
var music = document.getElementById('background-music');
var carStart = document.getElementById('car-start');
function stopBackgroundMusic(){
  // for(var i = 10; i === 0; i--){
    
  for (let i=10; i>0; i--) {
    setTimeout( function timer(){
      music.volume = (0);
    }, i*3000 );
    // music.remove();
  }
}
function startTheCar(){
  var carStart = document.createElement('audio');
  carStart.setAttribute('autoplay', '');
  carStart.setAttribute('src', 'Media/carstart.mp3');
  carStart.setAttribute('id', 'car-start');
}
function eatenByBigfoot(){
  var playerLose = document.createElement('audio');
  playerLose.setAttribute('autoplay', '');
  playerLose.setAttribute('src', 'Media/monster.mp3');
}
function badChoiceSound(){
  var badChoice = document.createElement('audio');
  badChoice.setAttribute('autoplay', '');
  badChoice.setAttribute('src', 'Media/sadtrombone.mp3');
}
function goodChoiceSound(){
  var goodChoice = document.createElement('audio');
  goodChoice.setAttribute('autoplay', '');
  goodChoice.setAttribute('src', 'Media/tada.mp3');
}

//#2 CLICK FIRST CARD (AND WIN/LOSS CARD), SHOWS MAP AGAIN////////////////////////////////////////
//(when user clicks the first card, it removes first card, shows map)
function handleFirstClick() {
  // afterFirstClick();
  if(playerScore>750 && playerLocation>bigfootLocation){
    handleWinLossClick();
    var grabbingPlayer = document.getElementById('hiker');
    var grabCar = document.getElementById('purple-car');
    startTheCar();
    setTimeout(grabbingPlayer.remove(), 1000);
    setTimeout(grabCar.setAttribute('style', 'transform: translate(3vw,0)'), 2000);
    setTimeout(renderWinner, 4000);
    setTimeout(gameMusic.volume = 0, 4000);
    setTimeout(goodChoiceSound, 4200);
  } else if(bigfootLocation>=playerLocation) {
    handleWinLossClick();
    eatenByBigfoot();
    setTimeout(renderLoser, 4000);
    setTimeout(gameMusic.volume = 0, 4500);
    setTimeout(badChoiceSound, 4200);
  } else {
    afterFirstClick();
  }
}
function afterFirstClick(){
  event.preventDefault();
  var afterFirstCard = document.getElementById('firstCard');
  afterFirstCard.remove();
  stopBackgroundMusic();
  setTimeout(gameMusic.volume = 0.25, 1000);
  setTimeout(renderCardDiv, 2000);
  setTimeout(makeCardClickWork, 2500);
}

function handleWinLossClick() {
  event.preventDefault();
  var afterFirstCard = document.getElementById('firstCard');
  afterFirstCard.remove();
}
var theMap = document.getElementById('mapCanvas');
//#3 CLICK MAP, SHOWS CARDS///////////////////////////////////////////////////
//(when user clicks map it calls create card div function, shows card in middle of map)
// function handleMapClick(){
//   var theMap = document.getElementById('mapCanvas');
//   theMap.removeEventListener('click', handleMapClick);
//   setTimeout(renderCardDiv, 500);
//   setTimeout(makeCardClickWork, 1500);
// }
//#4 CLICK CARD ANSWER, RENDERS RESULT CARD///////////////////////////////////
//(when user clicks an answer on the card div it stores value, removes card div, calls createResultCardDiv function)
function handleCardClick() {
  setTimeout(renderResultCardDiv, 500);
  var theCard = document.getElementById('question-div');
  theCard.removeEventListener('click', handleCardClick);
  setTimeout(makeResultClickWork, 1000);
}
//#5 REMOVE RESULT CARD && SHOW MAP AGAIN/////////////////////////////////////
//(when the user clicks on the result card div, it removes the result div)(map is visible again)(moves the characters based on the value chosen)(after move THEN it runs if statement)(if win/lose those functions run)(else: game continues on - back to event listener #3)
function handleResultClick() {
  setTimeout(function () { var removePopupDiv = document.getElementById('card-popup'); removePopupDiv.remove(); }, 500);
  var theResult = document.getElementById('card-popup');
  theResult.removeEventListener('click', handleResultClick);
  //map event listener is working again(after some time to let figures move and check if conditions)
  // setTimeout(makeMapClickWork, 6000);
  //delay and check if win or loss
  moveBigfoot(bigfootLocation);
  movePlayer(playerScore);
  setTimeout(updateScoreboard, 500);
  setTimeout(winCondition, 5000);
  setTimeout(lossCondition, 5100);

  if(playerLocation < 5750 && bigfootLocation <= playerLocation){
    setTimeout(renderCardDiv, 4000);
    setTimeout(makeCardClickWork, 6500);
  }
}

//////////////////////////////////////////////////////////////////////////////
//WIN CONDITION IF STATEMENT//////////////////////////////////////////////////
//(this sets "if user location = finishline location" then "run winner function")

function winCondition(){
  if(playerLocation >= 5750){
    renderWinCardDiv();
    makeClickFirstCardWork();
  }
}
//////////////////////////////////////////////////////////////////////////////
//LOSS CONDITION IF STATEMENT/////////////////////////////////////////////////
//(this sets "if bigfoot location >= user location" then "run loser function")

function lossCondition(){
  if(bigfootLocation >= playerLocation){
    renderLossCardDiv();
    makeClickFirstCardWork();
  }
}
const gameMusic = document.getElementById('game-music');
gameMusic.volume = 0;

randomizeAllCards();
setTimeout(fillUniqueCardsArray, 1000);
//for some reason this is needed to make the submit event listener
setTimeout(makeOnSubmitWork, 2000);
