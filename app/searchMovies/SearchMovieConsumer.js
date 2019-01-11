import { Component } from "react";
import {
  QUERY_MOVIES_DISCOVER,
  QUERY_MOVIES_DISCOVER_TYPE
} from "../../api/Query";
import { TypesSearch } from "../../data/moviesConstants";
import React from "react";

const Loading = () => (
  <h1 style={{ fontFamily: "Roboto", marginBottom: "35px", marginTop: "35px" }}>
    procurando filmes, pera ae
  </h1>
);

export class ConsumerSearchGenre extends Component {
  state = {
    loading: false
  };

  QueryGenreMovie = async () => {
    this.setState({ loading: true });

    const { data } = await this.props.client.query({
      query: QUERY_MOVIES_DISCOVER,
      variables: { genre: this.props.genre }
    });
    this.setState({ loading: false });

    this.props.changeDiscover(data.moviesGenre);
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <button className="btn-genre" onClick={this.QueryGenreMovie}>
        Buscar
      </button>
    );
  }
}

export class ConsumerSearchType extends Component {
  state = {
    loading: false
  };

  QueryTypeMovie = async (type, index) => {
    this.props.changeSelect(index);
    this.setState({ loading: true });

    const { data } = await this.props.client.query({
      query: QUERY_MOVIES_DISCOVER_TYPE,
      variables: { type: type }
    });

    this.setState({ loading: false });
    this.props.changeDiscover(data.moviesType);
  };

  render() {
    if (this.state.loading) {
      if (this.state.loading) {
        return <Loading />;
      }
    }

    return (
      <div className="container-controllers-movie-select">
        {TypesSearch.map(({ name, type }, index) => (
          <button
            onClick={() => this.QueryTypeMovie(type, index)}
            key={index}
            className="checkbox_item"
            style={
              this.props.select[index]
                ? { backgroundColor: "#368338" }
                : { backgroundColor: "#5E5E5E" }
            }
          >
            {name}
          </button>
        ))}
      </div>
    );
  }
}
