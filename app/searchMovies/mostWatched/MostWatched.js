import { ComponentMovie } from "../../movies/MoviesComponent";
import React from "react";

export const MostWatched = () => {
  return (
    <div>
      <ComponentMovie
        page={1}
        sortBy="popularity.desc"
        primaryReleaseYear={2018}
        voteCountGte={7}
      />
    </div>
  );
};
