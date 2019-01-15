import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const mapStateToProps = ({ Movies }) => ({
  Movies
});

const QuerySearchOnHigh = gql`
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

export class MostWatchedConnection extends Component {
  state = {
    page: 1
  };

  LoadMoreMovie = (index, fetchMore) => {
    const { page } = this.state;
    const primaryReleaseYear = new Date().getFullYear();
    console.log(primaryReleaseYear);
    this.setState(
      prev => ({ page: prev.page + 1 }),
      () => {
        fetchMore({
          variables: {
            page,
            sortBy: "revenue.desc",
            primaryReleaseYear: 2010,
            voteCountGte: 9
          },

          updateQuery: (prev, { fetchMoreResult }) => {
            return Object.assign({}, prev, {
              searchOnHigh: {
                movies: [
                  ...prev.searchOnHigh.movies,
                  ...fetchMoreResult.searchOnHigh.movies
                ],
                pageInfo: fetchMoreResult.searchOnHigh.pageInfo,
                __typename: prev.searchOnHigh.__typename
              }
            });

          }
        });
      }
    );
  };

  render() {
    const { page } = this.state;
    const Print = movies => {
      if (movies === undefined || movies.movies.movies === undefined) {
        return null;
      }

      return movies.movies.movies.map(i => <li key={i.id}>{i.title}</li>);
    };

    return (
      <Fragment>
        <Query
          query={QuerySearchOnHigh}
          variables={{
            page: 1,
            sortBy: "revenue.desc",
            primaryReleaseYear: 2018,
            voteCountGte: 8
          }}
          fetchPolicy="cache-and-network"
        >
          {({ data: { searchOnHigh }, fetchMore, loading }) => {
            return (
              <div>
                <Print movies={searchOnHigh || []} />
                {loading ? "procurando..." : null}

                <button onClick={() => this.LoadMoreMovie(page, fetchMore)}>
                  Carregar mais
                </button>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export const MostWatched = compose(connect(mapStateToProps))(
  MostWatchedConnection
);
