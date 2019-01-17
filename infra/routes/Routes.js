import React from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import { withSnackbar } from "notistack";
import { AboutMovieContainer } from "../../api/enhanceMethod";
import { SearchMovieContainerNEW } from "../../app/new-searchMovies/methodsMovie";
import { OnHigh } from "../../app/new-searchMovies/onHigh/OnHigh";
import { Popular } from "../../app/new-searchMovies/popular/Popular";
import { MostWatched } from "../../app/new-searchMovies/mostWatched/MostWatched";
import { BestRated } from "../../app/new-searchMovies/bestRated/BestRated";
import { AnimatedRoute } from 'react-router-transition';
import { MyMoviesWatched } from '../../app/new-myMovies/myMoviesWatched';
import { MyMovies } from '../../app/new-myMovies/newMyMovies';


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

        <AnimatedRoute
          exact path="/"
          component={OnHigh}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={(styles) => ({
            transform: `translateX(${styles.offset}%)`,
          })}
        />


        <AnimatedRoute
          path="/on-high"
          component={OnHigh}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={(styles) => ({
            transform: `translateX(${styles.offset}%)`,
          })}
        />

        <AnimatedRoute
          path="/popular"
          component={Popular}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={(styles) => ({
            transform: `translateX(${styles.offset}%)`,
          })}
        />

        <AnimatedRoute
          path="/most-watched"
          component={MostWatched}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={(styles) => ({
            transform: `translateX(${styles.offset}%)`,
          })}
        />


        <AnimatedRoute
          path="/best-rated"
          component={BestRated}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={(styles) => ({
            transform: `translateX(${styles.offset}%)`,
          })}
        />



        {/*<PrivateRoute exact path="/" component={OnHigh} />*/}
        {/*<PrivateRoute path="/on-high" component={OnHigh} />*/}
        {/*<PrivateRoute path="/popular" component={Popular} />*/}
        {/*<PrivateRoute path="/most-watched" component={MostWatched} />*/}
        {/*<PrivateRoute path="/best-rated" component={BestRated} />*/}

        <PrivateRoute
          exact
          path="/search-movies"
          component={SearchMovieContainerNEW}
        />
        <PrivateRoute
          path="/learn-more-movie/:id"
          component={AboutMovieContainer}
        />
      <PrivateRoute path="/my-movies" component={MyMovies} />
        <PrivateRoute path="/movies-watched" component={MyMoviesWatched} />
      </Switch>
    </div>
  );
};
