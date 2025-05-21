import PropTypes from 'prop-types';

const SuccessModal = ({ score, total, time, onRestart }) => {
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-11/12 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary">🎉 Congratulations! 🎉</h2>
        </div>
        <div className="mb-6">
          <p className="text-lg mb-4">You have found all the differences!</p>
          <div className="flex justify-around mb-4">
            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-700 mb-1">Score:</span>
              <span className="text-2xl text-secondary">{score} / {total}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-700 mb-1">Time:</span>
              <span className="text-2xl text-secondary">{formatTime(time)}</span>
            </div>
          </div>
        </div>
        <div>
          <button 
            className="bg-accent hover:bg-green-600 active:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg" 
            onClick={onRestart}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired
};

export default SuccessModal;
