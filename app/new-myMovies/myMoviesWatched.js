import React  from "react";
import { Loading } from "../../infra/ui/components/loading";
import { PrintMovies } from '../new-searchMovies/fetchMoreMovies/PrintMovies';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { QUERY_WATCHED_MOVIES } from '../../api/query/querys';

export const  MyMoviesWatchedConnect = ({ data: {loading, moviesWatched}, searchMovie}) => {

  if  (loading) return <Loading />;

  const movies = moviesWatched.filter(movie => movie.title.toLowerCase()
                              .includes(searchMovie.toLowerCase()));

  return <PrintMovies movies={movies} type="table" />
};

const mapStateToProps = ({ searchMovie}) => ({ searchMovie });
export const MyMoviesWatched = compose(connect(mapStateToProps), graphql(QUERY_WATCHED_MOVIES))(MyMoviesWatchedConnect);