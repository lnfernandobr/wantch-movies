import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const myMoviesCollection = new Mongo.Collection("myMovies");
export const MoviesWatchCollection = new Mongo.Collection("moviesWatch");
export const MessagesCollection = new Mongo.Collection("messages");
export const CollectionUser = Meteor.users;
