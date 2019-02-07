import { MoviesWatchCollection } from "../data/MoviesCollection";
import {
  myMoviesCollection,
  CollectionUser,
  MessagesCollection
} from "../data/MoviesCollection";

import pick from "lodash.pick";
const MOVIEN = "search/movie?";
import axios from "axios";

import {
  BASE_URL,
  MOVIE,
  API_KEY,
  MAX_OVERVIEW_LENGHT,
  DISCOVER,
  VIDEO,
  LANGUAGE
} from "../data/moviesConstants";

const toQueryString = obj =>
  obj
    ? Object.keys(obj)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        )
        .join("&")
    : "";

export const Resolver = {
  Query: {
    async movie(root, { id }) {
      try {
        const result = await axios.get(
          `${BASE_URL}${MOVIE}${Number(
            id
          )}?${API_KEY}${LANGUAGE}&append_to_response=videos`
        );

        let video = [];
        if (result.data.videos.results[0] === undefined) {
          video = " ";
        } else {
          video = result.data.videos.results[0].key;
        }

        return {
          ...result.data,
          genres: [...result.data.genres],
          video
        };
      } catch (e) {
        throw new Error(e);
      }
    },
    async movies(root, { query }) {
      if (!query) {
        try {
          const res = await axios.get(
            `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}popularity.desc${VIDEO}`
          );

          return res.data.results;
        } catch (e) {
          return [];
        }
      }

      try {
        const res = await axios.get(
          `${BASE_URL}${MOVIEN}${API_KEY}${toQueryString({ query })}`
        );

        return res.data.results
          .map(movie => pick(movie, MOVIE_FIELDS))
          .map(movie => ({
            ...movie,
            overview: truncate(movie.overview, MAX_OVERVIEW_LENGHT)
          }));
      } catch (e) {
        throw new Error(e);
      }
    },
    async myMovies(root, args, { userId }) {
      return myMoviesCollection.find({ userId }).fetch();
    },
    async moviesWatched(root, args, { userId }) {
      return await MoviesWatchCollection.find({ userId });
    },
    async moviesAPI(root, { query, page }) {
      if (!query) {
        return [];
      }

      try {
        const res = await axios.get(
          `${BASE_URL}${MOVIEN}${API_KEY}${LANGUAGE}&page=${page}&${toQueryString(
            { query }
          )}`
        );

        const movies = res.data.results.map(movie => {
          return {
            ...movie,
            release_date: movie.release_date.slice(0, 4)
          };
        });

        return {
          movies,
          pageInfo: res.data.total_pages
        };
      } catch (e) {
        return [];
      }
    },
    async queryFilterMovies(
      root,
      {
        primaryReleaseYear = 2018,
        sortBy = "popularity.desc",
        page = 1,
        withGenre = "",
        certification = "",
        voteCountGte = ""
      }
    ) {
      try {
        const res = await axios.get(
          `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}sort_by=${sortBy}${VIDEO}&primary_release_year=${primaryReleaseYear}&certification=${certification}&vote_count.gte=${voteCountGte}&page=${page}`
        );

        const newMovies = res.data.results.map(movie => {
          return {
            ...movie,
            release_date: movie.release_date.slice(0, 4)
          };
        });

        return {
          movies: newMovies,
          pageInfo: res.data.total_pages
        };
      } catch (e) {
        return [];
      }
    },

    async user(root, args, { userId }) {
      const data = await CollectionUser.findOne(userId);

      const totalMoviesAssisted = await MoviesWatchCollection.find({
        userId
      }).count();
      const moviesSave = await myMoviesCollection.find({ userId }).count();

      return {
        _id: data._id,
        name: data.profile.name,
        totalMoviesAssisted,
        moviesSave
      };
    }
  },

  Mutation: {
    async saveMovie(root, doc, { userId }) {
      doc.userId = userId;
      const type = doc.type;

      if (type === "myMovies") {
        const _id = await myMoviesCollection.insert(doc);
        return await myMoviesCollection.findOne(_id);
      }

      if (type === "moviesWatched") {
        const _id = await MoviesWatchCollection.insert(doc);
        return await MoviesWatchCollection.findOne(_id);
      }
    },

    async removeMovie(root, doc, { userId }) {
      doc.userId = userId;
      const id = doc.id;
      const type = doc.type;

      if (type === "myMovies") {
        const data = await myMoviesCollection.findOne({ id: id, userId });

        await myMoviesCollection.remove({ id: data.id, userId });
        return data;
      }

      if (type === "moviesWatched") {
        const data = await MoviesWatchCollection.findOne({ id, userId });

        MoviesWatchCollection.remove({ id: data.id, userId });
        return data;
      }

      return null;
    }
  }
};
