
var Soundfont = require('soundfont-player');
var MidiWriter = require('midi-writer-js');
var vexWriter = new MidiWriter.VexFlow();

// configure interactivity for sliders
var numNotesSlider = document.getElementById('numNotes');
var numNotesOutput = document.getElementById('numNotesOutput');
var numStableBeatsSlider = document.getElementById('numStableBeats');
var numStableBeatsOutput = document.getElementById('numStableBeatsOutput');
var numMelodicTurnsSlider = document.getElementById('numMelodicTurns');
var numMelodicTurnsOutput = document.getElementById('numMelodicTurnsOutput');
var tempoSlider = document.getElementById('tempo');
var tempoOutput = document.getElementById('tempoOutput');
numNotesSlider.oninput = function() {
	numNotesOutput.innerHTML = this.value;
}
numStableBeatsSlider.oninput = function() {
	numStableBeatsOutput.innerHTML = this.value;
}
numMelodicTurnsSlider.oninput = function() {
	numMelodicTurnsOutput.innerHTML = this.value;
}
tempoSlider.oninput = function() {
	tempoOutput.innerHTML = this.value;
}

// configure interactivity for buttons
var playCompositeButton = document.getElementById('play-composite-button');
var pauseCompositeButton = document.getElementById('pause-composite-button');
var generatePatternButton = document.getElementById('generate-pattern-button');
var playButton = document.getElementById('play-button');
var pauseButton = document.getElementById('pause-button');
playCompositeButton.addEventListener('click', function() {
	Player.pause();
	// create MIDI tracks from voices
	var track1 = vexWriter.trackFromVoice(voice1);
	var track2 = vexWriter.trackFromVoice(voice2);
	var writer = new MidiWriter.Writer([track1, track2]);
	// write MIDI track as dataUri
	var dataUri = writer.dataUri();
	// load MIDI track into Player
	Player.loadDataUri(dataUri);
	play();
});
pauseCompositeButton.addEventListener('click', function() {
	Player.pause();
});
generatePatternButton.addEventListener('click', function() {
	Player.pause();
	nextPattern();
});
playButton.addEventListener('click', function() {
	Player.pause();
	Player.loadDataUri(dataUri);
	play();
});
pauseButton.addEventListener('click', function() {
	Player.pause();
});

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
var voice1 = drawParts('drummer1', drummer1);
var voice2 = drawParts('drummer2', drummer2);
var composite = createComposite(drummer1, drummer2);
var allPatterns = genAllPatterns(composite);
// this is set by nextPattern()
var dataUri;

// Initialize player and register event handler
var Player = new MidiPlayer.Player(function(event) {
	midiCallback(event);
});

// Loop track
Player.on('endOfFile', function() {
	Player.stop();
	Player.play();
});

// initialize AudioContext
var ac;
if ('webkitAudioContext' in window) {
	// safari
	ac = new webkitAudioContext();
}
else if ('AudioContext' in window) {
	// chrome
	ac = new AudioContext();
}
else {
	alert("Audio playback is unsupported by your browser. Please upgrade to the latest version of Chrome, Safari, Edge, or Firefox.");
}
// load samples
var instrument;
Soundfont.instrument(ac, '', {nameToUrl: getUrl}).then(function (bongos) {
	instrument = bongos;
})

function getUrl() {
	return 'https://oxumusic.com/project/bongos.mp3.js';
}

function play() {
	Player.setTempo(tempoSlider.value);
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
}

// plays each note
function midiCallback(event) {	
	if (event.name == 'Note on' && event.velocity != 0) {
		instrument.play(event.noteName);
	}
}

// converts integer note to VexFlow note
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

// converts pattern as an integer array to a string for VexFlow
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
	// generate random pattern using parameters
	var randomPattern = pickPattern(allPatterns, numNotes, numStableBeats, numMelodicTurns);
	// check if random pattern exists given parameters
	if (randomPattern != -1) {
		// allow audio playback
		playButton.disabled = false;
		// create VexFlow voice from pattern
		var newVoice = voice(notes(createLine(randomPattern)));
		// create MIDI track from voice
		var track = vexWriter.trackFromVoice(newVoice);
		// create Writer from track
		var writer = new MidiWriter.Writer([track]);
		// write MIDI track as dataUri
		dataUri = writer.dataUri();
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
	else {
		// do not allow audio playback
		playButton.disabled = true;
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
	var newVoice = voice(notes(createLine(pattern)));
 	system.addStave({
 		voices: [
			newVoice
		]
 	}).addClef('bass').addKeySignature('G#m');
	vf.draw();
	return newVoice;
}