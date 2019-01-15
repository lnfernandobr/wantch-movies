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
    }
  })
);
