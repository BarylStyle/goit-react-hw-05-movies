import  { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import './scss/MovieDetails.scss';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';
  const base_url = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=90ff0d6f30cf7af6cc45ac6681c838a9`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [movieId]);

  return (
    <div className="movie-details">
      {movie ? (
        <>
          <Link to={backLinkHref}>Back to movies</Link>
          <h1>{movie.title}</h1>
          <div className="movie-info">
            <img src={`${base_url}${movie.poster_path}`} alt={`${movie.title} poster`} />
            <p>{movie.overview}</p>
          </div>
          <nav>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
          </nav>
          <Outlet />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieDetails;