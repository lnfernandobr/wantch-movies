import { Component } from "react";
import React from "react";
import { Loading } from "../../../infra/ui/components/loading";
import { setMoviesAction } from "../../../infra/redux/actions/actions";
import { compose } from "recompose";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { QUERY_SEARCH_MOVIES } from "../../../api/query/querys";

class FetchMoreMovieConnect extends Component {
  state = {
    loading: false,
    page: 0,
    pageInfo: 2
  };

  onFetchMore = () => {
    const { fetchMore } = this.props.data;
    console.log(this.props);

    this.setState({ loading: true });
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        fetchMore({
          variables: {
            page: this.state.page
          },
          updateQuery: (
            previousResult,
            {
              fetchMoreResult: {
                searchFilterMovies: { movies, pageInfo }
              }
            }
          ) => {
            this.props.setMoviesAction(movies);
            this.setState({
              loading: false,
              pageInfo
            });
          }
        });
      }
    );
  };

  render() {
    const { loading, page, pageInfo } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="container-btn-search-movies">
        {page > pageInfo ? (
          <h1>Acabaram os filmes dessa seção</h1>
        ) : (
          <button className="search-movies" onClick={this.onFetchMore}>
            {page === 0 ? "PROCURAR FILMES" : "MOSTRAR MAIS"}
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setMoviesAction: movies => dispatch(setMoviesAction(movies))
});
export const FetchMoreMovie = compose(
  connect(
    null,
    mapDispatchToProps
  ),

  graphql(QUERY_SEARCH_MOVIES, {
    options: {
      variables: {
        page: 1
      }
    }
  })
)(FetchMoreMovieConnect);
