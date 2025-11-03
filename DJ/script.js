const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // or 'square', 'sawtooth', 'triangle'
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
oscillator.connect(audioContext.destination); // Connect to speakers
oscillator.start();
// To stop after a duration:
// oscillator.stop(audioContext.currentTime + 1); // Stops after 1 second
