import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const MovieRow = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // fetch data for specific rows
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  // fetch movie trailerUrl and play the trailer
  const handleFetchMovieTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // fetch movie's trailer
      movieTrailer(movie?.name || movie?.original_title || movie?.title || "")
        .then((url) => {
          // EXAMPLE -->> https://www.youtube.com/watch?v=rqxPu38oC1c
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.error(err.message));
    }
  };

  return (
    <div className="relative">
      <h2 className="text-sm sm:text-base md:text-lg  font-bold">{title}</h2>
      <div className="flex items-center  overflow-x-scroll scrollbar-hide ">
        {movies.map((movie) => (
          <img
            onClick={() => handleFetchMovieTrailer(movie)}
            key={movie.id}
            src={`${base_url}${movie.poster_path}`}
            alt={movie.backdrop_path}
            className={`${
              isLargeRow
                ? "max-h-[250px] object-contain cursor-pointer m-2 transition-all duration-200 ease-in-out transform hover:scale-110"
                : "max-h-[150px] object-contain cursor-pointer m-2 transition-all duration-200 ease-in-out transform hover:scale-110 hover:opacity-30"
            }`}
          />
        ))}
      </div>

      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={{
            height: "390",
            width: "100%",
            playerVars: { autoplay: 1, controls: 1 },
          }}
        />
      )}
    </div>
  );
};

export default MovieRow;
