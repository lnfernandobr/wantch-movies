import React, { Component, Fragment } from "react";
import { QUERY_MOVIES_API } from "../../api/query/querys";
import { queryFilterMovies } from "../../api/query/querys";
import { enhanceFetchMore } from "./FetchMoreContainer";
import { PrintMovies } from "../../infra/ui/components/PrintMovies";
import { connect } from "react-redux";
import { enhance } from "../../api/methodsMovie";
import { Query } from "react-apollo";
import { compose } from "recompose";
import { Loading } from "../../infra/ui/components/loading";

import {
  hiddenAboutIconAction,
  rowStateAction,
  widthStateAction
} from "../../infra/redux/actions/actions";

class ComponentConnect extends Component {
  state = {
    page: 1,
    pageSearch: 1
  };

  componentDidMount() {
    this.props.hiddenAboutIconAction(false);
  }

  fetchSearchMovies = (searchMovie, fetchMore) => {
    this.setState(
      prev => ({ pageSearch: prev.pageSearch + 1 }),
      () =>
        this.props.fetchMoreSearchMovies(
          fetchMore,
          searchMovie,
          this.state.pageSearch
        )
    );
  };

  fetchMoreMovies = (sortBy, primaryReleaseYear, voteCountGte, fetchMore) => {
    this.setState(
      prev => ({ page: prev.page + 1 }),
      () => {
        this.props.fetchMore(
          this.state.page,
          sortBy,
          primaryReleaseYear,
          voteCountGte,
          fetchMore
        );
      }
    );
  };

  render() {
    const ButtonMoreMovie = ({
      loading,
      fetchMore,
      fnFetch,
      params,
      pageInfo,
      page
    }) => {
      return loading ? (
        <Loading />
      ) : (
        <div className="btn-box">
          {page > pageInfo ? (
            <h1>Acabaram os filmes dessa seção</h1>
          ) : (
            <button
              className="search-movies"
              onClick={() => fnFetch(...params, fetchMore)}
            >
              MOSTRAR MAIS
            </button>
          )}
        </div>
      );
    };

    const {
      page,
      sortBy,
      primaryReleaseYear,
      voteCountGte,
      widthState,
      searchMovie,
      rowState
    } = this.props;

    if (searchMovie) {
      return (
        <Query
          query={QUERY_MOVIES_API}
          variables={{ query: searchMovie, page: 1 }}
          fetchPolicy="cache-and-network"
        >
          {({ data: { moviesAPI }, loading, fetchMore }) => {
            const movies = moviesAPI === undefined ? null : moviesAPI.movies;

            const pageInfo =
              moviesAPI === undefined ? null : moviesAPI.pageInfo;

            return widthState > 830 && rowState ? (
              <Fragment>
                <PrintMovies movies={movies} type="table" />
                <ButtonMoreMovie
                  loading={loading}
                  page={this.state.pageSearch}
                  pageInfo={pageInfo}
                  fetchMore={fetchMore}
                  fnFetch={this.fetchSearchMovies}
                  params={[searchMovie]}
                />
              </Fragment>
            ) : (
              <Fragment>
                <PrintMovies movies={movies} type="flex" />
                <ButtonMoreMovie
                  loading={loading}
                  page={this.state.pageSearch}
                  pageInfo={pageInfo}
                  fetchMore={fetchMore}
                  fnFetch={this.fetchSearchMovies}
                  params={[searchMovie]}
                />
              </Fragment>
            );
          }}
        </Query>
      );
    }

    return (
      <div>
        <Query
          query={queryFilterMovies}
          variables={{
            page,
            sortBy,
            primaryReleaseYear,
            voteCountGte
          }}
          fetchPolicy="cache-and-network"
        >
          {({ data: { queryFilterMovies }, fetchMore, loading }) => {
            const movies =
              queryFilterMovies === undefined ? null : queryFilterMovies.movies;

            const pageInfo =
              queryFilterMovies === undefined
                ? null
                : queryFilterMovies.pageInfo;

            return widthState > 830 && rowState ? (
              <Fragment>
                <PrintMovies movies={movies} type="table" />
                <ButtonMoreMovie
                  loading={loading}
                  fetchMore={fetchMore}
                  pageInfo={pageInfo}
                  page={this.state.page}
                  fnFetch={this.fetchMoreMovies}
                  params={["revenue.desc", 2018, 7]}
                />
              </Fragment>
            ) : (
              <Fragment>
                <PrintMovies movies={movies} type="flex" />
                <ButtonMoreMovie
                  loading={loading}
                  fetchMore={fetchMore}
                  pageInfo={pageInfo}
                  page={this.state.page}
                  fnFetch={this.fetchMoreMovies}
                  params={["revenue.desc", 2018, 7]}
                />
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = ({
  rowState,
  widthState,
  stateFilter,
  genre,
  searchMovie,
  showFilter
}) => {
  return {
    rowState,
    widthState,
    stateFilter,
    searchMovie,
    genre,
    showFilter
  };
};

const mapDispatchToProps = dispatch => ({
  rowStateAction: () => dispatch(rowStateAction()),
  widthStateAction: value => dispatch(widthStateAction(value)),
  hiddenAboutIconAction: state => dispatch(hiddenAboutIconAction(state))
});

export const ComponentMovie = compose(
  enhanceFetchMore,
  enhance,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ComponentConnect);
