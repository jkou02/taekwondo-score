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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Round {currentRound}</h3>
        <div className="space-x-2">
          <Button color="primary" onPress={endRound}>Finalizar Round</Button>
          <Button color="secondary" onPress={endFight}>Finalizar Combate</Button>
          <Button color="danger" onPress={resetFight}>Reiniciar Combate</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {fighters.map((fighter, index) => (
          <div key={index} className={`p-6 rounded-lg ${index === 0 ? 'bg-blue-600' : 'bg-red-600'}`}>
            <Input
              placeholder={`Nombre del Peleador ${index === 0 ? 'Azul' : 'Rojo'}`}
              value={fighter.name}
              onChange={(e) => updateName(index, e.target.value)}
              className="mb-4 text-lg"
            />
            <div className="text-8xl font-bold text-center mb-6 text-white">{fighter.score}</div>
            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" color={index === 0 ? "primary" : "danger"} onPress={() => updateScore(index, 1)}>+1</Button>
              <Button size="lg" color={index === 0 ? "primary" : "danger"} onPress={() => updateScore(index, 2)}>+2</Button>
              <Button size="lg" color={index === 0 ? "primary" : "danger"} onPress={() => updateScore(index, 3)}>+3</Button>
              <Button size="lg" color="warning" onPress={() => updateScore(index, -1)}>-1</Button>
            </div>
            <div className="mt-6 text-center text-xl text-white">
              Rounds ganados: {fighter.roundsWon}
            </div>
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-6 text-center text-2xl font-bold">
          Ganador: {winner}
        </div>
      )}
    </div>
  );
};

export default FightModule;