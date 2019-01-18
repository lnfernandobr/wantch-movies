import { QUERY_MY_MOVIES } from "../../api/query/querys";
import { PrintMovies } from "../../infra/ui/components/PrintMovies";
import { connect } from "react-redux";
import { Loading } from "../../infra/ui/components/loading";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import React from "react";

export const MyMoviesConnect = ({
  data: { loading, myMovies },
  searchMovie
}) => {
  if (loading) return <Loading />;

  const movies = myMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  return <PrintMovies movies={movies} type="table" />;
};

const mapStateToProps = ({ searchMovie }) => ({ searchMovie });
export const MyMovies = compose(
  connect(mapStateToProps),
  graphql(QUERY_MY_MOVIES)
)(MyMoviesConnect);
