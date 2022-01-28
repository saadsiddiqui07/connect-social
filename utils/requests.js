// GET YOUR OWN API KEY for free from "https://developers.themoviedb.org/"

const APIKEY = "43f94ce71ae8eceb736a77aaacdddb13";

// API FORMAT
// https://developers.themoviedb.org/3/discover/movie-discover

const requests = {
  fetchTrending: `/trending/all/week?api_key=${APIKEY}&language=en=US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${APIKEY}&with_networks123`,
  fetchTopRated: `/movie/top_rated?api_key=${APIKEY}&language=en=US`,
  fetchActionMovies: `/discover/movie?api_key=${APIKEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${APIKEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
};

export default requests;
