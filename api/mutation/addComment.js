import { ADD_COMMENT_MUTATION } from "./mutations";
import { graphql } from "react-apollo";
import { QUERY_GET_MESSAGES, QUERY_USER } from "../query/querys";

export const addComment = graphql(
  ADD_COMMENT_MUTATION,

  {
    name: "addComment",
    options: props => {
      return {
        // update: (proxy, { data: { addComment } }) => {
        //   console.log(addComment);
        //
        //   proxy.writeQuery({
        //     query: QUERY_GET_MESSAGES,
        //     variables: { _id: props.match.params.id },
        //     data: addComment
        //   });
        // }

        refetchQueries: [
          {
            query: QUERY_GET_MESSAGES,
            variables: {
              _id: props.match.params.id
            }
          }
        ]
      };
    }
  }
);
