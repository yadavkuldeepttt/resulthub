// GameList.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GameList = ({ games, onGameSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <Card 
          key={game.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onGameSelect(game)}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {game.name}
              <Badge variant={game.isActive ? "success" : "secondary"}>
                {game.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-gray-600">{game.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Current Players</p>
                  <p className="text-lg font-semibold">{game.currentPlayers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Session Length</p>
                  <p className="text-lg font-semibold">{game.maxSessionLength}min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameList;