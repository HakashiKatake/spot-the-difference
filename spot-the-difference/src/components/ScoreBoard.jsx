import PropTypes from 'prop-types';

const ScoreBoard = ({ found, total }) => {
  return (
    <div className="flex items-center font-bold text-lg">
      <span className="mr-3 text-xl">🔍</span>
      <span>
        {found} / {total} Differences Found
      </span>
    </div>
  );
};
ScoreBoard.propTypes = {
  found: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default ScoreBoard;
