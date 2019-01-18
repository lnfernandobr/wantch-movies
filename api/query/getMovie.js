import { QUERY_MOVIE } from "./querys";
import { graphql } from "react-apollo";

export const getMovie = graphql(QUERY_MOVIE, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id.toString()
      }
    };
  },
  name: "GET_MOVIE"
});
