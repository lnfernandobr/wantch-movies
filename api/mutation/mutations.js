import gql from "graphql-tag";

export const REMOVE_MOVIE_MUTATION = gql`
  mutation removeMovie($id: Int, $type: String) {
    removeMovie(id: $id, type: $type) {
      id
      title
      poster_path
      type
      __typename
    }
  }
`;



export const SAVE_MOVIE_MUTATION = gql`
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
`;
