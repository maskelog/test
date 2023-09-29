import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml-js';
import './App.css';

const API_ENDPOINT = 'http://api.kcisa.kr/openapi/CNV_060/request';
const SERVICE_KEY = 'a5b5baa6-6bdf-4021-9e60-5a6282983678';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>문화예술공연 목록</h1>
      </header>
      <EventList />
    </div>
  );
}

function EventList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API_ENDPOINT, {
          params: {
            serviceKey: SERVICE_KEY,
            numOfRows: 10,
            pageNo: 1
          }
        });
        
        const jsonData = xml2js.xml2js(response.data, { compact: true });
        const eventsData = jsonData.root.item; // 이 부분은 실제 XML 구조에 따라 수정해야 합니다.
        
        setEvents(eventsData);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <h2>{event.title._text}</h2>
          <p>기간: {event.period._text}</p>
          <p>시간: {event.eventPeriod._text}</p>
          <p>장소: {event.eventSite._text}</p>
          <p>금액: {event.charge._text}</p>
          <p>문의안내: {event.contactPoint._text}</p>
          <p>설명: {event.description._text}</p>
          <a href={event.url._text} target="_blank" rel="noreferrer">자세히 보기</a>
          <img src={event.imageObject._text} alt={event.title._text} />
        </div>
      ))}
    </div>
  );
}

export default App;