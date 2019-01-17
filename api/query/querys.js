import gql from "graphql-tag";

export const QUERY_MY_MOVIES = gql`
  query {
    myMovies {
      id
      poster_path
      title
    }
  }
`;

export const QUERY_WATCHED_MOVIES = gql`
  query {
    moviesWatched {
      id
      poster_path
      title
    }
  }
`;

// export const QuerySearchOnHigh = gql`
//   query searchOnHigh(
//     $page: Int
//     $sortBy: String
//     $primaryReleaseYear: Int
//     $voteCountGte: Int
//   ) {
//     searchOnHigh(
//       page: $page
//       sortBy: $sortBy
//       primaryReleaseYear: $primaryReleaseYear
//       voteCountGte: $voteCountGte
//     ) {
//       movies {
//         id
//         title
//         poster_path
//         __typename
//       }
//       pageInfo
//       __typename
//     }
//   }
// `;

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
        vote_average
        release_date  
        original_language
        poster_path
        __typename
      }
      pageInfo
      __typename
    }
  }
`;

export const QUERY_USER = gql`
    query {
        user {
            _id
            name
            totalMoviesAssisted
            moviesSave
        }
    }
`;
