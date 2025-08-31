import React, { useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Calendar from "./components/Calendar";
import { Event } from "./types";

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleEventCreated = (newEvent: Event) => {
    console.log("追加されたイベント:", newEvent);
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <div className="App">
      <h1>日程調整アプリ</h1>
      <EventForm onEventCreated={handleEventCreated} />
      <h2>イベント一覧</h2>
      <EventList events={events}/>
      <h3>カレンダー</h3>
      <Calendar events={events}/>
    </div>
  );
};

export default App;
