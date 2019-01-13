import { NewSearchMovies } from "./newSearchMovie";
import { compose, mapProps } from "recompose";
import React from "react";
import { connect } from "react-redux";
import { setMoviesAction } from "../../infra/redux/actions/actions";
import { FetchMovies } from "./FetchMovies";



const mapStateToProps = ({ Movies }) => ({
  Movies
});
const mapDispatchToProps = dispatch => ({
  setMoviesAction: movies => dispatch(setMoviesAction(movies))
});

const enhanceFetchMovies = compose(
  connect(
    null,
    mapDispatchToProps
  )
);
export const SearchEnhancedMovies = enhanceFetchMovies(FetchMovies);


const enhanceNewSearchMovies = compose(

  connect(mapStateToProps),
);

export const newSearchMoviesContainer = enhanceNewSearchMovies(NewSearchMovies);
