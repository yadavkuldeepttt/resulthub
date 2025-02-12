# Game Leaderboard System

A Next-based game leaderboard system with real-time popularity tracking and contestant management.

## Description

This system allows tracking of multiple games, contestants, and their performance in real-time. It features popularity metrics, leaderboards, and comprehensive contestant management capabilities.

## Project Structure
```
game-leaderboard/
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── src/
|   ├──app/
│        ├── layout.js
│        ├── page.js
│   ├── data.json
│   ├── components/
│   │   ├── GamesManagement.jsx        # Displays and manages game listings
│   │   ├── Leaderboard.jsx      # Shows game and global leaderboards
│   │   ├── PopularityBoard.jsx  # Tracks game popularity metrics
│   │   ├── ContestantManager.jsx # Manages contestant entries
│   │   └── ui/                  # Reusable UI components
│   │       ├── card.jsx
│   │       ├── tabs.jsx
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       └── select.jsx
│   ├── styles/
│   │   └── globals.css          # Global styles
│   └── lib/
│       └── utils.js             # Utility functions
└── public/
    └── assets/                  # Static assets
```

## Features

- **Game Management**
  - Create and manage multiple games
  - Track game status (active/inactive)
  - Monitor session lengths and player counts

- **Contestant System**
  - Add and manage contestants
  - Track scores with timestamps
  - Associate contestants with specific games

- **Leaderboard**
  - Global and game-specific rankings
  - Real-time score updates
  - Historical performance tracking

- **Popularity Tracking**
  - Real-time popularity metrics
  - Auto-refresh every 5 minutes
  - Trend analysis and statistics

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd game-leaderboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage Guide

### Managing Games
1. Navigate to the Games tab
2. View pre-loaded games from data.json
3. Start/end games using game controls
4. Monitor active player counts

### Managing Contestants
1. Go to the Contestants tab
2. Click "Add Contestant"
3. Fill in contestant details:
   - Name
   - Email
   - Game selection
   - Initial score
4. Delete Contestants
5. Edit Contestants Details   

### Viewing Leaderboards
1. Access the Leaderboard tab
2. Toggle between:
   - Global rankings
   - Game-specific leaderboards
3. Filter by date range or game

### Tracking Popularity
1. Visit the Popularity tab
2. View real-time metrics:
   - Current player count
   - Session statistics
   - Trend indicators
3. Metrics auto-refresh every 5 minutes

## Test Cases

1. **Game Creation and Management**
   - Verify 5+ games in system
   - Check game status changes
   - Monitor session lengths

2. **Contestant Management**
   - Add multiple contestants
   - Assign to different games
   - Verify timestamp logging

3. **Score Tracking**
   - Record scores for contestants
   - Check timestamp accuracy
   - Verify score updates

4. **Leaderboard Functionality**
   - Test global rankings
   - Verify game-specific filters
   - Check sorting accuracy

5. **Popularity Metrics**
   - Monitor auto-refresh
   - Verify trend calculations
   - Test filter functions



## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.