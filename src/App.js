import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const transformedMovies = data.results.map((el) => {
      return {
        id: el.episode_id,
        title: el.title,
        openingText: el.opening_crawl,
        releaseDate: el.release_date,
      };
    });
    setIsLoading(false);
    setMovies(transformedMovies);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading ....</p>}
        {!isLoading && movies.length === 0 && <p>No movies found</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
