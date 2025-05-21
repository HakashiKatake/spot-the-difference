import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameImage = ({ imageUrl, differences, foundDifferences, onDifferenceFound, imagePosition }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      const updateImageSize = () => {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight
        });
      };

      // Update size when image loads
      imageRef.current.onload = updateImageSize;
      
      // Update on window resize
      window.addEventListener('resize', updateImageSize);
      
      // Initial size check
      if (imageRef.current.complete) {
        updateImageSize();
      }

      return () => {
        window.removeEventListener('resize', updateImageSize);
      };
    }
  }, [imageRef]);

  const handleClick = (e) => {
    if (!imageRef.current || !containerRef.current) return;

    // Get click coordinates relative to the image
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Adjust coordinates based on image's actual rendered size vs. natural size
    const scaleX = imageSize.width / imageRef.current.naturalWidth;
    const scaleY = imageSize.height / imageRef.current.naturalHeight;

    // Check if click is within any difference area
    differences.forEach((diff, index) => {
      const diffX = diff.x * scaleX;
      const diffY = diff.y * scaleY;
      const diffWidth = diff.width * scaleX;
      const diffHeight = diff.height * scaleY;

      if (
        x >= diffX && 
        x <= diffX + diffWidth && 
        y >= diffY && 
        y <= diffY + diffHeight
      ) {
        onDifferenceFound(index);
      }
    });
  };

  return (
    <div 
      className="relative flex-1 border-3 border-secondary rounded overflow-hidden max-w-lg mx-auto" 
      ref={containerRef} 
      onClick={handleClick}
    >
      <img 
        ref={imageRef}
        src={imageUrl} 
        alt={`Spot the difference ${imagePosition} image`} 
        className="block w-full h-auto cursor-pointer"
      />
      
      {differences.map((diff, index) => {
        const isFound = foundDifferences.includes(index);
        if (!isFound) return null;

        const scaleX = imageSize.width / (imageRef.current?.naturalWidth || 1);
        const scaleY = imageSize.height / (imageRef.current?.naturalHeight || 1);

        return (
          <div 
            key={index}
            className="absolute border-3 border-accent rounded-full pointer-events-none z-10 animate-pulse-slow"
            style={{
              left: `${diff.x * scaleX}px`,
              top: `${diff.y * scaleY}px`,
              width: `${diff.width * scaleX}px`,
              height: `${diff.height * scaleY}px`
            }}
          />
        );
      })}
    </div>
  );
};

GameImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  differences: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  ).isRequired,
  foundDifferences: PropTypes.arrayOf(PropTypes.number).isRequired,
  onDifferenceFound: PropTypes.func.isRequired,
  imagePosition: PropTypes.oneOf(['left', 'right']).isRequired
};

export default GameImage;
