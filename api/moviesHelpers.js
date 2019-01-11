const IMG_BASE_URL = "https://image.tmdb.org/t/p/w300";
const IMG_BASE_POSTER = "https://image.tmdb.org/t/p/original";

export const getPoster = path =>
  path ? `${IMG_BASE_POSTER}${path}` : "noimage.jpeg";
export const getImageUrl = path =>
  path ? `${IMG_BASE_URL}${path}` : "noimage.jpeg";

export const filterMovies = (id, list) => {
  const arr = list.filter(item => item.id.toString() === id.toString());
  return arr[0] !== undefined;
};
