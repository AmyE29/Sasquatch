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
var berriesOption1 = 'Eat them? They might give you more energy';
var berriesOption2 =  'Throw them at Big Foot to slow him down?';
var berriesOption3 =  'Avoid them, they might be poisonous?';
var berriesOption4 = 'Collect them to make a pie later?';

var snakesCardPrompt = 'Oh no! Snakes on the trail.  Do you...';
var snakesOption1 =  'Run screaming in the other direction?';
var snakesOption2 =  'Go all Samuel L Jackson, and \'Get the #$@&%*! Snakes, off the #$@&%*! Trail!!\'" ?';
var snakesOption3 =  'Eat them? They might give you more energy';
var snakesOption4 =  'Train them to attck Big Foot?';

var treeCardPrompt = 'You are blocked by a fallen tree.  Do you...';
var treeOption1 = 'Leap over it?';
var treeOption2 =  'Try to hide behind it?';
var treeOption3 =  'Go around it?';
var treeOption4 = 'Dig under it?';

var streamCardPrompt = 'Ack! There\'s a stream.  Do you...';
var streamOption1 = 'Swim across it?';
var streamOption2 =  'Stop for a quick drink?';
var streamOption3 =  'Catapult over it?';
var streamOption4 = 'Try to hide under water and hope Big Foot doesn\'t see you?';

var tripCardPrompt = 'Ooops! You trip over some roots, and hurt your ankle.  Do you...';
var tripOption1 = 'Pick yourself up and keep running?';
var tripOption2 =  'Rest and bit, and massage it?';
var tripOption3 =  'Rub some dirt on it?';
var tripOption4 = 'Lay down and cry?';

// make 5 object functions using above options
var berriesChoices = new OptionsConst( berriesOption1, berriesOption2, berriesOption3, berriesOption4);
var snakesChoices = new OptionsConst( snakesOption1, snakesOption2, snakesOption3, snakesOption4);
var treeChoices = new OptionsConst( treeOption1, treeOption2, treeOption3, treeOption4);
var streamChoices = new OptionsConst( streamOption1, streamOption2, streamOption3, streamOption4);
var tripChoices = new OptionsConst( tripOption1, tripOption2, tripOption3, tripOption4);

// make 5 cards && store them in allCardsArray
var berries = new Card ('berries', berriesCardPrompt, berriesChoices);
var snakes = new Card ('snakes', snakesCardPrompt, snakesChoices);
var tree = new Card ('tree', treeCardPrompt, treeChoices);
var stream = new Card ('stream', streamCardPrompt, streamChoices);
var trip = new Card ('trip', tripCardPrompt, tripChoices);


var firstCard = 'You\'ve just spent a beautiful afternoon hiking on Mt. Rainier, when all of a sudden you encounter Big Foot!  You need to make it back down the mountain and to your car before Big Foot reaches you.  Make the right choices and you will stay ahead of him,the wrong choices will put you in peril' ;
