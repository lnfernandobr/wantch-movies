import React, { Component } from "react";
import { Loading } from "../../infra/ui/components/loading";
import { getImageUrl, getPoster } from "../../api/moviesHelpers";
import YouTube from "react-youtube";
import { filterMovies } from "../../api/moviesHelpers";

const numberToReal = number => {
  const newNumber = number.toFixed(2).split(".");
  newNumber[0] = "R$ " + newNumber[0].split(/(?=(?:...)*$)/).join(".");
  return newNumber.join(",");
};

export class AboutMovie extends Component {
  componentDidMount() {
    this.props.hiddenAboutIconAction(true);
  }

  componentWillMount() {
    this.props.genreResetAction();
  }

  render() {
    const {
      QUERY_MY_MOVIES: { myMovies, loading: loadingOne },
      QUERY_WATCHED_MOVIES: { moviesWatched, loading: loadingTwo },
      GET_MOVIE: { movie, loading: loadingThree },
      saveMovie,
      removeMovie,
      removeWatchedMovie,
      saveWatchedMovie,
      seeOverview,
      toggleOverview,
      methodMovie
    } = this.props;

    if (loadingOne || loadingTwo || loadingThree) {
      return <Loading />;
    }

    const opts = {
      playerVars: {
        autoplay: 0
      }
    };

    const {
      release_date,
      id: _id,
      overview,
      original_language,
      poster_path,
      vote_average,
      title,
      runtime,
      budget,
      backdrop_path: PosterPath,
      video
    } = movie;

    const movieAdd = async (idMovie, title, poster_path) => {
      const id = Number(idMovie);

      if (!filterMovies(id, myMovies)) {
        moviesWatched.find(movie => Number(movie.id) === Number(id))
          ? await methodMovie({ id, title, poster_path }, removeWatchedMovie)
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
        ? { backgroundColor: "green" }
        : { color: "white" };
    };
    const styleMyMovie = idMovie => {
      return filterMovies(idMovie, myMovies)
        ? { backgroundColor: "green" }
        : { color: "white" };
    };

    return (
      <div
        style={{
          backgroundColor: "#0C1117",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          className="movie"
          key={_id}
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent -260%, #0C1117 100%), url(${getPoster(
              PosterPath
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh"
          }}
        >
          <h1 style={{ color: "white", paddingBottom: "100px" }}>
            {`${title} (${release_date.slice(0, 4)})`}
          </h1>

          <div className="container-about-movie">
            <div className="movie-description">
              <div className="imgCont">
                <div className="box-img">
                  <div className="imgMovie">
                    <img src={getImageUrl(poster_path)} alt="poster" />
                  </div>
                </div>

                <div className="sinopse">
                  <div className="button-overview">
                    <div className="controllers-movieInfo">
                      <button
                        onClick={() =>
                          movieAdd(movie.id, movie.title, movie.poster_path)
                        }
                        style={styleMyMovie(movie.id)}
                        className="btn-about"
                      >
                        <i className="material-icons">add</i>
                        Quero ver
                      </button>
                      <button
                        className="btn-about"
                        style={styleWatched(movie.id)}
                        onClick={() =>
                          movieAssisted(
                            movie.id,
                            movie.title,
                            movie.poster_path
                          )
                        }
                      >
                        <i className="material-icons">check</i>
                        Marcar como visto
                      </button>
                    </div>

                    <div className="details-movie">
                      <span>{runtime} Minutos </span>
                      <span> Idioma: {original_language.toUpperCase()}</span>
                      <span>Investimento: {numberToReal(+budget)}</span>

                      <span>
                        Generos: Ação, Ficção Cientifica, Comédia, Aventura
                      </span>
                      <span>Media Geral: {vote_average}</span>
                    </div>
                  </div>
                  <hr />
                  <div
                    style={{
                      marginBottom: "20px",
                      marginTop: "25px",
                      minHeight: "250px"
                    }}
                  >
                    {seeOverview ? overview : overview.slice(0, 150) + "..."}
                    <button className="btn-about" onClick={toggleOverview}>
                      Ler Mais
                      {seeOverview ? (
                        <i className="material-icons">expand_less</i>
                      ) : (
                        <i className="material-icons">expand_more</i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="trailler">
                  <h1>Trailer</h1>
                  <YouTube videoId={video} opts={opts} className="video-yt" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
