import React from "react";
import { ComponentMovie } from "../fetchMoreMovies/Component";

export const BestRated = () => {
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
