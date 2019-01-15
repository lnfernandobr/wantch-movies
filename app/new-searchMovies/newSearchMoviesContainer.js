import { NewSearchMovies } from "./newSearchMovie";
import { compose } from "recompose";
import React from "react";
import { connect } from "react-redux";
import { setMoviesAction } from "../../infra/redux/actions/actions";
import { FetchMovies } from "./FetchMovies";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const QUERY_SEARCH_MOVIES = gql`
  query searchMovies($page: Int) {
    searchMovies(page: $page) {
      movies {
        id
        title
        poster_path
        type
      }
      pageInfo
    }
  }
`;

const mapStateToProps = ({ Movies }) => ({
  Movies
});
const mapDispatchToProps = dispatch => ({
  setMoviesAction: movies => dispatch(setMoviesAction(movies))
});

export const enhanceFetchMovies = compose(
  connect(
    null,
    mapDispatchToProps
  ),

  graphql(QUERY_SEARCH_MOVIES)
);
export const SearchEnhancedMovies = enhanceFetchMovies(FetchMovies);

const enhanceNewSearchMovies = compose(connect(mapStateToProps));

export const newSearchMoviesContainer = enhanceNewSearchMovies(NewSearchMovies);
