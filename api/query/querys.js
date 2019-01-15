import gql from "graphql-tag";

export const QUERY_MY_MOVIES = gql`
  query {
    myMovies {
      id
    }
  }
`;

export const QUERY_WATCHED_MOVIES = gql`
  query {
    moviesWatched {
      id
      title
      poster_path
    }
  }
`;

export const QUERY_SEARCH_MOVIES = gql`
  query searchFilterMovies(
    $page: Int
    $sortBy: String
    $primaryReleaseYear: Int
    $voteCountGte: Int
  ) {
    searchFilterMovies(
      page: $page
      sortBy: $sortBy
      primaryReleaseYear: $primaryReleaseYear
      voteCountGte: $voteCountGte
    ) {
      movies {
        id
        title
        poster_path
          __typename
      }
      pageInfo
      __typename
    }
  }
`;
