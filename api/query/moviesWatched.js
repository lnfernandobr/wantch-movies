import { QUERY_WATCHED_MOVIES } from "./querys";
import { graphql } from "react-apollo";

export const QueryMyMoviesWatched = graphql(QUERY_WATCHED_MOVIES, {
  name: "QUERY_WATCHED_MOVIES"
});
