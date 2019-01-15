import React from "react";
import { ComponentMovie } from "../fetchMoreMovies/Component";

export const Popular = () => {
  return (
    <div>
      <ComponentMovie
        page={1}
        sortBy="popularity.desc"
        primaryReleaseYear={2019}
        voteCountGte={8}
      />
    </div>
  );
};
