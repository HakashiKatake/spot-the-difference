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

## How to Run the Game

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Installation and Setup

```bash
# Clone the repository (if you're starting from scratch)
# git clone <repository-url>

# Navigate to project directory
cd spot-the-difference

# Install dependencies
npm install
```

### Running the Game

```bash
# Start the development server
npm run dev
```

After running the command, you should see output similar to this:

```
  VITE v6.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to the local URL shown in the terminal (typically http://localhost:5173). The game should load automatically.

### Building for Production

When you're ready to deploy the game:

```bash
# Build the production version
npm run build

# Preview the production build locally (optional)
npm run preview
```

## How the Game Uses JSON Configuration

The game is entirely driven by a JSON configuration file, making it highly customizable without changing any code. This configuration-based approach allows you to create multiple game levels with different images and difference locations by simply editing the JSON.

### JSON Configuration File Location

The configuration file is located at: `public/game-config.json`

### JSON Structure Explanation

```json
{
  "gameTitle": "Spot the Difference",
  "images": {
    "image1": "/img1.jpg",
    "image2": "/img2.jpg"
  },
  "differences": [
    { "x": 145, "y": 95, "width": 120, "height": 75 },
    { "x": 280, "y": 225, "width": 60, "height": 60 },
    { "x": 140, "y": 455, "width": 100, "height": 100 }
  ]
}
```

### How the JSON Configuration Works

1. **Game Loading Process**:
   - When the game starts, it automatically fetches the `game-config.json` file
   - The React components use this data to render the game interface
   - No code changes are needed when swapping images or changing difference locations

2. **Configuration Parameters**:
   - `gameTitle`: The title displayed at the top of the game
   - `images`: Object containing paths to both images (relative to the public directory)
     - `image1`: Path to the first image (displayed on the left)
     - `image2`: Path to the second image (displayed on the right)
   - `differences`: Array of objects, each defining a clickable difference area:
     - `x`: X-coordinate of the difference (measured in pixels from the left edge)
     - `y`: Y-coordinate of the difference (measured in pixels from the top edge)
     - `width`: Width of the clickable area in pixels
     - `height`: Height of the clickable area in pixels

3. **How Differences Work**:
   - Each object in the `differences` array defines a rectangular area on both images
   - When a player clicks within these coordinates, the game checks if it matches any defined difference
   - If a match is found, the area is highlighted with a circle and counted toward completion
   - The game tracks which differences have been found using their array indices

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

