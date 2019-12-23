
var button = document.getElementById('random-pattern-button');
button.addEventListener('click', nextPattern);

// Create an SVG renderer and attach it to the DIV element named "stave-container".
var vf = new Vex.Flow.Factory({renderer: {
						     elementId: 'stave-container',
						 	 width: 600,
						 	 height: 100
						   }});
var score = vf.EasyScore().set({ clef: 'bass', time: '12/8' });
var context = vf.getContext();
var voice = score.voice.bind(score);
var notes = score.notes.bind(score);

var drummer1 = [0, 3, 5, -1, 3, -1, 5, 3, 2, -1, 3, -1];
var drummer2 = [5, -1, 3, -1, 5, 3, 2, -1, 3, -1, 0, 3];
drawParts('drummer1', drummer1);
drawParts('drummer2', drummer2);
var composite = createComposite(drummer1, drummer2);
var allPatterns = genAllPatterns(composite);
var dataUri;

var MidiWriter = require('midi-writer-js');
var vexWriter = new MidiWriter.VexFlow();

var playButton = document.getElementById('play-button');
var pauseButton = document.getElementById('pause-button');
playButton.addEventListener('click', function() {
	if (ac.state === 'suspended') {
		ac.resume().then(function() {
			Player.play();
		})
	}
	else {
		if (Player.isPlaying()) {
			Player.stop();
		}
		Player.play();
	}
});
pauseButton.addEventListener('click', function() {
	Player.pause();
});

// Initialize player and register event handler
var Player = new MidiPlayer.Player(function(event) {
	midiCallback(event);
});

var Soundfont = require('soundfont-player');

var ac;
if ('webkitAudioContext' in window) {
	ac = new webkitAudioContext();
}
else if ('AudioContext' in window) {
	ac = new AudioContext();
}
else {
	alert("Audio playback is unsupported by your browser. Please upgrade to the latest version of Chrome, Safari, Edge, or Firefox.");
}
var instrument;
Soundfont.instrument(ac, '', {nameToUrl: getUrl}).then(function (bongos) {
	instrument = bongos;
})

function getUrl() {
	return 'https://oxumusic.com/project/bongos.mp3.js';
}

function midiCallback(event) {	
	if (event.name == 'Note on') {
		instrument.play(event.noteName);
	}
	else if (event.name == 'Note off') {
		// instrument.stop();
	}
}

function getNote(num) {
	switch (num) {
		case -1:
			return 'e3/r';
		case 0:
			return 'g3/8';
		case 2:
			return 'a3/8';
		case 3:
			return 'b3/8';
		case 5:
			return 'c4/8';
	}
}

function createLine(pattern) {
	var line = new Array();
	for (note of pattern) {
		line.push(getNote(note));
	}
	return line.join();
}

function nextPattern() {
	// clear existing stave
	context.clearRect(0, 0, 600, 100);
	// get parameters from user
	var numNotes = document.getElementById("numNotes").value;
	var numStableBeats = document.getElementById("numStableBeats").value;
	var numMelodicTurns = document.getElementById("numMelodicTurns").value;
	var tempo = document.getElementById("tempo").value;
	// generate random pattern using parameters
	var randomPattern = pickPattern(allPatterns, numNotes, numStableBeats, numMelodicTurns);
	// check if random pattern exists given parameters
	if (randomPattern != -1) {
		// create VexFlow voice from pattern
		var newVoice = voice(notes(createLine(randomPattern)));
		// create MIDI track from voice
		var track = vexWriter.trackFromVoice(newVoice);
		// set tempo for MIDI track
		track.setTempo(tempo);
		// create Writer from track
		var writer = new MidiWriter.Writer([track]);
		// write MIDI track as dataUri
		var dataUri = writer.dataUri();
		// load MIDI track into Player
		Player.loadDataUri(dataUri);
		// draw VexFlow voice
		var system = vf.System();
	 	system.addStave({
	 		voices: [
				newVoice
			]
	 	}).addClef('bass').addKeySignature('G#m');
		vf.draw();
	}
}

// given a div elementId and a pattern, will draw a stave with pattern
function drawParts(elementId, pattern) {
	var vf = new Vex.Flow.Factory({renderer: {
						     elementId: elementId,
						 	 width: 600,
						 	 height: 100
						   }});
	var score = vf.EasyScore().set({ clef: 'bass', time: '12/8' });
	var system = vf.System();
	var context = vf.getContext();
	var voice = score.voice.bind(score);
	var notes = score.notes.bind(score);
 	system.addStave({
 		voices: [
			voice(
				notes(createLine(pattern))
			)
		]
 	}).addClef('bass').addKeySignature('G#m');

	vf.draw();
}