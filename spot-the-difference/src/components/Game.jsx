import { useState, useEffect } from 'react';
import GameImage from './GameImage';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import SuccessModal from './SuccessModal';
import VolumeControl from './VolumeControl';



const Game = () => {
  const [gameConfig, setGameConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);
  const [error, setError] = useState(null);
  const [bgMusic] = useState(new Audio('/sfx/bg_music.mp3'));

  
  useEffect(() => {
    bgMusic.loop = true;
    bgMusic.volume = 0.3; 
    
    const playMusic = () => {
      bgMusic.play().catch(err => {
        console.error("Error playing background music:", err);
      });
    };
    
    
    const handleUserInteraction = () => {
      playMusic();
      
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      
      bgMusic.pause();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [bgMusic]);

  useEffect(() => {
    fetch('/game-config.json')
      .then(response => response.json())
      .then(data => {
        setGameConfig(data);
        setLoading(false);
        setTimerRunning(true);
      })
      .catch(err => {
        setError('Failed to load game configuration');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (gameConfig && foundDifferences.length === gameConfig.differences.length && foundDifferences.length > 0) {
      setTimerRunning(false);
      setGameCompleted(true);
      try {
        const audio = new Audio('/sfx/win.wav');
        audio.play();
      } catch (err) {
        console.error("Error playing win sound:", err);
      }
    }
  }, [foundDifferences, gameConfig]);

  const handleDifferenceFound = (index) => {
    if (!foundDifferences.includes(index)) {
      setFoundDifferences([...foundDifferences, index]);
      try {
        const audio = new Audio('/sfx/rightClick.wav');
        audio.play();
      } catch (err) {
        console.error("Error playing sound:", err);
      }
    }
  };

  const restartGame = () => {
    setFoundDifferences([]);
    setTimerRunning(true);
    setGameCompleted(false);
    setTimeElapsed(0);
    setResetTimer(prev => prev + 1);
  };

  if (loading) {
    return <div className="text-center p-10 text-xl text-gray-700">Loading game...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5 bg-background rounded shadow">
      <div className="flex flex-col items-center mb-5">
        <h1 className="text-4xl font-bold text-primary mb-4">{gameConfig.gameTitle}</h1>
        <div className="flex justify-between items-center w-full max-w-xl mx-auto p-3 bg-white rounded shadow md:flex-row flex-col gap-4">
          <div className="absolute top-4 right-4">
            <VolumeControl audio={bgMusic} />
          </div>
          <ScoreBoard 
            found={foundDifferences.length} 
            total={gameConfig.differences.length} 
          />
          <Timer 
            isRunning={timerRunning} 
            onTimeUpdate={setTimeElapsed} 
            resetTime={resetTimer}
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <GameImage 
          imageUrl={gameConfig.images.image1}
          differences={gameConfig.differences}
          foundDifferences={foundDifferences}
          onDifferenceFound={handleDifferenceFound}
          imagePosition="left"
        />
        <GameImage 
          imageUrl={gameConfig.images.image2}
          differences={gameConfig.differences}
          foundDifferences={foundDifferences}
          onDifferenceFound={handleDifferenceFound}
          imagePosition="right"
        />
      </div>
      
      {gameCompleted && (
        <SuccessModal 
          score={foundDifferences.length} 
          total={gameConfig.differences.length} 
          time={timeElapsed}
          onRestart={restartGame}
        />
      )}
    </div>
  );
};

export default Game;
