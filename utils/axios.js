import axios from "axios";

// the prefix of fetching movies from the APIKEY
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
