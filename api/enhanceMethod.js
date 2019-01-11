import { compose, withProps } from "recompose";
import { graphql } from "react-apollo";
import { MyMovieContainer } from "../app/myMovies/MovieContainer";
import { Container } from "../app/searchMovies/SearchMoviesContainer";
import { QUERY_MY_MOVIES, QUERY_WATCHED_MOVIES } from "./Query";

import {
  MUTATION_SAVE_MOVIE,
  MUTATION_REMOVE_MOVIE,
  MUTATION_REMOVE_WATCHED_MOVIE,
  MUTATION_SAVE_WATCHED_MOVIE
} from "./Mutation";
import { AboutMovieConnect } from '../app/aboutMovie/aboutMovieContainer';

const methodMovie = ({ id, title, poster_path }, fn) => {

  fn({
    variables: {
      id,
      title,
      poster_path,
    }
  });

};

const enhance = compose(
  withProps({ methodMovie }),

  graphql(QUERY_MY_MOVIES, { name: "QUERY_MY_MOVIES" }),
  graphql(QUERY_WATCHED_MOVIES, { name: "QUERY_WATCHED_MOVIES" }),
  graphql(MUTATION_SAVE_MOVIE, {
    name: "saveMovie",
    options: {
      update: (proxy, { data: { saveMovie } }) => {
        const data = proxy.readQuery({ query: QUERY_MY_MOVIES });
        data.myMovies.push(saveMovie);
        proxy.writeQuery({ query: QUERY_MY_MOVIES, data });
      }
    }
  }),
  graphql(MUTATION_REMOVE_MOVIE, {
    name: "removeMovie",
    options: {
      update: (proxy, { data: { removeMovie } }) => {
        const obj = proxy.readQuery({ query: QUERY_MY_MOVIES });


        const data = {};
        obj.myMovies = obj.myMovies.filter(
          movie => movie.id !== removeMovie.id
        );

        proxy.readQuery({ query: QUERY_MY_MOVIES }, data);

      }
    }
  }),
  graphql(MUTATION_REMOVE_WATCHED_MOVIE, {
    name: "removeWatchedMovie",
    options: {
      refetchQueries: [
        {
          query: QUERY_WATCHED_MOVIES
        },
        {
          query: QUERY_MY_MOVIES
        }
      ]
    }
  }),
  graphql(MUTATION_SAVE_WATCHED_MOVIE, {
    name: "saveWatchedMovie",
    options: {
      refetchQueries: [
        {
          query: QUERY_MY_MOVIES
        },
        {
          query: QUERY_WATCHED_MOVIES
        }
      ]
    }
  })
);

export const MY_MovieContainer = enhance(MyMovieContainer);
export const SearchMoviesContainer = enhance(Container);
export const AboutMovieContainer = enhance(AboutMovieConnect);
