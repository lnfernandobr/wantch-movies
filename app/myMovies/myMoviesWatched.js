import { QUERY_WATCHED_MOVIES } from "../../api/query/querys";
import { PrintMovies } from "../../infra/ui/components/PrintMovies";
import { connect } from "react-redux";
import { Loading } from "../../infra/ui/components/loading";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import React from "react";

export const MyMoviesWatchedConnect = ({
  data: { loading, moviesWatched },
  searchMovie
}) => {
  if (loading) return <Loading />;

  const movies = moviesWatched.filter(movie =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  return <PrintMovies movies={movies} type="table" />;
};

const mapStateToProps = ({ searchMovie }) => ({ searchMovie });
export const MyMoviesWatched = compose(
  connect(mapStateToProps),
  graphql(QUERY_WATCHED_MOVIES)
)(MyMoviesWatchedConnect);
