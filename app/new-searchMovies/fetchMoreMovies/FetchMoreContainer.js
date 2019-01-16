import { compose, withHandlers } from "recompose";

export const enhanceFetchMore = compose(
  withHandlers({
    fetchMore: () => (
      page,
      sortBy,
      primaryReleaseYear,
      voteCountGte,
      fetchMore
    ) => {
      console.log(page, sortBy, primaryReleaseYear, voteCountGte);
      fetchMore({
        variables: {
          page,
          sortBy,
          primaryReleaseYear,
          voteCountGte
        },

        updateQuery: (prev, { fetchMoreResult }) => {
          return Object.assign({}, prev, {
            queryFilterMovies: {
              movies: [
                ...prev.queryFilterMovies.movies,
                ...fetchMoreResult.queryFilterMovies.movies
              ],
              pageInfo: fetchMoreResult.queryFilterMovies.pageInfo,
              __typename: prev.queryFilterMovies.__typename
            }
          });
        }
      });
    },

    fetchMoreSearchMovies: () => (fetchMore, searchMovie, pageSearch) => {
      console.log(searchMovie , pageSearch);

      fetchMore({
        variables: {
          query: searchMovie,
          page: pageSearch
        },

        updateQuery: (prev, { fetchMoreResult }) => {
          return Object.assign({}, prev, {
            moviesAPI: {
              movies: [
                ...prev.moviesAPI.movies,
                ...fetchMoreResult.moviesAPI.movies
              ],
              pageInfo: fetchMoreResult.moviesAPI.pageInfo,
              __typename: prev.moviesAPI.__typename
            }
          });
        }
      });
    }
  })
);
