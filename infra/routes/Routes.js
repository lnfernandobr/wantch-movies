import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import { SearchMoviesContainer } from "../../api/enhanceMethod";
import { MY_MovieContainer } from "../../api/enhanceMethod";
import { AboutMovieContainer } from "../../api/enhanceMethod";

const PrivateRouteComponent = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (path === "/login" || path === "/register") {
          return Meteor.userId() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }

        if (window.location.pathname === "/login") {
          return !Meteor.userId() ? (
            <Redirect to="/login" />
          ) : (
            <Redirect to="/movies-watch" />
          );
        }

        return Meteor.userId() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
const PrivateRoute = withSnackbar(PrivateRouteComponent);

export const Routes = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={SearchMoviesContainer} />
        <PrivateRoute
          path="/learn-more-movie/:id"
          component={AboutMovieContainer}
        />
        <PrivateRoute path="/movie-watch" component={MY_MovieContainer} />
      </Switch>
    </div>
  );
};
