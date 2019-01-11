import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { getImageUrl } from "../../../api/moviesHelpers";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

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
  }
};

export const MoviesTableComponent = ({
  classes,
  movies,
  movieAssisted,
  movieAdd,

  styleMyMovie,
  styleWatched
}) => {
  return (
    <div>
      <div className="box-table">
        <Table className="table-movies">
          <TableHead>
            <TableRow>
              <TableCell className={classes.itemTable}>Titulo</TableCell>

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
            {movies.map(
              ({
                id,
                poster_path: posterPath,
                title = "",
                release_date: releaseDate = "N/A",
                vote_average: voteAverage = 0,
                original_language: originalLanguage = "N/A"
              }) => {
                return (
                  <TableRow key={id} className="table-hover">
                    <TableCell
                      className={classes.itemTable}
                      component="th"
                      scope="row"
                    >
                      <Link to={`learn-more-movie/${id}`}>
                        <div className="box-image-title-table">
                          <div className="image-movie">
                            <img alt="poster" src={getImageUrl(posterPath)} />
                          </div>

                          <span className="title-table">{title}</span>
                        </div>
                      </Link>
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.itemTable}
                    >
                      {releaseDate.slice(0, 4)}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.itemTable}
                    >
                      {voteAverage}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.itemTable}
                    >
                      {originalLanguage}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.itemTable}
                    >
                      <Button onClick={() => movieAdd(id, title, posterPath)}>
                        <i style={styleMyMovie(id)} className="material-icons">
                          add_circle
                        </i>
                      </Button>

                      <Button
                        onClick={() => movieAssisted(id, title, posterPath)}
                      >
                        <i style={styleWatched(id)} className="material-icons">
                          check_circle
                        </i>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const MovieTable = withStyles(styles)(MoviesTableComponent);
