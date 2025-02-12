// GameControl.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const GameControl = ({ game, onStartGame, onEndGame }) => {
  const handleAction = () => {
    if (game.isActive) {
      onEndGame(game.id);
    } else {
      onStartGame(game.id);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Game Controls
          <Badge variant={game.isActive ? "success" : "secondary"}>
            {game.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Game</p>
              <p className="text-lg font-semibold">{game.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Players</p>
              <p className="text-lg font-semibold">{game.currentPlayers}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base">
              {game.isActive 
                ? `Started at ${new Date(game.startTime).toLocaleTimeString()}`
                : 'Ready to start'}
            </p>
          </div>

          <Button 
            className="w-full"
            variant={game.isActive ? "destructive" : "default"}
            onClick={handleAction}
          >
            {game.isActive ? 'End Game' : 'Start Game'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameControl;