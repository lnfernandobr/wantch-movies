import gql from "graphql-tag";

// ano - nota - regiao
// release_date vote_average  original_language

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
    $release_date: String
    $vote_average: String
    $original_language: String
  ) {
    saveMovie(
      id: $id
      title: $title
      poster_path: $poster_path
      type: $type
      release_date: $release_date
      vote_average: $vote_average
      original_language: $original_language
    ) {
      id
      title
      poster_path
      vote_average
      release_date
      original_language
      type
      __typename
    }
  }
`;
