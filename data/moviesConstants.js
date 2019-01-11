export const MAX_OVERVIEW_LENGHT = 100;

export const MOVIE_FIELDS = [
  "id",
  "title",
  "poster_path",
  "vote_average",
  "overview",
  "userId"
];

export const genreId = [
  28,
  16,
  12,
  35,
  10770,
  80,
  99,
  10751,
  37,
  878,
  9648,
  10402,
  10749,
  27,
  53
];
export const genreText = [
  "Ação",
  "Animação",
  "Aventura",
  "Comedia",
  "Cinema TV",
  "Crime",
  "Documentário",
  "Familia",
  "Faroeste",
  "Ficção Cientifica",
  "Mistério",
  "Musica",
  "Romance",
  "Terror",
  "Thriller"
];
export const genreName = [
  "action",
  "animation",
  "adventure",
  "comedy",
  "cinemaTv",
  "crime",
  "documentary",
  "family",
  "farWest",
  "scienceFiction",
  "mystery",
  "music",
  "romance",
  "horror",
  "Thriller"
];

export const TypesSearch = [
  { name: "Filmes com maior Pontuação", type: "vote_average.desc" },
  { name: "Filmes Populares Antigos", type: "popularity.asc" },
  { name: "Filmes Populares Novos", type: "popularity.desc" },
  { name: "Files que custaram caro", type: "revenue.desc" },
  { name: "Primeira versão", type: "primary_release_date.desc" },
  { name: "Filmes Que serão lançados", type: "release_date.desc" }
];

export const API_KEY = "&api_key=cb19752a4a96a51fc14fcca42d113ee3&";
export const BASE_URL = "https://api.themoviedb.org/3/";
export const MOVIE = "movie/";
export const DISCOVER = "discover/movie?";
export const LANGUAGE = "&language=pt-BR&";
export const METHOD = "&sort_by=popularity.desc&";
export const VIDEO = "&include_video=true";
export const GENRE = "&with_genres=";

export const truncate = (text, length) =>
  text && text.length > length ? `${text.substring(0, length)}...` : text;
