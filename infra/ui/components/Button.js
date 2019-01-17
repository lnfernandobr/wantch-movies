import React from "react";

const ColorA = { color: "#368338" };
const ColorB = { color: "white" };

const BackgroundA =  { backgroundColor: "#368338", color: "white"  };
const BackgroundB =  { backgroundColor: "rgba(255, 255, 255, 0.4)", color: "white"  };


export const Button = ({ methodMovie, movie, boolStyle, icon, text = "", background = false }) => (
  <button
    className="movie-watched"
    onClick={() => {
      methodMovie(Number(movie.id), movie.title, movie.poster_path);
    }}

    style={ background ?
        boolStyle(movie.id)
          ? BackgroundA
          : BackgroundB
      : null }
  >
    {background ?
      (<i
        style={boolStyle(movie.id) ? {color:"white"} : {color:"white"} }
        className="material-icons"
      >
        {icon}
      </i>
      ) : (
      <i
        style={boolStyle(movie.id) ? ColorA : ColorB}
        className="material-icons"
      >
        {icon}
      </i>
      )
    }

    {text}
  </button>
);
