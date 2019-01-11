import React, { Component } from "react";
import { MoviePoster } from "../../infra/ui/components/MoviePoster";
import { Query } from "react-apollo";
import { Loading } from "../../infra/ui/components/loading";
import gql from "graphql-tag";
import { filterMovies } from "../../api/moviesHelpers";

export const QUERY_MY_MOVIES = gql`
  query {
    myMovies {
      id
      title
      poster_path
    }
  }
`;

export class MyMovies extends Component {

  componentDidMount() {
    this.props.hiddenIconsAction(true);
    this.props.hiddenAboutIconAction(false);
  }

  render() {
    let {
      QUERY_WATCHED_MOVIES: { moviesWatched, loading: loadingTwo },
      saveMovie,
      saveWatchedMovie,
      methodMovie,
      removeMovie,
      removeWatchedMovie,
      searchMovie,
      showMovieWatched
    } = this.props;
    return (
      <div>
        <Query query={QUERY_MY_MOVIES}>
          {({ loading, error, data: { myMovies } }) => {
            const remove = (idMovie, title, poster_path) => {
              const id = Number(idMovie);
              methodMovie({ id, title, poster_path }, removeWatchedMovie);
            };

            const movieAdd = async (idMovie, title, poster_path) => {
              const id = Number(idMovie);

              if (!filterMovies(id, myMovies)) {
                moviesWatched.find(movie => Number(movie.id) === Number(id))
                  ? await methodMovie(
                      { id, title, poster_path },
                      removeWatchedMovie
                    )
                  : "";

                await methodMovie({ id, title, poster_path }, saveMovie);
              } else {
                methodMovie({ id }, removeMovie);
              }
            };

            const movieAssisted = (idMovie, title, poster_path) => {
              const id = Number(idMovie);

              if (!filterMovies(id, moviesWatched)) {
                myMovies.find(movie => Number(movie.id) === Number(id))
                  ? methodMovie({ id }, removeMovie)
                  : "";

                methodMovie({ id, title, poster_path }, saveWatchedMovie);
              } else {
                methodMovie({ id, title, poster_path }, removeWatchedMovie);
              }
            };

            if (loading || loadingTwo) {
              return <Loading />;
            }

            if (showMovieWatched) {
              if (moviesWatched[0] === undefined) {
                return <h1>Ops, você não adicionou nenhum filme assistido</h1>;
              }
              return (
                <div className="container-movies">
                  {moviesWatched
                    .filter(movie =>
                      movie.title
                        .toLowerCase()
                        .includes(searchMovie.toLowerCase())
                    )
                    .map(movie => (
                      <div className="movie-container" key={movie.id}>
                        <div style={{ position: "relative" }}>
                          <MoviePoster movie={movie} />

                          <div className="test-controller">
                            <button
                              className="movie-watched"
                              onClick={() =>
                                movieAdd(
                                  movie.id,
                                  movie.title,
                                  movie.poster_path
                                )
                              }
                            >
                              <i className="material-icons">add_circle</i>
                            </button>

                            <button
                              onClick={() =>
                                remove(movie.id, movie.title, movie.poster_path)
                              }
                              className="movie-watched"
                            >
                              <i className="material-icons" id="check_circle">
                                delete
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              );
            }

            if (!showMovieWatched) {
              if (myMovies[0] === undefined) {
                return (
                  <h1>ai ai, sem filme aqui... Vá em procurar filmes :)</h1>
                );
              }

              return (
                <div className="container-movies">
                  {myMovies
                    .filter(movie =>
                      movie.title
                        .toLowerCase()
                        .includes(searchMovie.toLowerCase())
                    )
                    .map(movie => (
                      <div className="movie-container" key={movie.id}>
                        <div style={{ position: "relative" }}>
                          <MoviePoster movie={movie} />

                          <div className="test-controller">
                            <button
                              onClick={() =>
                                movieAssisted(
                                  movie.id,
                                  movie.title,
                                  movie.poster_path
                                )
                              }
                              className="movie-watched"
                            >
                              <i className="material-icons" id="check_circle">
                                check_circle
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}
