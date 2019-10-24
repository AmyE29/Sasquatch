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
var snakesOption1 =  '1. Run screaming in the other direction?';
var snakesOption2 =  '2. Go all Samuel L Jackson, and \'Get the #$@&%*! Snakes, off the #$@&%*! Trail!!\'" ?';
var snakesOption3 =  '3. Eat them? They might give you more energy';
var snakesOption4 =  '4. Train them to attack Big Foot?';

var treeCardPrompt = 'You are blocked by a fallen tree.  Do you...';
var treeOption1 = '1. Leap over it?';
var treeOption2 =  '2. Try to hide behind it?';
var treeOption3 =  '3. Go around it?';
var treeOption4 = '4. Dig under it?';

var streamCardPrompt = 'Ack! There\'s a stream.  Do you...';
var streamOption1 = '1. Swim across it?';
var streamOption2 =  '2. Stop for a quick drink?';
var streamOption3 =  '3. Catapult over it?';
var streamOption4 = '4. Try to hide under water and hope Big Foot doesn\'t see you?';

var tripCardPrompt = 'Ooops! You trip over some roots, and hurt your ankle.  Do you...';
var tripOption1 = '1. Pick yourself up and keep running?';
var tripOption2 =  '2. Rest a bit, and massage it?';
var tripOption3 =  '3. Rub some dirt on it?';
var tripOption4 = '4. Lay down and cry?';

var squirrelCardPrompt = 'You see a amourous squirrel. Do you...';
var squirrelOption1 = '1. Scream?';
var squirrelOption2 =  '2. Throw rocks at it?';
var squirrelOption3 =  '3. Convince it to seduce Big Foot?';
var squirrelOption4 = '4. Ask it to Netflix and chill with you?';

var boulderCardPrompt = 'There\'s a boulder in your path. Do you...';
var boulderOption1 = '1. Climb over it?';
var boulderOption2 =  '2. Go around it?';
var boulderOption3 =  '3. Dig under it?';
var boulderOption4 = '4. Stand on top of it and hope Big Foot can\'t reach you?';


// make 5 object functions using above options
var berriesChoices = new OptionsConst( berriesOption1, berriesOption2, berriesOption3, berriesOption4);
var snakesChoices = new OptionsConst( snakesOption1, snakesOption2, snakesOption3, snakesOption4);
var treeChoices = new OptionsConst( treeOption1, treeOption2, treeOption3, treeOption4);
var streamChoices = new OptionsConst( streamOption1, streamOption2, streamOption3, streamOption4);
var tripChoices = new OptionsConst( tripOption1, tripOption2, tripOption3, tripOption4);
var squirrelChoices = new OptionsConst( squirrelOption1, squirrelOption2, squirrelOption3, squirrelOption4);
var boulderChoices = new OptionsConst( boulderOption1, boulderOption2, boulderOption3, boulderOption4);

// make 5 cards && store them in allCardsArray
var berries = new Card ('berries', berriesCardPrompt, berriesChoices);
var snakes = new Card ('snakes', snakesCardPrompt, snakesChoices);
var tree = new Card ('tree', treeCardPrompt, treeChoices);
var stream = new Card ('stream', streamCardPrompt, streamChoices);
var trip = new Card ('trip', tripCardPrompt, tripChoices);
var squirrel= new Card ('squirrel', squirrelCardPrompt, squirrelChoices);
var boulder= new Card ('boulder', boulderCardPrompt, boulderChoices);

var firstCard = 'You\'ve just spent a beautiful afternoon hiking on Mt. Rainier, when all of a sudden you encounter Big Foot!  You need to make it back down the mountain and to your car before Big Foot reaches you.  Make the right choices and you will stay ahead of him,the wrong choices will put you in peril. CLICK TO CONTINUE...' ;

var winCard = 'Congratulations You Won!  You out ran Big Foot.';
var loseCard = 'Too bad.  You made a great effort, but Big Foot caught up with you.';
