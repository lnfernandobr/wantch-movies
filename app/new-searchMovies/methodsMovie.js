import { compose, withHandlers } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { newSearchMoviesContainer } from "./newSearchMoviesContainer";
import { QUERY_MY_MOVIES, QUERY_WATCHED_MOVIES } from "../../api/Query";

const saveMovie = graphql(
  gql`
    mutation saveMovie(
      $id: Int
      $title: String!
      $poster_path: String
      $type: String
    ) {
      saveMovie(
        id: $id
        title: $title
        poster_path: $poster_path
        type: $type
      ) {
        id
        title
        poster_path
        type
        __typename
      }
    }
  `,

  {
    name: "saveMovie",
    options: {
      update: (proxy, { data: { saveMovie } }) => {
        if (saveMovie.type === "myMovies") {
          const data = proxy.readQuery({ query: QUERY_MY_MOVIES });

          console.log("saveMovie = ", saveMovie);

          data.myMovies.push(saveMovie);

          proxy.writeQuery({ query: QUERY_MY_MOVIES, data });
        } else if (saveMovie.type === "moviesWatched") {
          console.log("type moviesWatched na mutation saveMovie ", saveMovie);

          const data = proxy.readQuery({ query: QUERY_WATCHED_MOVIES });

          data.moviesWatched.push(saveMovie);
          proxy.writeQuery({ query: QUERY_WATCHED_MOVIES, data });
        }
      }
    }
  }
);

export const removeMovie = graphql(
  gql`
    mutation removeMovie($id: Int, $type: String) {
      removeMovie(id: $id, type: $type) {
        id
        title
        poster_path
        type
        __typename
      }
    }
  `,

  {
    name: "removeMovie",
    options: {
      update: (proxy, { data: { removeMovie } }) => {
        if (removeMovie.type === "myMovies") {
          const obj = proxy.readQuery({ query: QUERY_MY_MOVIES });
          const data = {};
          data.myMovies = obj.myMovies.filter(
            movie => Number(movie.id) !== Number(removeMovie.id)
          );
          proxy.writeQuery({ query: QUERY_MY_MOVIES, data });
          console.log("query my movies = ", data);

        } else if (removeMovie.type === "moviesWatched") {
          const obj = proxy.readQuery({ query: QUERY_WATCHED_MOVIES });
          const data = {};

          data.moviesWatched = obj.moviesWatched.filter(
            movie => Number(movie.id) !== Number(removeMovie.id)
          // );7ceaafc

          proxy.writeQuery({ query: QUERY_WATCHED_MOVIES, data });
          console.log("query watched movies = ", data);
        }
      }
    }
  }
);

const QueryMyMovies = graphql(QUERY_MY_MOVIES, { name: "QUERY_MY_MOVIES" });
const QueryMyMoviesWatched = graphql(QUERY_WATCHED_MOVIES, {
  name: "QUERY_WATCHED_MOVIES"
});

const enhance = compose(
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

      if (bool !== undefined) {
        removeMovie({
          variables: { id, type: "moviesWatched" },
          optimisticResponse: {
            __typename: "Mutation",
            removeMovie: {
              id,
              __typename: "Movie",
              type: "moviesWatched"
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
                id: id,
                __typename: "Movie",
                content: id,
                type: "myMovies",
                poster_path,
                title
              }
            }
          })
        : removeMovie({
            variables: { id, type: "myMovies" },
            optimisticResponse: {
              __typename: "Mutation",
              removeMovie: {
                id,
                __typename: "Movie",
                type: "myMovies",
                poster_path,
                title
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

      if (bool !== undefined) {
        removeMovie({
          variables: { id, type: "myMovies" },
          optimisticResponse: {
            __typename: "Mutation",
            removeMovie: {
              id,
              __typename: "Movie",
              title,
              poster_path,
              type: "myMovies"
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
                __typename: "Movie",
                title,
                poster_path,
                type: "moviesWatched"
              }
            }
          })
        : removeMovie({
            variables: { id, type: "moviesWatched" },
            optimisticResponse: {
              __typename: "Mutation",
              removeMovie: {
                id,
                __typename: "Movie",
                type: "moviesWatched"
              }
            }
          });
    },

    boolStyleMyMovie: ({ QUERY_MY_MOVIES: { myMovies } }) => id => {
      return myMovies.find(movie => Number(movie.id) === Number(id));
    },

    boolStyleWatched: ({ QUERY_WATCHED_MOVIES: { moviesWatched } }) => id => {
      return moviesWatched.find(movie => Number(movie.id) === Number(id));
    }
  })
);

export const SearchMovieContainerNEW = enhance(newSearchMoviesContainer);
