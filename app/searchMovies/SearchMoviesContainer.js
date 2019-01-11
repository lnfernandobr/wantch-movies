import { compose, withHandlers, withState } from "recompose";
import SearchMovies from "./SearchMovies";
import React from "react";
import { connect } from "react-redux";

import {
  genreAction,
  rowStateAction,
  widthStateAction,
  hiddenIconsAction,
  hiddenAboutIconAction
} from "../../infra/redux/actions/actions";
import { withApollo } from "react-apollo";

const mapStateToProps = ({
  searchMovie,
  rowState,
  widthState,
  stateFilter,
  genre,
  showFilter
}) => {
  return {
    searchMovie,
    rowState,
    widthState,
    stateFilter,
    genre,
    showFilter
  };
};

const mapDispatchToProps = dispatch => ({
  rowStateAction: () => dispatch(rowStateAction()),
  widthStateAction: value => dispatch(widthStateAction(value)),
  genreAction: id => dispatch(genreAction(id)),
  hiddenIconsAction: state => dispatch(hiddenIconsAction(state)),
  hiddenAboutIconAction: state => dispatch(hiddenAboutIconAction(state))
});

export const Container = compose(
  withApollo,

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withState("filter", "setFilter", false),
  withState("discover", "setDiscover", []),
  withState("genreState", "setGenreState", [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]),
  withState("select", "setSelect", [false, false, false, false, false, false]),

  withHandlers({
    changeDiscover: ({ discover, setDiscover }) => data => {
      setDiscover(data);
    },

    changeGenreState: ({ genreState, setGenreState }) => index => {
      const state = genreState.map(
        (item, i) => (i === index ? !genreState[i] : genreState[i])
      );
      setGenreState(state);
    },

    changeSelect: ({ select, setSelect }) => index => {
      const state = select.map((item, i) => i === index);
      setSelect(state);
    }
  })
)(SearchMovies);
