import { compose, withHandlers, withState } from "recompose";
import { withRouter } from "react-router-dom";
import { AboutMovie } from "./aboutMovie";
import { withApollo } from "react-apollo";
import { getMovie } from "../../api/query/getMovie";
import { connect } from "react-redux";
import { enhance } from "../../api/methodsMovie";
import { addComment } from "../../api/mutation/addComment";
import { hiddenAboutIconAction } from "../../infra/redux/actions/actions";
import { getMessages } from "../../api/query/messages";

const mapDispatchToProps = dispatch => ({
  hiddenAboutIconAction: state => dispatch(hiddenAboutIconAction(state))
});

export const AboutMovieConnect = compose(
  enhance,
  addComment,
  getMessages,

  connect(
    null,
    mapDispatchToProps
  ),

  withState("seeOverview", "setSeeOverview", false),
  withState("message", "setMessage", ""),

  withHandlers({
    changeMessage: ({ setMessage }) => ({ target: { value: message } }) => {
      setMessage(message);
    },

    toggleOverview: ({ seeOverview, setSeeOverview }) => () => {
      setSeeOverview(!seeOverview);
    },

    addComment: ({ addComment, setMessage }) => (_id, message) => {
      addComment({
        variables: {
          _id,
          message
        }
      });
      setMessage("");
    }
  }),

  getMovie,
  withRouter,
  withApollo
)(AboutMovie);
