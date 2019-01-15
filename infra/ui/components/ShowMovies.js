import { MoviePoster } from "./MoviePoster";
import { Button } from "./Button";
import React from "react";

export const ShowMovies = ({
  Movies,
  saveMovie,
  assistedMovie,
  boolStyleMyMovie,
  boolStyleWatched
}) => {
  console.log(Movies.Movies);

  if (Movies.length > 0) {
    return (
      <div>
        {Movies.map(movie => (
          <div className="movie-container" key={movie.id}>
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
        ))}
      </div>
    );
  }

  return null;
};
