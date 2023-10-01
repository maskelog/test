import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [boxOffice, setBoxOffice] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [showRange, setShowRange] = useState('');


  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = `${yesterday.getFullYear()}${(yesterday.getMonth() + 1).toString().padStart(2, '0')}${yesterday.getDate().toString().padStart(2, '0')}`;
    
    fetchBoxOfficeData(formattedDate);
  }, []);

  const handleSearch = () => {
    fetchBoxOfficeData(searchDate);
  };

  const fetchBoxOfficeData = (date) => {
    const formattedDate = date.split('-').join('');
    
    const API_KEY = process.env.REACT_APP_KOBIS_API_KEY;
    const URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${formattedDate}`;
    
    axios.get(URL)
    .then(response => {
      setBoxOffice(response.data.boxOfficeResult.dailyBoxOfficeList);
      setShowRange(date);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  
  };

  return (
    <div className="App">
      <h1>Box Office</h1>
      <h2>조회일자: {showRange}</h2>
      
      <div className="search-box">
        <input
          type="date"
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul>
        {boxOffice.map(movie => (
          <li key={movie.movieCd}>
            <h3>{movie.movieNm}</h3>
            <p>순위: {movie.rank}</p>
            <p>개봉일: {movie.openDt}</p>
            <p>누적관람객: {movie.audiAcc}명</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
