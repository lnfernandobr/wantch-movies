import { compose, withHandlers } from "recompose";
import { removeMovie } from "./mutation/removeMovie";
import { saveMovie } from "./mutation/saveMovie";
import { QueryMyMovies } from "./query/myMovies";
import { QueryMyMoviesWatched } from "./query/moviesWatched";

export const enhance = compose(
  QueryMyMovies,
  QueryMyMoviesWatched,
  saveMovie,
  removeMovie,

  withHandlers({
    saveMovie: ({
      saveMovie,
      removeMovie,
      QUERY_MY_MOVIES: { myMovies, fetchMore },
      QUERY_WATCHED_MOVIES: { moviesWatched }
    }) => (idMovie, title, poster_path) => {
      const id = Number(idMovie);
      const bool = moviesWatched.find(movie => Number(movie.id) === id);

      if (bool) {
        removeMovie({
          variables: { id, type: "moviesWatched" },
          optimisticResponse: {
            __typename: "Mutation",
            removeMovie: {
              id,
              title,
              poster_path,
              type: "moviesWatched",
              __typename: "Movie"
            }
          }
        });
      }

      !myMovies.find(movie => Number(movie.id) === id)
        ? saveMovie({
            variables: {
              id,
              title,
              poster_path,
              type: "myMovies"
            },
            optimisticResponse: {
              __typename: "Mutation",
              saveMovie: {
                id,
                title,
                poster_path,
                type: "myMovies",
                __typename: "Movie"
              }
            }
          })
        : removeMovie({
            variables: { id, type: "myMovies" },
            optimisticResponse: {
              __typename: "Mutation",
              removeMovie: {
                id,
                title,
                poster_path,
                type: "myMovies",
                __typename: "Movie"
              }
            }
          });
    },

    assistedMovie: ({
      saveMovie,
      removeMovie,
      QUERY_MY_MOVIES: { myMovies },
      QUERY_WATCHED_MOVIES: { moviesWatched }
    }) => (idMovie, title, poster_path) => {
      const id = Number(idMovie);

      const bool = myMovies.find(movie => Number(movie.id) === Number(id));

      if (bool) {
        removeMovie({
          variables: { id, type: "myMovies" },
          optimisticResponse: {
            __typename: "Mutation",
            removeMovie: {
              id,
              title,
              poster_path,
              type: "myMovies",
              __typename: "Movie"
            }
          }
        });
      }

      !moviesWatched.find(movie => Number(movie.id) === id)
        ? saveMovie({
            variables: {
              id,
              title,
              poster_path,
              type: "moviesWatched"
            },
            optimisticResponse: {
              __typename: "Mutation",
              saveMovie: {
                id,
                title,
                poster_path,
                type: "moviesWatched",
                __typename: "Movie"
              }
            }
          })
        : removeMovie({
            variables: { id, type: "moviesWatched" },
            optimisticResponse: {
              __typename: "Mutation",
              removeMovie: {
                id,
                title,
                poster_path,
                type: "moviesWatched",
                __typename: "Movie"
              }
            }
          });
    },

    boolStyleMyMovie: ({ QUERY_MY_MOVIES: { myMovies, loading } }) => id => {
      return loading
        ? null
        : myMovies.find(movie => Number(movie.id) === Number(id));
    },

    boolStyleWatched: ({
      QUERY_WATCHED_MOVIES: { moviesWatched, loading }
    }) => id => {
      return loading
        ? null
        : moviesWatched.find(movie => Number(movie.id) === Number(id));
    }
  })
);
