import gql from "graphql-tag";

export const MUTATION_SAVE_MOVIE = gql`
  mutation saveMovie($id: Int, $title: String!, $poster_path: String) {
    saveMovie(id: $id, title: $title, poster_path: $poster_path) {
      id
      title
      poster_path
    }
  }
`;

export const MUTATION_REMOVE_MOVIE = gql`
  mutation removeMovie($id: Int) {
    removeMovie(id: $id) {
      id
    }
  }
`;

export const MUTATION_SAVE_WATCHED_MOVIE = gql`
  mutation saveWatchedMovie($id: Int, $title: String!, $poster_path: String) {
    saveWatchedMovie(id: $id, title: $title, poster_path: $poster_path) {
      id
      title
      poster_path
    }
  }
`;

export const MUTATION_REMOVE_WATCHED_MOVIE = gql`
  mutation removeWatchedMovie($id: Int, $title: String!, $poster_path: String) {
    removeWatchedMovie(id: $id, title: $title, poster_path: $poster_path) {
      id
      title
      poster_path
    }
  }
`;
