import { useState, useEffect } from "react";
import axios from "../../utils/axios";

const base_url = "https://image.tmdb.org/t/p/original/";

const MovieRow = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="mx-[15px]">
      <h2 className="text-sm sm:text-base md:text-lg  font-bold">{title}</h2>
      <div className="flex items-center  overflow-x-scroll scrollbar-hide ">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${base_url}${movie.poster_path}`}
            alt={movie.backdrop_path}
            className={`${
              isLargeRow
                ? "max-h-[250px] object-contain cursor-pointer m-2 transition-all duration-200 ease-in-out transform hover:scale-110 hover:z-50"
                : "max-h-[150px] cursor-pointer shadow-lg w-full m-2 object-contain"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
