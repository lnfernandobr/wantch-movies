import { withSnackbar } from "notistack";
import { Route, Redirect, Switch } from "react-router-dom";
import { AboutMovieConnect } from "../../app/aboutMovie/aboutMovieContainer";
import { MyMoviesWatched } from "../../app/myMovies/myMoviesWatched";
import { MyMovies } from "../../app/myMovies/newMyMovies";
import { MostWatched } from "../../app/searchMovies/mostWatched/MostWatched";
import { BestRated } from "../../app/searchMovies/bestRated/BestRated";
import { Popular } from "../../app/searchMovies/popular/Popular";
import { OnHigh } from "../../app/searchMovies/onHigh/OnHigh";
import React from "react";

const PrivateRoute = withSnackbar(({ component: Component, path, ...rest }) => {
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
            <Redirect to="/on-high" />
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
});

// (PrivateRouteComponent);

export const Routes = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={OnHigh} />
        <PrivateRoute path="/on-high" component={OnHigh} />
        <PrivateRoute path="/popular" component={Popular} />
        <PrivateRoute path="/most-watched" component={MostWatched} />
        <PrivateRoute path="/best-rated" component={BestRated} />
        <PrivateRoute
          path="/learn-more-movie/:id"
          component={AboutMovieConnect}
        />
        <PrivateRoute path="/my-movies" component={MyMovies} />
        <PrivateRoute path="/movies-watched" component={MyMoviesWatched} />
      </Switch>
    </div>
  );
};
