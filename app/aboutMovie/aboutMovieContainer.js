import { compose, withHandlers, withState } from "recompose";
import { withRouter } from "react-router-dom";
import { AboutMovie } from "./aboutMovie";
import { withApollo } from "react-apollo";
import { getMovie } from "../../api/query/getMovie";
import { connect } from "react-redux";
import { enhance } from "../../api/methodsMovie";

import {
  hiddenAboutIconAction,
} from "../../infra/redux/actions/actions";

const mapDispatchToProps = dispatch => ({
  hiddenAboutIconAction: state => dispatch(hiddenAboutIconAction(state))
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

  getMovie,
  withRouter,
  withApollo
)(AboutMovie);
