import React, { Component } from "react";
import { compose } from "recompose";
import { Query } from "react-apollo";
import { queryFilterMovies } from "../../../api/query/querys";
import { enhanceFetchMore } from "../fetchMoreMovies/FetchMoreContainer";
import { enhance } from "../methodsMovie";
import { ShowMovies } from "../../../infra/ui/components/ShowMovies";
import { Loading } from "../../../infra/ui/components/loading";
import {
  genreAction,
  hiddenAboutIconAction,
  hiddenIconsAction,
  rowStateAction,
  widthStateAction
} from "../../../infra/redux/actions/actions";
import { connect } from "react-redux";

class ComponentConnect extends Component {
  state = {
    page: 1
  };

  render() {
    const PrintMovies = ({ queryFilterMovies, type }) => {
      const {
        saveMovie,
        assistedMovie,
        boolStyleMyMovie,
        boolStyleWatched
      } = this.props;

      if (queryFilterMovies.movies === undefined) return null;

      return (
        <div className="container-movies" style={{ display: "flex" }}>
          <ShowMovies
            type={type}
            Movies={queryFilterMovies.movies}
            saveMovie={saveMovie}
            assistedMovie={assistedMovie}
            boolStyleMyMovie={boolStyleMyMovie}
            boolStyleWatched={boolStyleWatched}
          />
        </div>
      );
    };

    const {
      page,
      sortBy,
      primaryReleaseYear,
      voteCountGte,
      widthState,
      rowState
    } = this.props;

    return (
      <div>
        <Query
          query={queryFilterMovies}
          variables={{
            page,
            sortBy,
            primaryReleaseYear,
            voteCountGte
          }}
          fetchPolicy="cache-and-network"
        >
          {({ data: { queryFilterMovies }, fetchMore, loading }) => {

            if (widthState > 830 && rowState) {
              return (
                <div>
                  <PrintMovies
                    queryFilterMovies={queryFilterMovies || []}
                    type="table"
                  />

                  {loading ? (
                    <Loading />
                  ) : (
                    <div className="btn-box">
                      <button
                        className="search-movies"
                        onClick={() => {
                          this.setState(
                            prev => ({ page: prev.page + 1 }),
                            () => {
                              this.props.fetchMore(
                                this.state.page,
                                sortBy,
                                primaryReleaseYear,
                                voteCountGte,
                                fetchMore
                              );
                            }
                          );
                        }}
                      >
                        Carregar mais
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div>
                <PrintMovies
                  queryFilterMovies={queryFilterMovies || []}
                  type="flex"
                />

                {loading ? (
                  <Loading />
                ) : (
                  <div className="btn-box">
                    <button
                      className="search-movies"
                      onClick={() => {
                        this.setState(
                          prev => ({ page: prev.page + 1 }),
                          () => {
                            this.props.fetchMore(
                              this.state.page,
                              sortBy,
                              primaryReleaseYear,
                              voteCountGte,
                              fetchMore
                            );
                          }
                        );
                      }}
                    >
                      Carregar mais
                    </button>
                  </div>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = ({
  rowState,
  widthState,
  stateFilter,
  genre,
  showFilter
}) => {
  return {
    rowState,
    widthState,
    stateFilter,
    genre,
    showFilter
  };
};

const mapDispatchToProps = dispatch => ({
  rowStateAction: () => dispatch(rowStateAction()),
  widthStateAction: value => dispatch(widthStateAction(value)),
  genreAction: id => dispatch(genreAction(id)),
  hiddenIconsAction: state => dispatch(hiddenIconsAction(state)),
  hiddenAboutIconAction: state => dispatch(hiddenAboutIconAction(state))
});

export const ComponentMovie = compose(
  enhanceFetchMore,
  enhance,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ComponentConnect);
