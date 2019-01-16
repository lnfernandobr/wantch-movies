import { ShowMovies } from "../../../infra/ui/components/ShowMovies";
import React from "react";
import { enhance } from "../methodsMovie";
import { compose } from "recompose";

export const PrintMoviesConnect = ({
  movies,
  type,
  saveMovie,
  assistedMovie,
  boolStyleMyMovie,
  boolStyleWatched
}) => {
  if (!movies) return null;

  return (
    <div className="container-movies" style={{ display: "flex" }}>
      <ShowMovies
        type={type}
        Movies={movies}
        saveMovie={saveMovie}
        assistedMovie={assistedMovie}
        boolStyleMyMovie={boolStyleMyMovie}
        boolStyleWatched={boolStyleWatched}
      />
    </div>
  );
};

export const PrintMovies = compose(enhance)(PrintMoviesConnect);
