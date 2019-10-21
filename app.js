'use strict';

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////~~~GLOBAL VARIABLES~~~//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//USER NAME (stored in a variable to be stringified for localStorage)

//RESULT VALUES (gives the score number increase)
var resultValues = [32, 23, 15, 8];
//BIGFOOT'S LOCATION VALUE (this stores bigfoots location)

//PLAYER'S LOCATION VALUE (this stores player's location)

//RESULT RETURN STATEMENTS (gives the corresponding script statement for the score number increase)
//((MVP)These are generic global return statements for every card)
var returnStatements = [];
//ALL CARDS ARRAY (all card objects are stored in here)

//UNIQUE CARDS ARRAY (At the start, stores randomly selected cards from allCardsArray, in this array for use during game)

//MAP NUMBER OF CLICKS (way to control the movement of bigfoot - AFTER the player moves)

//FIRST CARD OBJECT (the first card to pop up will always get its information from this object)

//WIN OBJECT (if player wins, the final card will get its information from this object)

//LOSS OBJECT (if player loses, the final card will get its information from this object)



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////~~~OBJECT CONSTRUCTORS~~~////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//#1 CARD CONSTRUCTOR/////////////////////////////////////////////////////////
//(this takes in a few parameters: name, situation detail(1script), options(4 scripts) stored in an array, (stretchGoal)filePathOfImage)


//#2 CARD OPTIONS CONSTRUCTOR/////////////////////////////////////////////////
//(this takes in variables from cardOptions.js as scripts, stores them into a unique options array by card)(the resulting options array object from this constructor, is entered into the card constructor as the options parameter)


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

//RENDER MAP//////////////////////////////////////////////////////////////////
//(this creates the map, canvas, images, divs, etc. appends children)

//CREATE CARD DIV/////////////////////////////////////////////////////////////
//(this creates a card div, creates p tags, assigns p tags IDs(for event listener to tell which number user clicks) AND fills those p tags with the information from a card object)

//CREATE FIRST CARD DIV///////////////////////////////////////////////////////
//(almost same as above)(has a unique ID and unique event listener so that a click will just remove 1st card and WONT try to store a value from the card)(always calls the first card object)

//CREATE RESULT CARD DIV/////////////////////////////////////////////////////
//(this creates the result card)(appends score from chosen answer)(appends corresponding resultStatement (global))

//WIN CONDITION IF STATEMENT//////////////////////////////////////////////////
//(this sets "if user location = finishline location" then "run winner function")
//(winner function removes/hides game canvas, and in its place, displays the winning newspaper image, play again button, and reveals the footer row again)

//LOSS CONDITION IF STATEMENT/////////////////////////////////////////////////
//(this sets "if bigfoot location >= user location" then "run loser function")
//(loser function removes/hides canvas, and in its place, displays the losing tombstone image, play again button and reveals the footer row again)

//RANDOMIZE ALL CARDS/////////////////////////////////////////////////////////
//(say you have 5 cards)(this picks a random number between 0 and 4)(the temp result is used, as the index of allCardsArray, to push that card into uniqueCardsArray)
//(then the randomly picked number is stored)(the function runs again, a random number between 0 and 4, as long as the number is not the same as one before it picks that index.)
//(it loops on untill all 5 cards are moved into unique array in a random order)



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////~~~EVENT LISTENERS~~~///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//#1 SUBMIT BUTTON////////////////////////////////////////////////////////////
//(when user presses start button, checks "if" a valid name is entered, removes starting fieldset/form, calls render map, delays (if possible), calls create FIRST card div function)

//#2 CLICK FIRST CARD, SHOWS MAP AGAIN////////////////////////////////////////
//(when user clicks the first card, it removes first card, shows map)
//#3 CLICK MAP, SHOWS CARDS///////////////////////////////////////////////////
//(when user clicks map it calls create card div function, shows card in middle of map)

//#4 CLICK CARD ANSWER, RENDERS RESULT CARD///////////////////////////////////
//(when user clicks an answer on the card div it stores value, removes card div, calls createResultCardDiv function)

//#5 REMOVE RESULT CARD && SHOW MAP AGAIN/////////////////////////////////////
//(when the user clicks on the result card div, it removes the result div)(map is visible again)(moves the characters based on the value chosen)(after move THEN it runs if statement)(if win/lose those functions run)(else: game continues on - back to event listener #3)




