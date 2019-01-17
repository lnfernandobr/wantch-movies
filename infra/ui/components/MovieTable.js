import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { getImageUrl } from "../../../api/moviesHelpers";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { Button } from "../components/Button";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    opacity: "0.4"
  },
  itemTable: {
    textAlign: "center",
    borderBottom: "1px solid  rgba(255, 255, 255, 0.3)",
    fontFamily: "'Fjalla One', sans-serif",
    color: "white"
  },
  itemTableTitle: {
    textAlign: "flex-start",
    borderBottom: "1px solid  rgba(255, 255, 255, 0.3)",
    fontFamily: "'Fjalla One', sans-serif",
    color: "white"
  }
};

export const MoviesTableComponent = ({
  classes,
  movies,
  saveMovie,
  assistedMovie,
  boolStyleMyMovie,
  boolStyleWatched
}) => {
  console.log(movies);
  return (
    <div>
      <div className="box-table">
        <Table className="table-movies">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.itemTableTitle}
                style={{ alignItems: "flex-start" }}
              >
                Titulo
              </TableCell>

              <TableCell
                style={{ textAlign: "center" }}
                align="right"
                className={classes.itemTable}
              >
                Ano
              </TableCell>
              <TableCell
                style={{ color: "white" }}
                align="right"
                className={classes.itemTable}
              >
                Nota
              </TableCell>
              <TableCell
                style={{ color: "white" }}
                align="right"
                className={classes.itemTable}
              >
                Região
              </TableCell>
              <TableCell
                align="right"
                style={{ textAlign: "center" }}
                className={classes.itemTable}
              >
                Controles
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {movies.map(movie => (
              <TableRow key={movie.id} className="table-hover">
                <TableCell
                  className={classes.itemTable}
                  component="th"
                  scope="row"
                >
                  <Link to={`learn-more-movie/${movie.id}`}>
                    <div className="box-image-title-table">
                      <div className="image-movie">
                        <img
                          alt="poster"
                          className="img-movie-table"
                          src={getImageUrl(movie.poster_path)}
                        />
                      </div>
                    </div>
                  </Link>
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  className={classes.itemTable}
                >
                  {movie.release_date}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  className={classes.itemTable}
                >
                 {movie.vote_average}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  className={classes.itemTable}
                >
                  {movie.original_language}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  className={classes.itemTable}
                >
                  <Button
                    methodMovie={saveMovie}
                    movie={movie}
                    boolStyle={boolStyleMyMovie}
                    icon="add_circle"
                  />
                  <Button
                    methodMovie={assistedMovie}
                    movie={movie}
                    boolStyle={boolStyleWatched}
                    icon="check_circle"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const MovieTable = withStyles(styles)(MoviesTableComponent);
