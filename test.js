
/*
 * rest -1
 * G# 0
 * A# 2
 * B 3
 * C# 5
 */

var drummer1 = [0, 3, 5, -1, 3, -1, 5, 3, 2, -1, 3, -1];
var drummer2 = [5, -1, 3, -1, 5, 3, 2, -1, 3, -1, 0, 3];

var composite = new Array(12);
var numPatterns = 1;

for (var i = 0; i < composite.length; i++) {
	if (drummer1[i] != -1 && drummer2[i] != -1) {
		composite[i] = [drummer1[i], drummer2[i], -1];
	}
	else if (drummer1[i] == -1 && drummer2[i] == -1) {
		composite[i] = [-1];
	}
	else {
		composite[i] = [drummer1[i], drummer2[i]];
	}
	numPatterns *= composite[i].length;
}

var indices = new Array(12);
for (var i = 0; i < indices.length; i++) {
	indices[i] = 0;
}

var allPatterns = [];
n = 12;
while (1) {
	var pattern = new Array(n);
	for (var i = 0; i < n; i++) {
		pattern[i] = composite[i][indices[i]];
	}
	allPatterns.push(pattern);
	var next = n - 1;
	while (next >= 0 && indices[next] + 1 >= composite[next].length) {
		next--;
	}
	if (next < 0) {
		break;
	}
	indices[next] += 1;
	for (var i = next + 1; i < n; i++) {
		indices[i] = 0;
	}
}
console.log(composite);
// console.log(allPatterns);
// for (var i = 0; i < 10; i++) {
// 	console.log(countNotes(allPatterns[i]));
// }

function countNotes(pattern) {
	var count = 0;
	for (var i = 0; i < pattern.length; i++) {
		if (pattern[i] != -1) {
			count++;
		}
	}
	return count;
}

function numStableBeats(pattern) {
	return (pattern[0] != -1) + (pattern[4] != -1) + (pattern[8] != -1);
}

function numMelodicTurns(pattern) {
	var i = 0;
	var melody = new Array();
	for (var i = 0; i < pattern.length; i++) {
		if (pattern[i] != -1) {
			melody.push(pattern[i]);
		}
	}
	var numTurns = 0;
	var ascending = 0;
	var descending = 0;
	var currentNote;
	var nextNote;
	for (var i = 0; i < melody.length; i++) {
		currentNote = melody[i];
		if (i == melody.length) {
			nextNote = melody[0];
		}
		else {
			nextNote = melody[i+1];
		}
		if (nextNote - currentNote > 0) {
			if (descending) {
				ascending = 1;
				descending = 0;
				numTurns++;
			}
			else {
				ascending = 1;
			}
			
		}
		else if (nextNote - currentNote < 0) {
			if (ascending) {
				descending = 1;
				ascending = 0;
				numTurns++;
			}
			else {
				descending = 1;
			}
		}
	}
	return numTurns;
}

function pickPattern(numNotes, rhythmicStability, melodicContour) {
	var patterns = new Array();
	for (pattern of allPatterns) {
		if (countNotes(pattern) == numNotes && numStableBeats(pattern) == rhythmicStability && numMelodicTurns(pattern) == melodicContour) {
			patterns.push(pattern);
		}
	}
	var randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
	// console.log(randomPattern);
	console.log(patterns);
}
pickPattern(4, 3, 2);