// Game sound effects for the spot-the-difference game

export const correctSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
};

export const winSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create multiple notes for a victory fanfare
  const notes = [
    { frequency: 523.25, duration: 0.1, delay: 0 },     // C5
    { frequency: 659.26, duration: 0.1, delay: 0.1 },   // E5
    { frequency: 783.99, duration: 0.1, delay: 0.2 },   // G5
    { frequency: 1046.50, duration: 0.3, delay: 0.3 }   // C6
  ];
  
  notes.forEach(note => {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = note.frequency;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + note.duration);
    }, note.delay * 1000);
  });
};
