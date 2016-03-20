/**
 * Input:
 * total number of people playing this game
 */
var peopleNum = 4;
/**
 * Input:
 * number of cards the people are playing,
 * range from [1..cardNum]
 */
var cardNum = 6;
/**
 * Input:
 * card numbers that each people hold
 */
var cardDist = [1, 4, 5, 2];

var cardList = [], peopleList = [];
var playHistory = [];

/**
 * check if player 'now' can decide MIN/MAX/MID on board with possibles array
 */
function check(now, possibles, board) {
	var minFlag = 0;
	var maxFlag = 0;
	var midFlag = 0;
	var others = [];
	
	for (var i = 0; i < peopleNum; i ++) {
		if (now === i) continue;
		others.push(board[i]);
	}
	others.sort();
	
	for (var item in possibles) {
		if (possibles[item] === 0) continue;
		if (possibles[item] < others[0]) minFlag = 1;
		if (possibles[item] > others[others.length - 1]) maxFlag = 1;
		if ((possibles[item] < others[others.length - 1]) &&
			possibles[item] > others[0]) midFlag = 1;
	}
	if (minFlag + maxFlag + midFlag === 1) {
		if (minFlag === 1) return 'MIN';
		if (maxFlag === 1) return 'MAX';
		if (midFlag === 1) return 'MID';
	} else {
		return '?';
	}
}

/**
 * figure out possible cards on board for player 'now'
 */
function getPossibles(board, now) {
	var possibles = clone(cardList);
	for (var i = 0; i < peopleNum; i ++) {
		if (i === now) continue;
		possibles[board[i] - 1] = 0;
	}
	return possibles;
}

/**
 * clone an array
 */
function clone(arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i ++) {
		newArr.push(arr[i]);
	}
	return newArr;
}

// initialize
// peopleList = [A, B, C, ...]
for (var i = 0; i < peopleNum; i ++) {
	peopleList[i] = String.fromCharCode(65 + i);
}
// cardList = [1, 2, 3, ...]
for (var i = 0; i < cardNum; i ++) {
	cardList[i] = i + 1;
}

var now = 0;
do {
	// try with what player 'now' see
	var myPossibles = getPossibles(cardDist, now);
	var tryResult = check(now, myPossibles, cardDist);
	
	// if cannot decide, consider from play history
	if (tryResult === '?') {
		// think about play history
		for (var i = 0; i < playHistory.length; i ++) {
			var possibles = clone(myPossibles);
			var board = clone(cardDist);
			for (var j = 0; j < possibles.length; j ++) {
				if (possibles[j] === 0) continue;
				// assume my card is possible[j]
				board[now] = possibles[j];
				// when my card is possible[j], what result will he show
				if (check(playHistory[i].player, getPossibles(board, playHistory[i].player), board) !== '?') {
					// if his result is not ?, then my card cannot be possible[j]
					possibles[j] = 0;
				}
			}
			// after considering from play history, check if I can decide
			tryResult = check(now, possibles, cardDist);
			if (tryResult !== '?') break;
		}
	}
	playHistory.push({
		player: now,
		result: tryResult
	});
	
	now ++;
	if (now >= peopleNum) now = 0;
} while (playHistory[playHistory.length - 1].result === '?');

// output
document.write('[');
var ans = [];
for (var i = 0; i < playHistory.length; i ++) {
	ans[i] = peopleList[playHistory[i].player] + ' =>' + playHistory[i].result;
}
var ansStr = ans.join(', ');
document.write(ansStr);
document.write(']');