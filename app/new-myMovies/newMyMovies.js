import React  from "react";
import { Loading } from "../../infra/ui/components/loading";
import { PrintMovies } from '../new-searchMovies/fetchMoreMovies/PrintMovies';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { QUERY_MY_MOVIES } from '../../api/query/querys';

export const MyMoviesConnect = ({data:{ loading, myMovies }, searchMovie}) => {

  if (loading) return <Loading />;

  const movies = myMovies.filter(movie => movie.title.toLowerCase()
                         .includes(searchMovie.toLowerCase()));

  return <PrintMovies movies={movies} type="table" />

};

const mapStateToProps = ({ searchMovie}) => ({ searchMovie });
export const MyMovies = compose(connect(mapStateToProps), graphql(QUERY_MY_MOVIES))(MyMoviesConnect);