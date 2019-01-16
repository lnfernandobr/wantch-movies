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

export const QUERY_MOVIES_API = gql`
  query moviesAPI($query: String!, $page: Int) {
    moviesAPI(query: $query, page: $page) {
      movies {
        _id
        poster_path
        title
        vote_count
        popularity
        overview
        original_language
        vote_average
        id
        release_date
      }
      pageInfo
    }
  }
`;

export const QUERY_MOVIES_DISCOVER = gql`
  query moviesGenre($genre: String) {
    moviesGenre(genre: $genre) {
      poster_path
      title
      original_language
      vote_average
      id
      release_date
    }
  }
`;

export const QUERY_MOVIES_DISCOVER_TYPE = gql`
  query moviesType($type: String, $page: Int) {
    moviesType(type: $type, page: $page) {
      poster_path
      title
      original_language
      vote_average
      id
      release_date
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
    }
  }
`;
