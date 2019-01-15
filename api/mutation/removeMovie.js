import { graphql } from "react-apollo";
import { QUERY_MY_MOVIES, QUERY_WATCHED_MOVIES } from "../query/querys";
import { REMOVE_MOVIE_MUTATION } from "./mutations";

export const removeMovie = graphql(
  REMOVE_MOVIE_MUTATION,

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
        } else {
          const obj = proxy.readQuery({ query: QUERY_WATCHED_MOVIES });
          const data = {};
          data.moviesWatched = obj.moviesWatched.filter(
            movie => Number(movie.id) !== Number(removeMovie.id)
          );

          // 7ceaafc
          proxy.writeQuery({ query: QUERY_WATCHED_MOVIES, data });
        }
      }
    }
  }
);
