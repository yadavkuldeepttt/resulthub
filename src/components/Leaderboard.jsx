import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Leaderboard = ({ games, contestants, selectedGame }) => {
  const [sortBy, setSortBy] = useState('score'); // Default sort by score
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order descending
  const [filterByGame, setFilterByGame] = useState(selectedGame?.id || ''); // Filter by game

  const leaderboardData = useMemo(() => {
    let allScores = contestants.flatMap(contestant => 
      contestant.scores.map(score => ({
        ...score,
        playerName: contestant.name,
        gameName: games.find(g => g.id === score.gameId)?.name
      }))
    );

    // Filter by game if a game is selected
    if (filterByGame) {
      allScores = allScores.filter(score => score.gameId === filterByGame);
    }

    // Sorting logic
    allScores.sort((a, b) => {
      if (sortBy === 'score') {
        return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
      } else if (sortBy === 'date') {
        return sortOrder === 'desc' ? new Date(b.timestamp) - new Date(a.timestamp) : new Date(a.timestamp) - new Date(b.timestamp);
      } else if (sortBy === 'player') {
        return sortOrder === 'desc' ? b.playerName.localeCompare(a.playerName) : a.playerName.localeCompare(b.playerName);
      }
      return 0;
    });

    return allScores;
  }, [contestants, filterByGame, sortBy, sortOrder, games]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {selectedGame ? `${selectedGame.name} Leaderboard` : 'Global Leaderboard'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          {/* Filter by game */}
          <Select value={filterByGame} onValueChange={setFilterByGame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Games</SelectItem>
              {games.map(game => (
                <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort by */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="player">Player</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort order */}
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Player</th>
                <th className="px-4 py-2 text-left">Game</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((score, index) => (
                <tr key={`${score.playerName}-${score.gameId}-${score.timestamp}`} 
                    className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{score.playerName}</td>
                  <td className="px-4 py-2">{score.gameName}</td>
                  <td className="px-4 py-2">{score.score}</td>
                  <td className="px-4 py-2">
                    {new Date(score.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;