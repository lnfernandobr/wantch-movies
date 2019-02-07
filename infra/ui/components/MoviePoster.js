import { getImage } from "../../../api/moviesHelpers";
import React from "react";
import { Link } from "react-router-dom";

export const MoviePoster = ({ movie }) => {
  const { id, poster_path, title } = movie;

  return (
    <div>
      <div className="myMovie-item" key={id}>
        <div className="boxA">
          <div className="movie-image">
            <Link to={`learn-more-movie/${id}`}>
              <img alt="poster" src={getImage(poster_path)} className="img-movies"/>
              <p> {title}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
