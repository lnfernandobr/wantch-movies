import { genreId, genreText } from "../../../data/moviesConstants";
import React from "react";

export const Genre = ({
  changeGenre,
  genreState,
  setGenreState,
  changeGenreState
}) => {
  return (
    <div className="box-select-genre">
      <li className="list-categories">
        {genreId.map((item, index) => {
          return (
            <div
              key={index}
              className="checkbox_item"
              style={
                genreState[index]
                  ? { backgroundColor: "#368338" }
                  : { backgroundColor: "#5E5E5E" }
              }
            >
              <label htmlFor={`check${index}`}>{genreText[index]}</label>
              <input
                id={`check${index}`}
                type="checkbox"
                style={{ display: "none" }}
                value={item}
                onClick={() => {
                  changeGenreState(index);
                  changeGenre(item);
                }}
              />
            </div>
          );
        })}
      </li>
    </div>
  );
};
