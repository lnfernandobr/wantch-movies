import { graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { compose, withHandlers, withState } from "recompose";
import { AboutMovie } from "./aboutMovie";
import {
  genreResetAction,
  hiddenAboutIconAction,
  hiddenIconsAction
} from '../../infra/redux/actions/actions';
import { connect } from "react-redux";
import { QUERY_MOVIE } from "../../api/Query";
import { enhance } from '../new-searchMovies/methodsMovie';

const data = graphql(QUERY_MOVIE, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id.toString()
      }
    };
  },
  name: "GET_MOVIE"
});

const mapDispatchToProps = dispatch => ({
  hiddenIconsAction: state => dispatch(hiddenIconsAction(state)),
  hiddenAboutIconAction: state => dispatch(hiddenAboutIconAction(state)),
  genreResetAction: () => dispatch(genreResetAction())
});

export const AboutMovieConnect = compose(
  enhance,
  connect(
    null,
    mapDispatchToProps
  ),
  withState("seeOverview", "setSeeOverview", false),

  withHandlers({
    toggleOverview: ({ seeOverview, setSeeOverview }) => () => {
      setSeeOverview(!seeOverview);
    }
  }),

  data,
  withRouter,
  withApollo
)(AboutMovie);
