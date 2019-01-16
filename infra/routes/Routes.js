import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import { MY_MovieContainer } from "../../api/enhanceMethod";
import { AboutMovieContainer } from "../../api/enhanceMethod";
import { SearchMovieContainerNEW } from "../../app/new-searchMovies/methodsMovie";
import { OnHigh } from "../../app/new-searchMovies/onHigh/OnHigh";
import { spring, AnimatedSwitch } from "react-router-transition";
import { Popular } from "../../app/new-searchMovies/popular/Popular";
import { MostWatched } from "../../app/new-searchMovies/mostWatched/MostWatched";
import { BestRated } from "../../app/new-searchMovies/bestRated/BestRated";

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

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
}
const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8)
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
};

export const Routes = () => {
  return (
    <div>
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper"
      >
        <PrivateRoute exact path="/" component={OnHigh} />
        <PrivateRoute path="/on-high" component={OnHigh} />
        <PrivateRoute path="/popular" component={Popular} />
        <PrivateRoute path="/most-watched" component={MostWatched} />
        <PrivateRoute path="/best-rated" component={BestRated} />

        <PrivateRoute
          exact
          path="/search-movies"
          component={SearchMovieContainerNEW}
        />
        <PrivateRoute
          path="/learn-more-movie/:id"
          component={AboutMovieContainer}
        />
        <PrivateRoute path="/movie-watch" component={MY_MovieContainer} />
      </AnimatedSwitch>
    </div>
  );
};
