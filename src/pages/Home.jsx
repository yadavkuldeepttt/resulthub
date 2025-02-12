"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GamesList from "../components/GameList";
import Leaderboard from "../components/Leaderboard";
import PopularityBoard from "../components/PopularityBoard";
import ContestantManager from "../components/ContestantManager";
import gameData from "../data.json";
import GameManagement from "@/components/GameManagement";

const HomeSection = () => {
  const [games, setGames] = useState(gameData.games);
  const [contestants, setContestants] = useState(gameData.contestants);
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Game Leaderboard System
        </h1>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="popularity">Popularity</TabsTrigger>
            <TabsTrigger value="contestants">Contestants</TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            {/* <GamesList 
              games={games}
              setGames={setGames}
              setSelectedGame={setSelectedGame}
            /> */}
            <GameManagement
              games={games}
              setGames={setGames}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard
              games={games}
              contestants={contestants}
              selectedGame={selectedGame}
            />
          </TabsContent>

          <TabsContent value="popularity">
            <PopularityBoard games={games} />
          </TabsContent>

          <TabsContent value="contestants">
            <ContestantManager
              contestants={contestants}
              setContestants={setContestants}
              games={games}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomeSection;
