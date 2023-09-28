import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // API 호출 (실제 환경에서는 서버로부터 데이터를 가져옵니다.)
    fetch('http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=a5b5baa6-6bdf-4021-9e60-5a6282983678&numOfRows=10&pageNo=1')
      .then(response => response.json())
      .then(data => setEvents(data.body.items.item));
  }, []);

  return (
    <div className="app">
      <h1>공연 일정</h1>
      <EventList events={events} />
    </div>
  );
}

function EventList({ events }) {
  return (
    <div className="event-list">
      {events.map(event => <EventItem key={event.title} event={event} />)}
    </div>
  );
}

function EventItem({ event }) {
  return (
    <div className="event-item">
      <h2>{event.title}</h2>
      <p>기간: {event.period}</p>
      <p>설명: {event.description}</p>
      <a href={event.url}>더 보기</a>
    </div>
  );
}


export default App;
