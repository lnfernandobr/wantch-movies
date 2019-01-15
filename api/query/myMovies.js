import { graphql } from "react-apollo";
import { QUERY_MY_MOVIES } from "./querys";

export const QueryMyMovies = graphql(QUERY_MY_MOVIES, {
  name: "QUERY_MY_MOVIES"
});
