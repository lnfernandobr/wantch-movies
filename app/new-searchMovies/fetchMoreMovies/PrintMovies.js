import React from "react";
import { enhance } from "../methodsMovie";
import { compose } from "recompose";
import { MovieTable } from '../../../infra/ui/components/MovieTable';
import { MoviePoster } from '../../../infra/ui/components/MoviePoster';
import { Button } from '../../../infra/ui/components/Button';
import { connect } from 'react-redux';

export const PrintMoviesConnect = ({
  movies,
  type,
  saveMovie,
  assistedMovie,
  boolStyleMyMovie,
  boolStyleWatched,
  widthState,
  rowState
}) => {
  if (!movies) return null;

  if(widthState > 830 && rowState) {
    if(type === "table") {
      return (
        <div className="container-movies" style={{ display: "flex" }}>
          <div className="movie-container">
            <div style={{ position: "relative" }}>
              <MovieTable
                movies={movies}
                saveMovie={saveMovie}
                assistedMovie={assistedMovie}
                boolStyleMyMovie={boolStyleMyMovie}
                boolStyleWatched={boolStyleWatched}
              />
            </div>
          </div>
        </div>
      );

    }

  }

  return (
    <div className="container-movies" style={{ display: "flex" }}>
      {
        movies.map(movie => (
          <div
        key={movie.id}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <div className="movie-container">
          <div style={{ position: "relative" }}>
            <MoviePoster movie={movie} />

            <div className="test-controller">
              <Button
                methodMovie={saveMovie}
                movie={movie}
                boolStyle={boolStyleMyMovie}
                icon="add_circle"
              />
              <Button
                methodMovie={assistedMovie}
                movie={movie}
                boolStyle={boolStyleWatched}
                icon="check_circle"
              />
            </div>
          </div>
        </div>
      </div>
        ))
      }
    </div>

  );

};


const mapStateToProps = ({
   widthState,
   rowState,
 }) => {
  return {
    widthState,
    rowState,
  };
};


export const PrintMovies = compose(enhance, connect(mapStateToProps))(PrintMoviesConnect);
