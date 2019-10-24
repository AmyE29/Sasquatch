/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////~~~VARIABLES FOR THE OBJECT CONSTRUCTOR~~~//////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//(here is where all the words will be typed out for every card prompt statement, and every card's options)
//example:
var berriesCardPrompt = 'You come across some berries.  Do you...';

var berriesOption1 = '1. Eat them? They might give you more energy';
var berriesOption2 =  '2. Throw them at Big Foot to slow him down?';
var berriesOption3 =  '3. Avoid them, they might be poisonous?';
var berriesOption4 = '4. Collect them to make a pie later?';

var snakesCardPrompt = 'Oh no! Snakes on the trail.  Do you...';
var snakesOption1 = '1. Run screaming in the other direction?';
var snakesOption2 = '2. Go all Samuel L Jackson, and \'Get the #$@&%*! Snakes, off the #$@&%*! Trail!!\'" ?';
var snakesOption3 = '3. Eat them? They might give you more energy';
var snakesOption4 = '4. Train them to attack Big Foot?';

var treeCardPrompt = 'You are blocked by a fallen tree.  Do you...';
var treeOption1 = '1. Leap over it?';
var treeOption2 = '2. Try to hide behind it?';
var treeOption3 = '3. Go around it?';
var treeOption4 = '4. Dig under it?';

var streamCardPrompt = 'Ack! There\'s a stream.  Do you...';
var streamOption1 = '1. Swim across it?';
var streamOption2 = '2. Stop for a quick drink?';
var streamOption3 = '3. Catapult over it?';
var streamOption4 = '4. Try to hide under water and hope Big Foot doesn\'t see you?';

var tripCardPrompt = 'Ooops! You trip over some roots, and hurt your ankle.  Do you...';
var tripOption1 = '1. Pick yourself up and keep running?';
var tripOption2 = '2. Rest a bit, and massage it?';
var tripOption3 = '3. Rub some dirt on it?';
var tripOption4 = '4. Lay down and cry?';

var safetyCardPrompt = 'Your runnning down the trail and you see a couple. Do You?';
var safetyOption1 = '1. Yell help, then trip them, hoping the beast stops for them!';
var safetyOption2 = '2. Tell them to stop and turn around!';
var safetyOption3 = '3. Play a game of chance roll the dice';
var safetyOption4 = '4. Steal there bag as you run down the hill they won\'t be needing it.';

var gameCardPrompt = 'You see a chainsaw stuck in a tree. Whats your next move?';
var gameOptions1 = '1. I\'m getting the chainsaw';
var gameOptions2 = '2. I choose to keep running, I\'m not gonna die today';
var gameOptions3 = '3. Ignore the chainsaw, it\'s just an illusion.';
var gameOptions4 = '4. Scream!!!!!';

var patriotCardPrompt = 'You see a basket full of food. Do you?';
var patriotOptions1 = '1. I\'m going to take a chance I\'m starving!';
var patriotOptions2 = '2. Just keep running, you\'re about to die!';
var patriotOptions3 = '3. Grab the basket and throw it behind you.';
var patriotOptions4 = '4. life all about chances, lets play a game!';



// make 5 object functions using above options
var berriesChoices = new OptionsConst(berriesOption1, berriesOption2, berriesOption3, berriesOption4);
var snakesChoices = new OptionsConst(snakesOption1, snakesOption2, snakesOption3, snakesOption4);
var treeChoices = new OptionsConst(treeOption1, treeOption2, treeOption3, treeOption4);
var streamChoices = new OptionsConst(streamOption1, streamOption2, streamOption3, streamOption4);
var tripChoices = new OptionsConst(tripOption1, tripOption2, tripOption3, tripOption4);
var safetyChoices = new OptionsConst(safetyOption1, safetyOption2, safetyOption3, safetyOption4);
var gameChoices = new OptionsConst(gameOptions1, gameOptions2, gameOptions3, gameOptions4);
var patriotChoices = new OptionsConst(patriotOptions1, patriotOptions2, patriotOptions3, patriotOptions4);







// make cards && store them in allCardsArray
var berries = new Card('berries', berriesCardPrompt, berriesChoices);
var snakes = new Card('snakes', snakesCardPrompt, snakesChoices);
var tree = new Card('tree', treeCardPrompt, treeChoices);
var stream = new Card('stream', streamCardPrompt, streamChoices);
var trip = new Card('trip', tripCardPrompt, tripChoices);
var safety = new Card('safety', safetyCardPrompt, safetyChoices);
var game = new Card('game', gameCardPrompt, gameChoices);
var patriot = new Card('patriot', patriotCardPrompt, patriotChoices);



var firstCard = 'You\'ve just spent a beautiful afternoon hiking on Mt. Rainier, when all of a sudden you encounter Big Foot!  You need to make it back down the mountain and to your car before Big Foot reaches you.  Make the right choices and you will stay ahead of him,the wrong choices will put you in peril. CLICK TO CONTINUE...';
