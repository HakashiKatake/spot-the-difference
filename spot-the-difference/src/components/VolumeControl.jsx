import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VolumeControl = ({ audio }) => {
  const [volume, setVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(30);

  
  useEffect(() => {
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = 0;
    } else {
      audio.volume = volume / 100;
    }
  }, [volume, isMuted, audio]);

 
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

 
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume === 0 ? 30 : previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white/80 rounded-lg px-3 py-1 shadow-sm">
      <button
        onClick={toggleMute}
        className="text-gray-700 hover:text-primary focus:outline-none"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <span className="text-xl">🔇</span>
        ) : (
          volume > 50 ? (
            <span className="text-xl">🔊</span>
          ) : (
            <span className="text-xl">🔉</span>
          )
        )}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="w-24 h-2 bg-black rounded-lg appearance-none cursor-pointer"
        aria-label="Volume control"
      />
    </div>
  );
};

VolumeControl.propTypes = {
  audio: PropTypes.object
};

export default VolumeControl;
