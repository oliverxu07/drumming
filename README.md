# Drumming

## Background

This project uses an algorithmic approach to explore the concept of resultant patterns, as used by Steve Reich in his composition, *Drumming* (1971). *Drumming* is a large-scale work written for bongos, marimbas, glockenspiels, female voices, and piccolo. In *Drumming*, Reich explores different rhythmic processes, including phasing, build-up and reduction, and resultant patterns. The hour-long piece is built around a single repeated rhythm in 12/8. While composing *Drumming*, Reich noticed that he could hear women's voices when playing the rhythm on marimba.

> "The women’s voices sing patterns resulting from the combination of two or more marimbas playing the identical repeating pattern one of more quarter notes out of phase with each other. By exactly imitating the sound of the instruments, and by gradually fading the patterns in and out, the singers cause them to slowly rise to the surface of the music and then fade back into it, allowing the listener to hear these patterns, along with many others, actually sounding in the instruments." - Steve Reich

In the first part, two players build up the basic rhythmic pattern on four pairs of tuned bongo drums, and then phase a quarter note apar from each other. At this point, two more players go back and forth playing different resultant patterns that they hear as a result of the combination of the phased patterns.

## An Algorithmic Approach

When I learned and performed *Drumming* with the Eastman Percussion Ensemble, my friend Victor and I were the ones playing the resultant patterns at the beginning of the piece. With pen and paper, we were able to figure out some interesting patterns that we could use in performance. This was the inspiration for this project, in which I used an algorithm to generate all possible resultant patterns given a composite texture created from two phased patterns. From these patterns, which include **11,664** possibilities given two phased patterns, groups of patterns are selected based on the following parameters that the user can adjust.
1. Number of notes: this measures the density of the pattern. In one measure of 12/8, a pattern can have up to ten 8th notes. In the composite texture, there are no notes in the 4th and 10th "slots" in the measure.
2. Number of stable beats: this measures the rhythmic stability of the pattern. If the pattern is heard in 3/2, which is a common way to perceive it, then the pattern can have up to three stable beats: the 1st, 5th, and 9th "slots" in the measure.
3. Number of melodic turns: this measures the melodic contour of the pattern. One melodic turn is defined as a change in direction of the melodic line, either from ascending to descending or vice versa. From one downbeat to the next, there can exist up to five melodic turns in a pattern.

## Conclusion

An important motivation for this project was to discover if I could find a way to teach a computer what it means for a resultant pattern to be interesting for a human listener. By choosing three important musical parameters that characterize a resultant pattern (note density, rhythmic stability, and melodic contour), I was able to organize the vast number of possible patterns into groups of similar patterns. Furthermore, I was able to identify the groups of patterns that would be uninteresting for a human listener. Most of the patterns with less than four notes are uninteresting, while those with more than eight notes have too much going on. Patterns with zero or one stable beats are both difficult for the listener to understand and for the performer to execute. Patterns with zero melodic turns are purely rhythmic, while those with five melodic turns may be difficult to understand.

With these generalities in mind, it is possible to identify the groups of patterns that are likely to be interesting for a human listener. There exist hundreds, if not thousands of these patterns that a performer may not otherwise discover, whether with his or her ear during a performance or by studying the composite texture. I hope that this project will inspire performers to seek out unique patterns, perhaps after finding some interesting ones with this website. Alternatively, those with experience performing *Drumming* can analyze the patterns that they have used, and use this website to discover additional patterns that share some characteristics.

## Resources

1. [YouTube video demonstrating resultant patterns](https://youtu.be/aEJtf0uvHfI?t=176)
2. [Full program notes by Steve Reich](https://www.boosey.com/cr/music/Steve-Reich-Drumming/1374)
3. [NPR interview with Steve Reich](https://www.npr.org/2000/07/17/1079628/drumming?fbclid=IwAR2At5BU6ySeTyGwDPZ-hKOr1Tb-wE4dyzwd3oFRq9Z-DSrDqmYwDiuOGAE)
4. [PAS Hall of Fame article](https://www.pas.org/about/hall-of-fame/steve-reich)
5. [Steve Reich's website](https://www.stevereich.com/)

## Technical Details

I used several JavaScript libraries in this project:
1. [VexFlow for rendering music notation](https://github.com/0xfe/vexflow)
2. [MidiWriterJS for writing MIDI](https://github.com/grimmdude/MidiWriterJS)
3. [MidiPlayerJS for reading MIDI](https://github.com/grimmdude/MidiPlayerJS)
4. [soundfont-player for audio playback](https://github.com/danigb/soundfont-player)
5. [MIDI.js for generating soundfonts](https://github.com/mudcube/MIDI.js)
