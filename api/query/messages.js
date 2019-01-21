import { QUERY_GET_MESSAGES } from "./querys";
import { graphql } from "react-apollo";

export const getMessages = graphql(QUERY_GET_MESSAGES, {
  options: props => {
    return {
      variables: {
        _id: props.match.params.id.toString()
      }
    };
  },
  name: "getMessages"
});
