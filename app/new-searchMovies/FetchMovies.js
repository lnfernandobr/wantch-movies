import { Component } from "react";
import { Loading } from "../../infra/ui/components/loading";
import React from "react";

export class FetchMovies extends Component {
  state = {
    loading: false,
    page: 0,
    pageInfo: 0
  };

  onFetchMore = () => {
    const { fetchMore } = this.props.data;
    this.setState({ loading: true });
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        console.log("PAGE", this.state.page);



        fetchMore({
          variables: {
            page: this.state.page
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            console.log(fetchMoreResult.searchMovies.movies);
            this.props.setMoviesAction(fetchMoreResult.searchMovies.movies);

            this.setState({
              loading: false,
              pageInfo: fetchMoreResult.searchMovies.pageInfo
            });
          }
        });
      }
    );
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="container-btn-search-movies">
        <button className="search-movies" onClick={this.onFetchMore}>
          {this.state.page === 0 ? "PROCURAR FILMES" : "MOSTRAR MAIS"}
        </button>
      </div>
    );
  }
}
