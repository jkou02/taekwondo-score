import React, { useState } from 'react';
import { Button, Input } from "@heroui/react";
import { Icon } from '@iconify/react';

interface Fighter {
  name: string;
  score: number;
  roundsWon: number;
}

const FightModule: React.FC = () => {
  const [fighters, setFighters] = useState<[Fighter, Fighter]>([
    { name: 'Peleador Azul', score: 0, roundsWon: 0 },
    { name: 'Peleador Rojo', score: 0, roundsWon: 0 },
  ]);
  const [currentRound, setCurrentRound] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);

  const updateScore = (fighterIndex: number, points: number) => {
    setFighters(prev => {
      const newFighters = [...prev] as [Fighter, Fighter];
      const newScore = Math.max(newFighters[fighterIndex].score + points, 0); // Prevent negative scores
      newFighters[fighterIndex].score = newScore;
      return newFighters;
    });
  };

  const updateName = (fighterIndex: number, name: string) => {
    setFighters(prev => {
      const newFighters = [...prev] as [Fighter, Fighter];
      newFighters[fighterIndex].name = name;
      return newFighters;
    });
  };

  const endRound = () => {
    const [blue, red] = fighters;
    if (blue.score > red.score) {
      setFighters(prev => [{ ...prev[0], roundsWon: prev[0].roundsWon + 1 }, prev[1]]);
    } else if (red.score > blue.score) {
      setFighters(prev => [prev[0], { ...prev[1], roundsWon: prev[1].roundsWon + 1 }]);
    }
    setCurrentRound(prev => prev + 1);
    setFighters(prev => prev.map(f => ({ ...f, score: 0 })) as [Fighter, Fighter]);
  };

  const resetFight = () => {
    setFighters([
      { name: 'Peleador Azul', score: 0, roundsWon: 0 },
      { name: 'Peleador Rojo', score: 0, roundsWon: 0 },
    ]);
    setCurrentRound(1);
    setWinner(null);
  };

  const endFight = () => {
    const [blue, red] = fighters;
    if (blue.roundsWon > red.roundsWon) {
      setWinner(blue.name);
    } else if (red.roundsWon > blue.roundsWon) {
      setWinner(red.name);
    } else {
      setWinner('Empate');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <h3 className="text-lg sm:text-xl font-semibold">Round {currentRound}</h3>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
          <Button size="sm" color="primary" onPress={endRound}>Finalizar Round</Button>
          <Button size="sm" color="secondary" onPress={endFight}>Finalizar Combate</Button>
          <Button size="sm" color="danger" onPress={resetFight}>Reiniciar Combate</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {fighters.map((fighter, index) => (
          <div key={index} className={`p-4 sm:p-6 rounded-lg ${index === 0 ? 'bg-blue-600' : 'bg-red-600'}`}>
            <Input
              placeholder={`Nombre del Peleador ${index === 0 ? 'Azul' : 'Rojo'}`}
              value={fighter.name}
              onChange={(e) => updateName(index, e.target.value)}
              className="mb-2 sm:mb-4 text-base sm:text-lg"
            />
            <div className="text-6xl sm:text-8xl font-bold text-center mb-4 sm:mb-6 text-white">{fighter.score}</div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <Button size="sm" sm:size="lg" color={index === 0 ? "primary" : "danger"} onPress={() => updateScore(index, 1)}>+1</Button>
              <Button size="sm" sm:size="lg" color={index === 0 ? "primary" : "danger"} onPress={() => updateScore(index, 2)}>+2</Button>
              <Button size="sm" sm:size="lg" color={index === 0 ? "primary" : "danger"} onPress={() => updateScore(index, 3)}>+3</Button>
              <Button size="sm" sm:size="lg" color="warning" onPress={() => updateScore(index, -1)}>-1</Button>
            </div>
            <div className="mt-4 sm:mt-6 text-center text-lg sm:text-xl text-white">
              Rounds ganados: {fighter.roundsWon}
            </div>
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-4 sm:mt-6 text-center text-xl sm:text-2xl font-bold">
          Ganador: {winner}
        </div>
      )}
    </div>
  );
};

export default FightModule;