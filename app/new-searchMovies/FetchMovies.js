import { Component } from "react";
import { Loading } from "../../infra/ui/components/loading";
import React from "react";
import gql from "graphql-tag";

const QUERY_SEARCH_MOVIES = gql`
  query {
    searchMovies {
      id
      title
      poster_path
    }
  }
`;

export class FetchMovies extends Component {
  state = {
    loading: false
  };

  queryMovie = async () => {
    this.setState({ loading: true });

    const { data } = await this.props.client.query({
      query: QUERY_SEARCH_MOVIES
    });

    this.setState({ movies: data.searchMovies, loading: false });
    this.props.setMoviesAction(data.searchMovies);
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <button onClick={this.queryMovie}>Fetch</button>
      </div>
    );
  }
}
