import {
  SEARCH_MOVIE,
  STATE_FILTER,
  ROW_STATE,
  WIDTH_STATE,
  GENRE,
  SHOW_FILTER,
  SHOW_MOVIE_WATCHED,
  HIDDEN_ICONS,
  HIDDEN_ICON_WATCHED_MOVIE,
  GENRE_RESET, SET_MOVIES
} from '../constants/action-types';
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

const searchMovie = (state = "", action) => {
  if (action.type === SEARCH_MOVIE) {
    return action.payload;
  }

  return state;
};

const stateFilter = (state = true, action) => {
  if (action.type === STATE_FILTER) {
    return !state;
  }

  return state;
};

const rowState = (state = false, action) => {
  if (action.type === ROW_STATE) {
    return !state;
  }
  return state;
};

const widthState = (state = 0, action) => {
  if (action.type === WIDTH_STATE) {
    return action.payload;
  }
  return state;
};

const genre = (state = [], action) => {
  if (action.type === GENRE) {
    return state.includes(action.payload)
      ? state.filter(item => item !== action.payload)
      : [...state, action.payload];
  }
  if (action.type === GENRE_RESET) {
    return [];
  }
  return state;
};

const showFilter = (state = false, action) => {
  if (action.type === SHOW_FILTER) {
    return action.payload;
  }
  return state;
};

const showMovieWatched = (state = false, action) => {
  if (action.type === SHOW_MOVIE_WATCHED) {
    return !state;
  }
  return state;
};

const hiddenIcons = (state = false, action) => {
  if (action.type === HIDDEN_ICONS) {
    return action.payload;
  }

  return state;
};

const hiddenAboutIcon = (state = false, action) => {
  if (action.type === HIDDEN_ICON_WATCHED_MOVIE) {
    return action.payload;
  }

  return state;
};

const Movies = (movies = [], action) => {
  if(action.type === SET_MOVIES) {
    return [...movies, ...action.movies];
  }

  return [];
};

export const rootReducers = combineReducers({
  form: formReducer,
  searchMovie,
  stateFilter,
  rowState,
  widthState,
  genre,
  showFilter,
  showMovieWatched,
  hiddenIcons,
  hiddenAboutIcon,
  Movies
});
