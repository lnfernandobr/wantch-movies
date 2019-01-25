import { ComponentMovie } from "../../movies/MoviesComponent";
import React from "react";

export const OnHigh = () => {
  return (
    <ComponentMovie
      page={1}
      sortBy="revenue.desc"
      primaryReleaseYear={2010}
      voteCountGte={8}
    />
  );
};
