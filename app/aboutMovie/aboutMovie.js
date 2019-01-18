import React, { Component } from "react";
import { numberToDolar } from "../../api/moviesHelpers";
import { getImage } from "../../api/moviesHelpers";
import { Loading } from "../../infra/ui/components/loading";
import { Button } from "../../infra/ui/components/Button";
import YouTube from "react-youtube";
import { withStyles } from "@material-ui/core";
import "./aboutMovieStyle.css";

const styles = {
  root: {
    backgroundColor: "#0C1117",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: "white",
    paddingBottom: "100px"
  },
  learnMore: {
    marginBottom: "20px",
    marginTop: "25px",
    minHeight: "30  0px"
  },
  aboutMovies: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: "red"
  }
};

class AboutMovieConnect extends Component {
  componentDidMount() {
    this.props.hiddenAboutIconAction(true);
  }

  render() {
    const {
      GET_MOVIE: { movie, loading },
      seeOverview,
      toggleOverview,
      classes,
      saveMovie,
      assistedMovie,
      boolStyleMyMovie,
      boolStyleWatched
    } = this.props;

    const opts = {
      playerVars: {
        autoplay: 0
      }
    };

    if (loading) {
      return <Loading />;
    }

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
      video,
      genres
    } = movie;

    const poster = getImage(PosterPath, "poster");

    return (
      <div className={classes.root}>
        <div
          className="movie"
          key={_id}
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent -260%, #0C1117 100%), url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh"
          }}
        >
          <div className="container-description">
            <div className="container-img-title">
              <h1>{`${title} (${release_date.slice(0, 4)})`}</h1>
              <div className="imgMovie">
                <img src={getImage(poster_path)} alt="poster" />
              </div>
            </div>

            <div className={"container-details"}>
              <div className="description-movie">
                <div style={{ display: "flex", marginBottom: "25px" }}>
                  <Button
                    background={true}
                    text="Quero Ver"
                    methodMovie={saveMovie}
                    movie={movie}
                    boolStyle={boolStyleMyMovie}
                    icon="add"
                  />
                  <Button
                    background={true}
                    text="Já vi"
                    methodMovie={assistedMovie}
                    movie={movie}
                    boolStyle={boolStyleWatched}
                    icon="check"
                  />
                </div>
                <span>
                  <i>{runtime} m</i>
                </span>
                <span>
                  Idioma: <i>{original_language.toUpperCase()}</i>
                </span>
                <span>
                  Investimento: <i>{numberToDolar(+budget)}</i>
                </span>
                <span className="genres">
                  Generos:
                  {genres.map((genre, i) => (
                    <span  key={i}>
                      <i>{genre.name}</i>
                    </span>
                  ))}
                </span>
                <span>
                  Media Geral: <i>{vote_average}</i>
                </span>
                <div className="row" />
              </div>

              <div className="overview">
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

              <div className="trailer">
                <h1>Trailer</h1>
                <YouTube videoId={video} opts={opts} className="video-yt" />
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
export const AboutMovie = withStyles(styles)(AboutMovieConnect);
