import { setMoviesAction } from "../../../infra/redux/actions/actions";
import { compose } from "recompose";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { QUERY_SEARCH_MOVIES } from "../../../api/query/querys";
import { FetchMovies } from "./FetchMore";

const mapDispatchToProps = dispatch => ({
  setMoviesAction: movies => dispatch(setMoviesAction(movies))
});

export const EnhanceFetchMoreMovies = compose(
  connect(
    null,
    mapDispatchToProps
  ),

  graphql(QUERY_SEARCH_MOVIES)
)(FetchMovies);
