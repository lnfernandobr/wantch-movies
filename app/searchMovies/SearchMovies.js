import React, { Component } from "react";
import PropTypes from "prop-types";
import { ApolloConsumer, Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { MovieTable } from "../../infra/ui/components/MovieTable";
import { QUERY_MOVIES_API } from "../../api/Query";
import { Loading } from "../../infra/ui/components/loading";
import { MoviePoster } from "../../infra/ui/components/MoviePoster";
import { filterMovies } from "../../api/moviesHelpers";
import { Genre } from "../../infra/ui/components/Genre";
import { ConsumerSearchGenre, ConsumerSearchType } from "./SearchMovieConsumer";


const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  table: {
    minWidth: 700,
    opacity: "0.4"
  },
  itemTable: {
    textAlign: "center",
    borderBottom: "1px solid  rgba(255, 255, 255, 0.3)",
    fontFamily: "'Fjalla One', sans-serif",
    color: "white"
  },
  h5: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "50px"
  }
};

class SearchMovies extends Component {
  componentDidMount() {
    this.props.hiddenIconsAction(false);
    this.props.hiddenAboutIconAction(false);
  }

  render() {
    let {
      QUERY_MY_MOVIES: { myMovies, loading: loadingOne },
      QUERY_WATCHED_MOVIES: { moviesWatched, loading: loadingTwo },
      saveMovie,
      saveWatchedMovie,
      methodMovie,
      removeMovie,
      removeWatchedMovie,
      classes,
      discover,
      widthState,
      changeGenreState,
      setGenreState,
      genreState,
      changeDiscover,
      rowState,
      select,
      changeSelect,
      stateFilter,
      genreAction,
      genre,
      showFilter
    } = this.props;

    const { searchMovie } = this.props;

    return (
      <div className={classes.main}>
        {showFilter ? (
          <div>
            {stateFilter ? (
              <div className="box-filter-input-select">
                <ApolloConsumer>
                  {client => (
                    <ConsumerSearchType
                      client={client}
                      select={select}
                      changeSelect={changeSelect}
                      changeDiscover={changeDiscover}
                    />
                  )}
                </ApolloConsumer>
              </div>
            ) : (
              <div className="container-filter">
                <ApolloConsumer>
                  {client => (
                    <div className={"ConsumerSearchGenre"}>
                      <Genre
                        changeGenre={genreAction}
                        genre={genre}
                        setGenreState={setGenreState}
                        genreState={genreState}
                        changeGenreState={changeGenreState}
                      />

                      <ConsumerSearchGenre
                        client={client}
                        genre={genre.toString()}
                        changeDiscover={changeDiscover}
                        discover={discover}
                      />
                    </div>
                  )}
                </ApolloConsumer>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        <div className={classes.container}>
          <Query query={QUERY_MOVIES_API} variables={{ query: searchMovie }}>
            {({ loading, data }) => {
              if (loading || loadingOne || loadingTwo) {
                return <Loading />;
              }

              let movies = !searchMovie ? discover : data.moviesAPI;
              if (movies[0] === undefined) movies = data.moviesAPI;

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

              const styleWatched = idMovie => {
                return filterMovies(idMovie, moviesWatched)
                  ? { color: "#368338" }
                  : { color: "white" };
              };
              const styleMyMovie = idMovie => {
                return filterMovies(idMovie, myMovies)
                  ? { color: "#368338" }
                  : { color: "white" };
              };

              if (movies[0] === undefined) {
                return (
                  <h1>
                    Sorry Man, não foi encontrado nenhum filme, tente mudar a
                    busca!! :)
                  </h1>
                );
              }

              // TODO removi classes
              if (widthState > 830 && rowState) {
                return (
                  <MovieTable
                    movies={movies}
                    styleWatched={styleWatched}
                    styleMyMovie={styleMyMovie}
                    movieAdd={movieAdd}
                    movieAssisted={movieAssisted}
                  />
                );
              }

              return (
                <div>
                  <div className="container-movies">
                    {movies.map(movie => (
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
                              <i
                                style={styleMyMovie(movie.id)}
                                className="material-icons"
                              >
                                add_circle
                              </i>
                            </button>

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
                              <i
                                style={styleWatched(movie.id)}
                                className="material-icons"
                                id="check_circle"
                              >
                                check_circle
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

SearchMovies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchMovies);
