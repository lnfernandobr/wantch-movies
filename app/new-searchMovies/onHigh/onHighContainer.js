import { OnHigh } from "./OnHigh";
import { compose } from "recompose";
import { enhance } from "../methodsMovie";
import { connect } from "react-redux";
const mapStateToProps = ({ Movies }) => ({
  Movies
});
export const onHighContainer = compose(
  enhance,
  connect(mapStateToProps)
)(OnHigh);
