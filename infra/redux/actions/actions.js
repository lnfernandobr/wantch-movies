import {
  ROW_STATE,
  SEARCH_MOVIE,
  WIDTH_STATE,
  HIDDEN_ICON_WATCHED_MOVIE
} from "../constants/action-types";

export const searchMovieAction = payload => {
  return {
    type: SEARCH_MOVIE,
    payload
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

export const hiddenAboutIconAction = payload => {
  return {
    type: HIDDEN_ICON_WATCHED_MOVIE,
    payload
  };
};
