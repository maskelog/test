import React from 'react';

function MovieList({ boxOfficeMovies }) {
  return (
    <ul>
      {boxOfficeMovies.map(movie => (
        <li key={movie.movieCd}>
          <h3>{movie.movieNm}</h3>
          <p>순위: {movie.rank}</p>
          <p>개봉일: {movie.openDt}</p>
          <p>누적관람객: {movie.audiAcc}명</p>
          {movie.poster && <img src={movie.poster} alt={movie.movieNm} />}
        </li>
      ))}
    </ul>
  );
}

export default MovieList;