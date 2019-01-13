import React, { Component, Fragment } from "react";
import { ApolloConsumer } from "react-apollo";
import { SearchEnhancedMovies } from "./newSearchMoviesContainer";
import { MoviePoster } from "../../infra/ui/components/MoviePoster";

const WithApolloClient = () => (
  <ApolloConsumer>
    {client => <SearchEnhancedMovies client={client} />}
  </ApolloConsumer>
);

export class NewSearchMovies extends Component {
  render() {
    const {
      Movies,
      saveMovie,
      assistedMovie,
      boolStyleMyMovie,
      boolStyleWatched
    } = this.props;

    return (
      <Fragment>
        <WithApolloClient />
        <div className="container-movies">
          {Movies.map(movie => (
            <div className="movie-container" key={movie.id}>
              <div style={{ position: "relative" }}>
                <MoviePoster movie={movie} />

                <div>
                  <button
                    onClick={() => {
                      saveMovie(
                        Number(movie.id),
                        movie.title,
                        movie.poster_path
                      );
                    }}
                    style={
                      boolStyleMyMovie(movie.id)
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "#333" }
                    }
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() =>
                      assistedMovie(
                        Number(movie.id),
                        movie.title,
                        movie.poster_path
                      )
                    }
                    style={
                      boolStyleWatched(movie.id)
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "#333" }
                    }
                  >
                    Já Assisti
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}
