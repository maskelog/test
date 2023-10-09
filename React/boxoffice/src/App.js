import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieList from './MovieList';

const cleanKMDbTitle = (title) => {
    title = title.replace(/\!HS|\!HE/g, ""); // !HS와 !HE 제거
    title = title.replace(/^\s+|\s+$/g, ""); // 앞뒤 공백 제거
    title = title.replace(/ +/g, " "); // 여러 개의 공백을 하나로 줄임 
    return title; 
};

function App() {
    const [boxOffice, setBoxOffice] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [showRange, setShowRange] = useState('');

    useEffect(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formattedDate = `${yesterday.getFullYear()}${(yesterday.getMonth() + 1).toString().padStart(2, '0')}${yesterday.getDate().toString().padStart(2, '0')}`;
        fetchBoxOfficeData(formattedDate);
        setShowRange(formattedDate);
    }, []);

    const handleSearch = () => {
        fetchBoxOfficeData(searchDate);
        setShowRange(searchDate);
    };

    const fetchBoxOfficeData = async (date) => {
        const formattedDate = date.split('-').join('');

        const KOBIS_API_KEY = process.env.REACT_APP_KOBIS_API_KEY;
        const KOREAFILM_API_KEY = process.env.REACT_APP_KOREAFILM_API_KEY;

        const KOBIS_URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${formattedDate}`;

        try {
            const response = await axios.get(KOBIS_URL);
            const movies = response.data?.boxOfficeResult?.dailyBoxOfficeList || [];

            const moviePosters = await Promise.all(movies.map(async movie => {
                const releaseDate = movie.openDt.replace(/-/g, ''); // "2023-08-15"를 "20230815" 형식으로 변환
                const QUERY_URL = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${KOREAFILM_API_KEY}&detail=Y&query=${encodeURIComponent(movie.movieNm)}&releaseDts=${releaseDate}`;

                const posterResponse = await axios.get(QUERY_URL);
                const matchingMovies = posterResponse.data?.Data?.[0]?.Result?.filter(resultMovie => {
                    const isTitleMatch = cleanKMDbTitle(resultMovie.title) === cleanKMDbTitle(movie.movieNm);
                    const isYearMatch = Math.abs(Number(resultMovie.prodYear) - Number(movie.openDt.substring(0, 4))) <= 1;
                    
                    return isTitleMatch && isYearMatch;
                });

                if (matchingMovies && matchingMovies.length > 0) {
                    const posters = matchingMovies[0]?.posters;
                    const posterURL = typeof posters === 'string' ? posters.split("|")[0] : null;

                    return { ...movie, poster: posterURL };
                }
                
                return { ...movie, poster: null };
            }));

            setBoxOffice(moviePosters);

        } catch (error) {
            console.error("Error fetching box office data:", error);
        }
    };

    return (
        <div className="App">
            <h1>어제자 박스오피스 순위</h1>
            <div className="header-section">
                <h2>조회일자: {showRange}</h2>
                <div className="search-box">
                    <input
                        type="date"
                        value={searchDate}
                        onChange={e => setSearchDate(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <MovieList boxOfficeMovies={boxOffice} />
        </div>
    );
}

export default App;