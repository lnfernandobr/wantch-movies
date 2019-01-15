import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import { SearchMoviesContainer } from "../../api/enhanceMethod";
import { MY_MovieContainer } from "../../api/enhanceMethod";
import { AboutMovieContainer } from "../../api/enhanceMethod";
import { SearchMovieContainerNEW } from "../../app/new-searchMovies/methodsMovie";
import { onHighContainer } from "../../app/new-searchMovies/onHigh/onHighContainer";
import { spring, AnimatedSwitch } from "react-router-transition";
import { Popular } from "../../app/new-searchMovies/popular/Popular";
import { MostWatched } from "../../app/new-searchMovies/mostWatched/MostWatched";

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
// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
}
// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8)
  },
  // and rest at an opaque, normally-scaled state
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
        <PrivateRoute exact path="/" component={SearchMoviesContainer} />

        <PrivateRoute path="/on-high" component={onHighContainer} />
        <PrivateRoute path="/popular" component={Popular} />
        <PrivateRoute path="/most-watched" component={MostWatched} />
        {/*<PrivateRoute path="/best-rated" component={BestRated} />*/}
        {/*<PrivateRoute path="/search-done" component={SearchDone} />*/}
        {/*<PrivateRoute path="/customize-search" component={CustomizeSearch} />*/}

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
