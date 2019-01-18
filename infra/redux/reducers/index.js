import {
  SEARCH_MOVIE,
  ROW_STATE,
  WIDTH_STATE,
  HIDDEN_ICON_WATCHED_MOVIE,
} from "../constants/action-types";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

const searchMovie = (state = "", action) => {
  if (action.type === SEARCH_MOVIE) {
    return action.payload;
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

const hiddenAboutIcon = (state = false, action) => {
  if (action.type === HIDDEN_ICON_WATCHED_MOVIE) {
    return action.payload;
  }

  return state;
};


export const rootReducers = combineReducers({
  form: formReducer,
  searchMovie,
  rowState,
  widthState,
  hiddenAboutIcon,
});
