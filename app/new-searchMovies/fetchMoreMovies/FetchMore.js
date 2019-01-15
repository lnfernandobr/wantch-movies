import { Component } from "react";
import React from "react";
import { Loading } from "../../../infra/ui/components/loading";

export class FetchMovies extends Component {
  state = {
    loading: false,
    page: 0,
    pageInfo: 1
  };

  onFetchMore = () => {
    const { fetchMore } = this.props.data;

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
                searchMovies: { movies, pageInfo }
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

    console.log(this.props);
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
