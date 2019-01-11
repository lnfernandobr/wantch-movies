import { getImageUrl } from "../../../api/moviesHelpers";
import React from "react";
import { Link } from "react-router-dom";

export const MoviePoster = ({ movie }) => {
  const { id, poster_path, title } = movie;

  return (
    <div>
      <div className="myMovie-item" key={id}>
        <div className="movie-image">
          <Link to={`learn-more-movie/${id}`}>
            <img
              alt="poster"
              className="img-movie"
              src={getImageUrl(poster_path)}
            />
          </Link>
        </div>

        <p> {title}</p>
      </div>
    </div>
  );
};
