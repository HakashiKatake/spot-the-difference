# Spot the Difference Game

A JSON-configurable "Spot the Difference" game built with React, Vite, and Tailwind CSS. Players are presented with two similar images and must find the differences between them.

## Features

- Two images displayed side-by-side
- Click on differences to mark them
- Score tracking system
- Timer to measure completion time
- Success modal when all differences are found
- Responsive design for mobile devices
- Sound effects for enhanced interactivity
- JSON-based configuration for easy customization

## Installation

```bash
# Clone the repository (if you're starting from scratch)
# git clone <repository-url>

# Navigate to project directory
cd spot-the-difference

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Game Configuration

The game is configured through the `public/game-config.json` file. You can customize the game by modifying this file:

```json
{
  "gameTitle": "Spot the Difference",
  "images": {
    "image1": "/img1.jpg",
    "image2": "/img2.jpg"
  },
  "differences": [
    { "x": 100, "y": 200, "width": 50, "height": 50 },
    { "x": 300, "y": 150, "width": 40, "height": 40 },
    { "x": 500, "y": 300, "width": 30, "height": 30 }
  ]
}
```

### Configuration Parameters

- `gameTitle`: The title displayed at the top of the game
- `images`: Paths to the two images (relative to the public directory)
- `differences`: Array of difference coordinates and dimensions
  - `x`: X-coordinate of the difference (from the left)
  - `y`: Y-coordinate of the difference (from the top)
  - `width`: Width of the difference area
  - `height`: Height of the difference area

## How to Play

1. The game displays two images side by side
2. Look for differences between the two images
3. Click on a difference when you find one
4. The difference will be highlighted with a circle
5. Find all differences to win the game

## Project Structure

```
spot-the-difference/
├── public/                  # Static assets
│   ├── game-config.json    # Game configuration
│   ├── img1.jpg            # First image
│   └── img2.jpg            # Second image
├── src/
│   ├── components/         # React components
│   │   ├── Game.jsx        # Main game component
│   │   ├── GameImage.jsx   # Image display component
│   │   ├── ScoreBoard.jsx  # Score tracking component
│   │   ├── SuccessModal.jsx # Victory modal
│   │   └── Timer.jsx       # Game timer component
│   ├── styles/             # CSS styles
│   │   └── Game.css        # Game styling
│   ├── utils/              # Utility functions
│   │   └── gameSounds.js   # Game sounds
│   ├── App.css            # App-wide styling
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
└── package.json           # Dependencies and scripts
```

## Customizing the Game

### Adding New Images

1. Add your image pairs to the `public/` directory
2. Update `game-config.json` to reference your new images
3. Adjust the difference coordinates to match your images

### Modifying Differences

To change the number or location of differences:

1. Open `game-config.json`
2. Edit the `differences` array with new coordinates and dimensions

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- JavaScript (ES6+)

## License

MIT

