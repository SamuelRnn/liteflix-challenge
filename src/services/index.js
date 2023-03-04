import axios from "axios";
import { config } from "../config";
//miscellaneous
export const simulateDelay = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
};
//data handlers
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

// image posting and processing handlers
const getHostedImage = (uuid) => `https://ucarecdn.com/${uuid}/`;

export const isImage = (imageData) => {
  return imageData.type.startsWith("image/");
};

export const postNewMovieImage = async (movieFileData) => {
  const URL = "https://upload.uploadcare.com/base/";
  const body = {
    UPLOADCARE_PUB_KEY: config.UPLOAD_API_KEY,
    file: movieFileData,
  };
  const { data } = await axios.postForm(URL, body);
  return [data.file, getHostedImage(data.file)];
};
