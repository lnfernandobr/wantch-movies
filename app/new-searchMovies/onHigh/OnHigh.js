import React, { Fragment } from "react";
import { FetchMoreMovie } from "./FetchMoreMovie";
import { ShowMovies } from "../../../infra/ui/components/ShowMovies";

export const OnHigh = ({
  Movies,
  saveMovie,
  assistedMovie,
  boolStyleMyMovie,
  boolStyleWatched
}) => {

  return (
    <Fragment>
      <div className="container-movies">
        <ShowMovies
          Movies={Movies}
          saveMovie={saveMovie}
          assistedMovie={assistedMovie}
          boolStyleMyMovie={boolStyleMyMovie}
          boolStyleWatched={boolStyleWatched}
        />
      </div>
      <FetchMoreMovie />
    </Fragment>
  );
};
