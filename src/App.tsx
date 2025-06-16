import React from 'react';
import { Card, CardBody, CardHeader } from "@heroui/react";
import FightModule from './components/FightModule';
import Timer from './components/Timer';
import EventLog from './components/EventLog';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Taekwondo Scoring App</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Fight Module</h2>
          </CardHeader>
          <CardBody>
            <FightModule />
          </CardBody>
        </Card>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Timer</h2>
            </CardHeader>
            <CardBody>
              <Timer />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Event Log</h2>
            </CardHeader>
            <CardBody>
              <EventLog />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;