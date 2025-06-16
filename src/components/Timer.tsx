import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from "@heroui/react";
import { Icon } from '@iconify/react';

const Timer: React.FC = () => {
  const [roundTime, setRoundTime] = useState(120); // 2 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isMedicalTime, setIsMedicalTime] = useState(false);
  const [medicalTimeLeft, setMedicalTimeLeft] = useState(60); // 1 minute for medical time
  const [breakTime, setBreakTime] = useState(60); // 1 minute break between rounds
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [medicalTime, setMedicalTime] = useState(60); // New state for configurable medical time
  const [breakTimeConfig, setBreakTimeConfig] = useState(60); // New state for configurable break time
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && !isMedicalTime && !isBreakTime) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            playSound();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isMedicalTime) {
      intervalRef.current = window.setInterval(() => {
        setMedicalTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsMedicalTime(false);
            playSound();
            return medicalTime; // Reset to configurable medical time
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isBreakTime) {
      intervalRef.current = window.setInterval(() => {
        setBreakTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsBreakTime(false);
            playSound();
            return breakTimeConfig; // Reset to configurable break time
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isMedicalTime, isBreakTime, medicalTime, breakTimeConfig]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (isMedicalTime) {
      setIsMedicalTime(false);
      setMedicalTimeLeft(medicalTime);
    }
    if (isBreakTime) {
      setIsBreakTime(false);
      setBreakTime(breakTimeConfig);
    }
  };

  const resetTimer = () => {
    setTimeLeft(roundTime);
    setIsRunning(false);
  };
  const toggleMedicalTime = () => {
    setIsMedicalTime(!isMedicalTime);
    setIsRunning(false);
  };
  const startBreakTime = () => {
    setIsBreakTime(true);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const playSound = () => {
    // Implement sound playing logic here
    console.log('Playing sound');
  };

  return (
    <div className="space-y-4">
      <div className="text-6xl font-bold text-center">
        {isMedicalTime ? formatTime(medicalTimeLeft) : 
         isBreakTime ? formatTime(breakTime) : 
         formatTime(timeLeft)}
      </div>
      <div className="flex justify-center space-x-2">
        <Button color={isRunning ? "warning" : "success"} onPress={toggleTimer}>
          <Icon icon={isRunning ? "lucide:pause" : "lucide:play"} className="mr-1" />
          {isRunning ? "Pausar" : "Iniciar"}
        </Button>
        <Button color="danger" onPress={resetTimer}>
          <Icon icon="lucide:refresh-cw" className="mr-1" />
          Reiniciar
        </Button>
        <Button color={isMedicalTime ? "warning" : "primary"} onPress={toggleMedicalTime}>
          <Icon icon="lucide:first-aid-kit" className="mr-1" />
          {isMedicalTime ? "Fin T. Médico" : "T. Médico"}
        </Button>
        <Button color="secondary" onPress={startBreakTime}>
          <Icon icon="lucide:coffee" className="mr-1" />
          Descanso
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <label htmlFor="roundTime" className="text-sm font-medium">
          Tiempo de Round (segundos):
        </label>
        <Input
          id="roundTime"
          type="number"
          value={roundTime}
          onChange={(e) => setRoundTime(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <label htmlFor="medicalTime" className="text-sm font-medium">
          Tiempo Médico (segundos):
        </label>
        <Input
          id="medicalTime"
          type="number"
          value={medicalTime}
          onChange={(e) => setMedicalTime(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <label htmlFor="breakTime" className="text-sm font-medium">
          Tiempo de Descanso (segundos):
        </label>
        <Input
          id="breakTime"
          type="number"
          value={breakTimeConfig}
          onChange={(e) => setBreakTimeConfig(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
    </div>
  );
};

export default Timer;