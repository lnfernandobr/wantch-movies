import React, { Fragment } from "react";
import { SearchEnhancedMovies } from "./newSearchMoviesContainer";
import { ShowMovies } from "../../infra/ui/components/ShowMovies";

export const NewSearchMovies = ({
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
      <SearchEnhancedMovies />
    </Fragment>
  );
};
