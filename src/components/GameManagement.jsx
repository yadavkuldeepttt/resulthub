// GameManagement.jsx
import React, { useState } from 'react';
import GameList from './GameList';
import GameControl from './GameControl';

const GameManagement = ({games,selectedGame,setGames,setSelectedGame}) => {


  const handleStartGame = (gameId) => {
    setGames(games.map(game => 
      game.id === gameId 
        ? { 
            ...game, 
            isActive: true, 
            startTime: new Date().toISOString(),
            endTime: null
          }
        : game
    ));
    
    // Update selected game
    setSelectedGame(prev => prev?.id === gameId 
      ? { ...prev, isActive: true, startTime: new Date().toISOString(), endTime: null }
      : prev
    );
  };

  const handleEndGame = (gameId) => {
    setGames(games.map(game => 
      game.id === gameId 
        ? { 
            ...game, 
            isActive: false, 
            endTime: new Date().toISOString()
          }
        : game
    ));
    
    // Update selected game
    setSelectedGame(prev => prev?.id === gameId 
      ? { ...prev, isActive: false, endTime: new Date().toISOString() }
      : prev
    );
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Games List</h2>
        <GameList 
          games={games}
          onGameSelect={setSelectedGame}
        />
      </div>

      {selectedGame && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Game Controls</h2>
          <GameControl
            game={selectedGame}
            onStartGame={handleStartGame}
            onEndGame={handleEndGame}
          />
        </div>
      )}
    </div>
  );
};

export default GameManagement;