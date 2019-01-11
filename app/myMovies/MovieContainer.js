import { MyMovies } from "./MyMovie";
import { connect } from "react-redux";
import { compose } from "recompose";
import { hiddenAboutIconAction, hiddenIconsAction } from '../../infra/redux/actions/actions';

const mapStateToProps = ({ searchMovie, showMovieWatched }) => {
  return {
    searchMovie,
    showMovieWatched
  };
};

const mapDispatchToProps = dispatch => ({
  hiddenIconsAction: state => dispatch(hiddenIconsAction(state)),
  hiddenAboutIconAction: state => dispatch(hiddenAboutIconAction(state))

});

export const MyMovieContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MyMovies);
