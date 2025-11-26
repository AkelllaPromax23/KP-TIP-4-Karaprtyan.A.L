import React, { useState } from 'react';
import './App.css';

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  isFavorite: boolean;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: 'Крестный отец', year: 1972, rating: 9.2, isFavorite: false },
    { id: 2, title: 'Темный рыцарь', year: 2008, rating: 9.0, isFavorite: false },
    { id: 3, title: 'Побег из Шоушенка', year: 1994, rating: 9.3, isFavorite: false },
    { id: 4, title: 'Форрест Гамп', year: 1994, rating: 8.8, isFavorite: false },
    { id: 5, title: 'Начало', year: 2010, rating: 8.8, isFavorite: false }
  ]);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieYear, setNewMovieYear] = useState('');

  const toggleFavorite = (id: number) => {
    setMovies(movies.map(movie =>
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
    ));
  };

  const addMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMovieTitle.trim() && newMovieYear.trim()) {
      const newMovie: Movie = {
        id: Date.now(),
        title: newMovieTitle,
        year: parseInt(newMovieYear),
        rating: 0,
        isFavorite: false
      };
      setMovies([...movies, newMovie]);
      setNewMovieTitle('');
      setNewMovieYear('');
    }
  };

  const filteredMovies = showFavoritesOnly
    ? movies.filter(movie => movie.isFavorite)
    : movies;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Мой список фильмов</h1>
      </header>

      <main className="App-main">
        <div className="controls">
          <button
            className={`filter-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            {showFavoritesOnly ? 'Показать все фильмы' : 'Показать только любимые'}
          </button>

          <form className="add-movie-form" onSubmit={addMovie}>
            <input
              type="text"
              placeholder="Название фильма"
              value={newMovieTitle}
              onChange={(e) => setNewMovieTitle(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Год выпуска"
              value={newMovieYear}
              onChange={(e) => setNewMovieYear(e.target.value)}
              min="1900"
              max="2030"
              required
            />
            <button type="submit">Добавить фильм</button>
          </form>
        </div>

        <div className="movies-grid">
          {filteredMovies.map(movie => (
            <div key={movie.id} className={`movie-card ${movie.isFavorite ? 'favorite' : ''}`}>
              <h3>{movie.title}</h3>
              <p>Год: {movie.year}</p>
              <p>Рейтинг: {movie.rating}/10</p>
              <button
                className={`favorite-btn ${movie.isFavorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(movie.id)}
              >
                {movie.isFavorite ? '❤️ В любимых' : '🤍 Добавить в любимые'}
              </button>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <p className="no-movies">Нет фильмов для отображения</p>
        )}
      </main>
    </div>
  );
}

export default App;