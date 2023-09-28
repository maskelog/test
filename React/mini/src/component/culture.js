import React, { useState, useEffect } from 'react';

// App 컴포넌트
function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // API 호출
    fetch('http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=a5b5baa6-6bdf-4021-9e60-5a6282983678&numOfRows=10&pageNo=1')
      .then(response => response.json())
      .then(data => setEvents(data.body.items.item));
  }, []);

  return <EventList events={events} />;
}

// EventList 컴포넌트
function EventList({ events }) {
  return (
    <div>
      {events.map(event => <EventItem key={event.title} event={event} />)}
    </div>
  );
}

// EventItem 컴포넌트
function EventItem({ event }) {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <a href={event.url}>더 보기</a>
    </div>
  );
}

export default App;
