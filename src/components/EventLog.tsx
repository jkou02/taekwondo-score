import React, { useState, useEffect } from 'react';

interface LogEvent {
  id: number;
  message: string;
  timestamp: Date;
}

const EventLog: React.FC = () => {
  const [events, setEvents] = useState<LogEvent[]>([]);

  useEffect(() => {
    // This is a mock implementation. In a real app, you'd listen for actual events.
    const mockEvents = [
      { id: 1, message: "+2 puntos a Peleador Azul", timestamp: new Date() },
      { id: 2, message: "Inicio de Round 2", timestamp: new Date() },
      { id: 3, message: "Tiempo médico iniciado", timestamp: new Date() },
    ];
    setEvents(mockEvents);
  }, []);

  return (
    <div className="h-48 sm:h-64 overflow-y-auto">
      {events.map((event) => (
        <div key={event.id} className="mb-2 p-2 bg-content2 rounded text-sm sm:text-base">
          <span className="text-xs sm:text-sm text-foreground-500">
            {event.timestamp.toLocaleTimeString()}
          </span>
          <p className="text-foreground">{event.message}</p>
        </div>
      ))}
    </div>
  );
};

export default EventLog;