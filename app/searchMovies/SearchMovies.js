import React, { Component } from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { QUERY_MOVIES_API } from "../../api/Query";
import { Loading } from "../../infra/ui/components/loading";
import { ShowMovies } from "../../infra/ui/components/ShowMovies";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
  h5: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "50px"
  }
};

class SearchMovies extends Component {
  componentDidMount() {
    this.props.hiddenIconsAction(false);
    this.props.hiddenAboutIconAction(false);
  }

  render() {
    let {
      classes,
      saveMovie,
      assistedMovie,
      boolStyleMyMovie,
      boolStyleWatched,
      searchMovie
    } = this.props;

    return (
      <div className={classes.main}>
        <div className={classes.container}>
          <Query query={QUERY_MOVIES_API} variables={{ query: searchMovie }}>
            {({ loading, data }) => {
              if (loading) {
                return <Loading />;
              }

              return (
                <ShowMovies
                  Movies={data.moviesAPI}
                  saveMovie={saveMovie}
                  assistedMovie={assistedMovie}
                  boolStyleMyMovie={boolStyleMyMovie}
                  boolStyleWatched={boolStyleWatched}
                />
              );

              // return (
              //   <div className="container-movies">
              //     {movies.map(movie => (
              //       <div className="movie-container" key={movie.id}>
              //         <div style={{ position: "relative" }}>
              //           <MoviePoster movie={movie} />
              //
              //           <div className="test-controller">
              //             <Button
              //               methodMovie={saveMovie}
              //               movie={movie}
              //               boolStyle={boolStyleMyMovie}
              //               icon="add_circle"
              //             />
              //             <Button
              //               methodMovie={assistedMovie}
              //               movie={movie}
              //               boolStyle={boolStyleWatched}
              //               icon="check_circle"
              //             />
              //           </div>
              //         </div>
              //       </div>
              //     ))}
              //   </div>
              // );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SearchMovies);
