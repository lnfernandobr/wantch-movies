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

export const QuerySearchOnHigh = gql`
  query searchOnHigh(
    $page: Int
    $sortBy: String
    $primaryReleaseYear: Int
    $voteCountGte: Int
  ) {
    searchOnHigh(
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


export const queryFilterMovies = gql`
    query queryFilterMovies(
    $page: Int
    $sortBy: String
    $primaryReleaseYear: Int
    $voteCountGte: Int
    ) {
        queryFilterMovies(
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
