import React from "react";
import { ComponentMovie } from "../fetchMoreMovies/Component";
import { compose } from "recompose";
import { connect } from "react-redux";

const mapStateToProps = ({ Movies, searchMovie }) => ({
  Movies,
  searchMovie
});

const OnHighConnect = ({ Movies, searchMovie }) => {
  console.log(Movies);
  console.log(searchMovie);

  return (
    <ComponentMovie
      page={1}
      sortBy="revenue.desc"
      primaryReleaseYear={2010}
      voteCountGte={8}
    />
  );
};

export const OnHigh = compose(connect(mapStateToProps))(OnHighConnect);
