import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AlertCircle, Pencil, Plus, Trash2, Trophy, UserPlus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ContestantManager = ({ contestants, setContestants, games }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContestant, setNewContestant] = useState({
    name: '',
    email: '',
    gameId: '',
    score: ''
  });

  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState('');

  // Reset form
  const resetForm = () => {
    setNewContestant({ name: '', email: '', gameId: '', score: '' });
    setError('');
  };

  // Handle adding a new contestant
  const handleSubmitContestant = (e) => {
    e.preventDefault();
    setError('');

    if (!newContestant.name || !newContestant.email) {
      setError('Please fill in all required fields');
      return;
    }

    const newCont = {
      id: contestants.length + 1,
      name: newContestant.name,
      email: newContestant.email,
      scores: []
    };

    if (newContestant.gameId && newContestant.score) {
      newCont.scores.push({
        gameId: parseInt(newContestant.gameId),
        score: parseInt(newContestant.score),
        timestamp: new Date().toISOString()
      });
    }

    setContestants([...contestants, newCont]);
    setShowAddForm(false);
    resetForm();
  };

  // Handle updating an existing contestant
  const handleUpdateContestant = (e) => {
    e.preventDefault();
    setError('');

    if (!newContestant.name || !newContestant.email) {
      setError('Please fill in all required fields');
      return;
    }

    if (selectedContestant) {
      setContestants(contestants.map(contestant => {
        if (contestant.id === selectedContestant.id) {
          const updatedContestant = {
            ...contestant,
            name: newContestant.name,
            email: newContestant.email,
          };

          if (newContestant.gameId && newContestant.score) {
            updatedContestant.scores.push({
              gameId: parseInt(newContestant.gameId),
              score: parseInt(newContestant.score),
              timestamp: new Date().toISOString()
            });
          }

          return updatedContestant;
        }
        return contestant;
      }));

      setShowEditForm(false);
      setSelectedContestant(null);
      resetForm();
    }
  };

  // Handle adding score to contestant
  const handleAddScore = (contestantId) => {
    const gameId = prompt('Enter Game ID:');
    const score = prompt('Enter Score:');

    if (gameId && score) {
      setContestants(contestants.map(contestant => {
        if (contestant.id === contestantId) {
          return {
            ...contestant,
            scores: [...contestant.scores, {
              gameId: parseInt(gameId),
              score: parseInt(score),
              timestamp: new Date().toISOString()
            }]
          };
        }
        return contestant;
      }));
    }
  };

  // Handle contestant delete action
  const handleDeleteClick = (contestant) => {
    setSelectedContestant(contestant);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    setContestants(contestants.filter(c => c.id !== selectedContestant.id));
    setShowDeleteDialog(false);
    setSelectedContestant(null);
  };

  // Handle editing a contestant
  const handleEditClick = (contestant) => {
    setSelectedContestant(contestant);
    setNewContestant({
      name: contestant.name,
      email: contestant.email,
      gameId: '',
      score: ''
    });
    setShowEditForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contestants</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add Contestant
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Contestant</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitContestant} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={newContestant.name}
                    onChange={(e) => setNewContestant({ ...newContestant, name: e.target.value })}
                    placeholder="Enter contestant name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={newContestant.email}
                    onChange={(e) => setNewContestant({ ...newContestant, email: e.target.value })}
                    placeholder="Enter email address"
                    type="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Game</label>
                  <Select
                    value={newContestant.gameId}
                    onValueChange={(value) => setNewContestant({ ...newContestant, gameId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a game" />
                    </SelectTrigger>
                    <SelectContent>
                      {games.map(game => (
                        <SelectItem key={game.id} value={game.id.toString()}>
                          {game.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Initial Score</label>
                  <Input
                    value={newContestant.score}
                    onChange={(e) => setNewContestant({ ...newContestant, score: e.target.value })}
                    placeholder="Enter initial score"
                    type="number"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Contestant</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {showEditForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Edit Contestant</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateContestant} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={newContestant.name}
                    onChange={(e) => setNewContestant({ ...newContestant, name: e.target.value })}
                    placeholder="Enter contestant name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={newContestant.email}
                    onChange={(e) => setNewContestant({ ...newContestant, email: e.target.value })}
                    placeholder="Enter email address"
                    type="email"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Contestant</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contestant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedContestant?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contestants.map(contestant => (
          <Card key={contestant.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{contestant.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddScore(contestant.id)}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Score
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditClick(contestant)}
                    className="flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteClick(contestant)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">{contestant.email}</p>
                
                {contestant.scores.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Scores
                    </h3>
                    <div className="space-y-1">
                      {contestant.scores.map((score, index) => {
                        const game = games.find(g => g.id === score.gameId);
                        return (
                          <div 
                            key={index}
                            className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
                          >
                            <span>{game?.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{score.score}</span>
                              <span className="text-gray-500 text-xs">
                                {new Date(score.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No scores yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContestantManager;
