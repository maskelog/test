import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieList from './MovieList';

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

  const fetchBoxOfficeData = async (date) => {
    const formattedDate = date.split('-').join('');
    
    const KOBIS_API_KEY = process.env.REACT_APP_KOBIS_API_KEY;
    const KOREAFILM_API_KEY = process.env.REACT_APP_KOREAFILM_API_KEY;
    
    const KOBIS_URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${formattedDate}`;
    
    try {
      const response = await axios.get(KOBIS_URL);
      const movies = response.data?.boxOfficeResult?.dailyBoxOfficeList || [];

      if (movies.length === 0) {
        console.warn("No movies returned from KOBIS API.");
        setBoxOffice([]);
        return;
      }

      const movieDetails = await Promise.all(movies.map(async movie => {
        const QUERY_URL = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${KOREAFILM_API_KEY}&detail=Y&query=${encodeURIComponent(movie.movieNm)}`;
        const detailResponse = await axios.get(QUERY_URL);
        
        const matchedMovie = detailResponse.data?.Data?.[0]?.Result?.find(resultMovie => 
          resultMovie.title.includes(movie.movieNm) && resultMovie.prodYear === movie.openDt.substring(0,4)
        );

        const cleanedTitle = matchedMovie?.title?.replace(/!HS|!HE/g, "") || "";
        const posters = matchedMovie?.posters;
        const posterURL = typeof posters === 'string' ? posters.split("|")[0] : null;
        
        return {
          title: cleanedTitle,
          poster: posterURL
        };
      }));

      const enhancedMovies = movies.map((movie, index) => ({
        ...movie,
        title: movieDetails[index].title,
        poster: movieDetails[index].poster
      }));

      setBoxOffice(enhancedMovies);
      setShowRange(date);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};


  return (
    <div className="App">
      <h1>어제자 박스오피스 순위</h1>
      <h2>조회일자: {showRange}</h2>
      
      <div className="search-box">
        <input
          type="date"
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <MovieList boxOfficeMovies={boxOffice} />
    </div>
  );
}

export default App;