import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const MoviesCollection = new Mongo.Collection("movies");
export const myMoviesCollection = new Mongo.Collection("myMovies");
export const MoviesWatchCollection = new Mongo.Collection("moviesWatch");
export const CollectionUser = Meteor.users;
