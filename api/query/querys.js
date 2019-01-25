import gql from "graphql-tag";

export const QUERY_MY_MOVIES = gql`
  query {
    myMovies {
      id
      poster_path
      title
      vote_average
      release_date
      original_language
    }
  }
`;

export const QUERY_WATCHED_MOVIES = gql`
  query {
    moviesWatched {
      id
      poster_path
      title
      vote_average
      release_date
      original_language
    }
  }
`;

export const QUERY_MOVIE = gql`
  query movie($id: String) {
    movie(id: $id) {
      id
      title
      poster_path
      vote_count
      popularity
      overview
      homepage
      original_language
      vote_average
      release_date
      backdrop_path
      runtime
      budget
      video
      genres {
        name
      }
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
        vote_average
        release_date
        original_language
        poster_path
        vote_average
        release_date
        original_language
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

export const QUERY_MOVIES_API = gql`
  query moviesAPI($query: String!, $page: Int) {
    moviesAPI(query: $query, page: $page) {
      movies {
        poster_path
        title
        original_language
        vote_average
        id
        release_date
      }
      pageInfo
    }
  }
`;

export const QUERY_GET_MESSAGES = gql`
  query getMessages($_id: String) {
    getMessages(_id: $_id) {
      messages {
        message
        id
      }
    }
  }
`;
