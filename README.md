# Drumming

This project uses an algorithmic approach to explore the concept of resultant patterns, as used by Steve Reich in his composition, *Drumming* (1971). *Drumming* is a large-scale work written for bongos, marimbas, glockenspiels, female voices, and piccolo. In *Drumming*, Reich explores different rhythmic processes, including phasing, build-up and reduction, and resultant patterns. The hour-long piece is built around a single repeated rhythm in 12/8. While composing *Drumming*, Reich noticed that he could hear women's voices when playing the rhythm on marimba.

> "The women’s voices sing patterns resulting from the combination of two or more marimbas playing the identical repeating pattern one of more quarter notes out of phase with each other. By exactly imitating the sound of the instruments, and by gradually fading the patterns in and out, the singers cause them to slowly rise to the surface of the music and then fade back into it, allowing the listener to hear these patterns, along with many others, actually sounding in the instruments." - Steve Reich

In the first part, two players build up the basic rhythmic pattern on four pairs of tuned bongo drums, and then phase a quarter note apar from each other. At this point, two more players go back and forth playing different resultant patterns that they hear as a result of the combination of the phased patterns.

## An Algorithmic Approach

When I learned and performed *Drumming* with the Eastman Percussion Ensemble, my friend Victor and I were the ones playing the resultant patterns at the beginning of the piece. With pen and paper, we were able to figure out some interesting patterns that we could use in performance. This was the inspiration for this project, in which I used an algorithm to generate all possible resultant patterns given a composite texture created from two or more phased patterns. From these patterns, which include **11,664** possibilities given two phased patterns, groups of patterns are selected based on parameters that the user can enter.

## Resources

1. [YouTube video demonstrating resultant patterns](https://youtu.be/aEJtf0uvHfI?t=176)
2. [Full program notes by Steve Reich](https://www.boosey.com/cr/music/Steve-Reich-Drumming/1374)
3. [PAS Hall of Fame article](https://www.pas.org/about/hall-of-fame/steve-reich)
4. [Steve Reich's website](https://www.stevereich.com/)

## Technical Details

I used several JavaScript libraries in this project:
1. [VexFlow for rendering music notation](https://github.com/0xfe/vexflow)
2. [MidiWriterJS for writing MIDI](https://github.com/grimmdude/MidiWriterJS)
3. [MidiPlayerJS for reading MIDI](https://github.com/grimmdude/MidiPlayerJS)
4. [soundfont-player for audio playback](https://github.com/danigb/soundfont-player)
5. [MIDI.js for generating soundfonts](https://github.com/mudcube/MIDI.js)
