import React, { Component } from "react";
import { Loading } from "../../infra/ui/components/loading";
import { getImageUrl, getPoster } from "../../api/moviesHelpers";
import YouTube from "react-youtube";
import { Button } from '../../infra/ui/components/Button';

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
      GET_MOVIE: { movie, loading: loadingThree },
      seeOverview,
      toggleOverview,

      saveMovie,
      assistedMovie,
      boolStyleMyMovie,
      boolStyleWatched
    } = this.props;

    if (loadingThree) {
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
      video,
      genres
    } = movie;


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

                    <div  className="controllers-movieInfo">
                      <Button
                        className="btn-about"
                        methodMovie={saveMovie}
                        movie={movie}
                        background={true}

                        boolStyle={boolStyleMyMovie}
                        icon="add"
                        text="Quero Ver"
                      />
                      <Button
                        style={{marginLeft: "28px"}}
                        className="btn-about"
                        methodMovie={assistedMovie}
                        background={true}
                        movie={movie}
                        boolStyle={boolStyleWatched}
                        icon="check"
                        text="Já vi"
                      />
                    </div>


                    <div className="details-movie">
                      <span> <i>{runtime} m</i></span>
                      <span> Idioma: <i>{original_language.toUpperCase()}</i></span>
                      <span>Investimento: <i>{numberToReal(+budget)}</i></span>

                      <span>
                        Generos: {genres.map((genre, i )=> <span key={i}><i>{genre.name}</i></span>)}
                      </span>
                      <span>Media Geral: <i>{vote_average}</i></span>
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
