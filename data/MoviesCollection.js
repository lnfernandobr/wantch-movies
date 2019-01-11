import { Mongo } from "meteor/mongo";

export const MoviesCollection = new Mongo.Collection("movies");
export const myMoviesCollection = new Mongo.Collection("myMovies");
export const MoviesWatchCollection = new Mongo.Collection("moviesWatch");
