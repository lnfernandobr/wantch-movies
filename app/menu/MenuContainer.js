import Menu from "./Menu";
import { connect } from "react-redux";
import { User } from "../../api/query/user";
import { compose } from "recompose";
import {
  rowStateAction,
  searchMovieAction,
  widthStateAction
} from "../../infra/redux/actions/actions";

const mapStateToProps = ({ widthState, rowState, hiddenAboutIcon }) => {
  return {
    widthState,
    rowState,
    hiddenAboutIcon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchMovieAction: query => dispatch(searchMovieAction(query)),
    rowStateAction: () => dispatch(rowStateAction()),
    widthStateAction: value => dispatch(widthStateAction(value))
  };
};

export const MenuContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  User
)(Menu);
