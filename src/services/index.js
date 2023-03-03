import axios from "axios";
import { config } from "../config";

export const getFeaturedMovie = async () => {
  const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.API_KEY}`;
  const {
    data: { results },
  } = await axios.get(URL);
  const randomIntInRange = Math.floor(Math.random() * results.length);
  return results[randomIntInRange];
};

export const getPopularMovies = async () => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}`;
  const { data } = await axios.get(URL);
  return data.results.slice(0, 4);
};
