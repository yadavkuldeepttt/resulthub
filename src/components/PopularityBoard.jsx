import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { RefreshCw } from 'lucide-react';

const PopularityBoard = ({ games }) => {
  const [popularityScores, setPopularityScores] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const calculatePopularityScores = () => {
    // Find maximum values for normalization
    const maxDailyPlayers = Math.max(...games.map(g => g.playersYesterday));
    const maxConcurrentPlayers = Math.max(...games.map(g => g.currentPlayers));
    const maxUpvotes = Math.max(...games.map(g => g.upvotes));
    const maxSessionLength = Math.max(...games.map(g => g.maxSessionLength));
    const maxDailySessions = Math.max(...games.map(g => g.sessionsYesterday));

    // Calculate normalized scores for each game
    const scores = games.map(game => {
      const score = (
        0.3 * (game.playersYesterday / maxDailyPlayers) +
        0.2 * (game.currentPlayers / maxConcurrentPlayers) +
        0.25 * (game.upvotes / maxUpvotes) +
        0.15 * (game.maxSessionLength / maxSessionLength) +
        0.1 * (game.sessionsYesterday / maxDailySessions)
      );

      return {
        ...game,
        popularityScore: score.toFixed(3)
      };
    }).sort((a, b) => b.popularityScore - a.popularityScore);

    setPopularityScores(scores);
    setLastUpdated(new Date());
  };

  // Initial calculation and setup interval
  useEffect(() => {
    calculatePopularityScores();
    const interval = setInterval(calculatePopularityScores, 300000); // 5 minutes
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [games]);

  const handleManualRefresh = () => {
    calculatePopularityScores();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Game Popularity Rankings</CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleManualRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Rank</th>
                  <th className="px-4 py-2 text-left">Game</th>
                  <th className="px-4 py-2 text-left">Popularity Score</th>
                  <th className="px-4 py-2 text-left">Current Players</th>
                  <th className="px-4 py-2 text-left">Yesterday's Players</th>
                  <th className="px-4 py-2 text-left">Upvotes</th>
                  <th className="px-4 py-2 text-left">Max Session Length</th>
                </tr>
              </thead>
              <tbody>
                {popularityScores.map((game, index) => (
                  <tr 
                    key={game.id} 
                    className={`border-b hover:bg-gray-50 ${
                      index === 0 ? 'bg-green-50' : 
                      index === 1 ? 'bg-blue-50' : 
                      index === 2 ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="px-4 py-2 font-medium">
                      {index + 1}
                      {index < 3 && 
                        <span className="ml-2">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      }
                    </td>
                    <td className="px-4 py-2 font-medium">{game.name}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${game.popularityScore * 100}%` }}
                          />
                        </div>
                        <span>{game.popularityScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{game.currentPlayers}</td>
                    <td className="px-4 py-2">{game.playersYesterday}</td>
                    <td className="px-4 py-2">{game.upvotes}</td>
                    <td className="px-4 py-2">{game.maxSessionLength} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Popularity Score Calculation</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Yesterday's Players (30%)</li>
              <li>• Current Players (20%)</li>
              <li>• Upvotes (25%)</li>
              <li>• Max Session Length (15%)</li>
              <li>• Sessions Yesterday (10%)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularityBoard;