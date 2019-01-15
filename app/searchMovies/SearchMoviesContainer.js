import { compose, withHandlers } from "recompose";
import SearchMovies from "./SearchMovies";
import React from "react";
import { enhance } from "../new-searchMovies/methodsMovie";
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
  enhance,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withHandlers({
    changeDiscover: ({ discover, setDiscover }) => data => {
      setDiscover(data);
    }
  }),
  withApollo
)(SearchMovies);
