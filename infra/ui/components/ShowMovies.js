import { MoviePoster } from "./MoviePoster";
import { Button } from "./Button";
import React from "react";
import { MovieTable } from "./MovieTable";

export const ShowMovies = ({
  Movies,
  saveMovie,
  assistedMovie,
  boolStyleMyMovie,
  boolStyleWatched,
  type
}) => {
  console.log(Movies);

  if (type === "table") {
    console.log(type);
    return (
      <div className="movie-container">
        <div style={{ position: "relative" }}>
          <MovieTable
            movies={Movies}
            saveMovie={saveMovie}
            assistedMovie={assistedMovie}
            boolStyleMyMovie={boolStyleMyMovie}
            boolStyleWatched={boolStyleWatched}
          />
        </div>
      </div>
    );
  }

  return Movies.map(movie => (
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
  ));
};
