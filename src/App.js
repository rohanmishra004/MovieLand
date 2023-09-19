import React from 'react';
import { useEffect, useState } from 'react';
import './App.css'
import MovieCard from './MovieCard';
import searchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com?apikey=fc23a708';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm , setSearchTerm] = useState("")
  
  const searchMovies = async(title) => {
    const response = await fetch(`${ API_URL }&s=${title}`);
    const data = await response.json()
    console.log(data.Search)
    setMovies(data.Search)
  }
  
  useEffect(() => {
    searchMovies('SpiderMan')
  },[])
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          type="text"
          placeholder='search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />      
      </div>

      {
        movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
              
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }


    </div>
  );
}

export default App;
