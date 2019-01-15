import React from "react";

const backgroundA = { color: "#368338" };
const backgroundB = { color: "white" };

export const Button = ({ methodMovie, movie, boolStyle, icon }) => (
  <button
    className="movie-watched"
    onClick={() => {
      methodMovie(Number(movie.id), movie.title, movie.poster_path);
    }}
  >
    <i
      style={boolStyle(movie.id) ? backgroundA : backgroundB}
      className="material-icons"
    >
      {icon}
    </i>
  </button>
);
