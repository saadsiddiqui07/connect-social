import axios from "../../utils/axios";
import requests from "../../utils/requests";
import { useState, useEffect } from "react";
import { truncateText } from "../../utils/truncateText";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const MovieBanner = () => {
  const [movie, setMovie] = useState([]);

  // fetch random movies for the banner
  const fetchData = async () => {
    const response = await axios.get(requests.fetchNetflixOriginals);
    setMovie(
      response.data.results[
        Math.floor(Math.random() * response.data.results.length - 1)
      ]
    );
    return response;
  };

  useEffect(() => {
    const unsubscribe = fetchData();
    // cleanup action
    return () => unsubscribe;
  }, []);

  if (movie?.backdrop_path && movie?.poster_path == undefined) return null;
  return (
    <header
      className="h-[448px] bg-opacity-5 text-white object-contain"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="h-[190px] pt-36 mx-4">
        <h1 className="text-3xl text-white font-bold pb-0">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="flex items-center mt-4">
          <button className="text-white flex items-center outline-none border-none font-bold rounded-md px-6 text-sm pt-2 pb-2 bg-gradient-to-r from-blue-500 to-blue-500 hover:from-green-400 hover:to-blue-500">
            <PlayArrowOutlinedIcon />
            Play
          </button>
          <p className="mx-9 text-2xl flex items-center font-bold">
            {movie?.vote_average}{" "}
            <StarRoundedIcon className="text-yellow-500" />{" "}
          </p>
        </div>
        <h1 className="w-[45rem] leading-5 pt-4 text-base h-20 max-w-fit">
          {truncateText(movie?.overview, 150)}
        </h1>
      </div>
    </header>
  );
};

export default MovieBanner;
