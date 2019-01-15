import { graphql } from "react-apollo";
import { QUERY_WATCHED_MOVIES } from "./querys";

export const QueryMyMoviesWatched = graphql(QUERY_WATCHED_MOVIES, {
  name: "QUERY_WATCHED_MOVIES"
});
