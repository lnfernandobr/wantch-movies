import { QUERY_MY_MOVIES } from "./querys";
import { graphql } from "react-apollo";

export const QueryMyMovies = graphql(QUERY_MY_MOVIES, {
  name: "QUERY_MY_MOVIES"
});
