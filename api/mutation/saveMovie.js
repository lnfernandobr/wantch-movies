import { graphql } from "react-apollo";
import { QUERY_MY_MOVIES, QUERY_WATCHED_MOVIES } from "../Query";
import { SAVE_MOVIE_MUTATION } from "./mutations";

export const saveMovie = graphql(
  SAVE_MOVIE_MUTATION,

  {
    name: "saveMovie",
    options: {
      update: (proxy, { data: { saveMovie } }) => {
        if (saveMovie.type === "myMovies") {
          const data = proxy.readQuery({ query: QUERY_MY_MOVIES });
          data.myMovies.push(saveMovie);
          proxy.writeQuery({ query: QUERY_MY_MOVIES, data });
        } else {
          const data = proxy.readQuery({ query: QUERY_WATCHED_MOVIES });
          data.moviesWatched.push(saveMovie);
          proxy.writeQuery({ query: QUERY_WATCHED_MOVIES, data });
        }
      }
    }
  }
);
