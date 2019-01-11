import {
  ROW_STATE,
  SEARCH_MOVIE,
  STATE_FILTER,
  WIDTH_STATE,
  GENRE,
  SHOW_FILTER,
  SHOW_MOVIE_WATCHED,
  HIDDEN_ICONS,
  HIDDEN_ICON_WATCHED_MOVIE,
  GENRE_RESET
} from "../constants/action-types";

export const searchMovieAction = payload => {
  return {
    type: SEARCH_MOVIE,
    payload
  };
};

export const stateFilterAction = () => {
  return {
    type: STATE_FILTER
  };
};

export const rowStateAction = () => {
  return {
    type: ROW_STATE
  };
};

export const widthStateAction = payload => {
  return {
    type: WIDTH_STATE,
    payload
  };
};

export const genreAction = payload => {
  return {
    type: GENRE,
    payload
  };
};

export const genreResetAction = () => {
  return {
    type: GENRE_RESET
  };
};

export const showFilterAction = payload => {
  return {
    type: SHOW_FILTER,
    payload
  };
};

export const showMovieWatchedAction = () => {
  return {
    type: SHOW_MOVIE_WATCHED
  };
};

export const hiddenIconsAction = payload => {
  return {
    type: HIDDEN_ICONS,
    payload
  };
};

export const hiddenAboutIconAction = payload => {
  return {
    type: HIDDEN_ICON_WATCHED_MOVIE,
    payload
  };
};
