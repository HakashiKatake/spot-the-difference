import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ isRunning, onTimeUpdate, resetTime }) => {
  const [seconds, setSeconds] = useState(0);
  const prevSecondsRef = useRef(seconds);
  
  
  useEffect(() => {
    if (resetTime !== undefined) {
      setSeconds(0);
    }
  }, [resetTime]);
  
  
  useEffect(() => {
    if (prevSecondsRef.current !== seconds) {
      onTimeUpdate(seconds);
      prevSecondsRef.current = seconds;
    }
  }, [seconds, onTimeUpdate]);
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, seconds]);
  
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center font-bold text-lg">
      <span className="mr-3 text-xl">⏱️</span>
      <span>{formatTime()}</span>
    </div>
  );
};

Timer.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  onTimeUpdate: PropTypes.func,
  resetTime: PropTypes.number
};
Timer.defaultProps = {
  onTimeUpdate: () => {},
  resetTime: undefined
};

export default Timer;
