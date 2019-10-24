//take local storage out so that they can be rendered on the screen
grabLocalStorage();


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//RENDER LEADERBOARD//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function fillLeaderboard(){
  var findLeaderboard = document.getElementById('topscores');
  for(var i = 1; i < (winners.length+1); i++){
    var winnerLength = winners.length;
    var addLeaderDiv = document.createElement('div');
    addLeaderDiv.setAttribute('class', 'leader-class');
    findLeaderboard.appendChild(addLeaderDiv);
    var addLeaderScoreTag = document.createElement('p');
    addLeaderScoreTag.setAttribute('class', 'leaderPTag-score');
    addLeaderDiv.appendChild(addLeaderScoreTag);
    addLeaderScoreTag.textContent = `${winners[winnerLength-i].score}`;
    var addLeaderNameTag = document.createElement('p');
    addLeaderNameTag.setAttribute('class', 'leaderPTag-name');
    addLeaderDiv.appendChild(addLeaderNameTag);
    addLeaderNameTag.textContent = `${winners[winnerLength-i].name}`;
  }
}

fillLeaderboard();
