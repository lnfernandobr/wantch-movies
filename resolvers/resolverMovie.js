import { MoviesCollection } from "../data/MoviesCollection";
import { MoviesWatchCollection } from "../data/MoviesCollection";
import { myMoviesCollection } from "../data/MoviesCollection";
import pick from "lodash.pick";
const MOVIEN = "search/movie?";
import axios from "axios";

import {
  MOVIE_FIELDS,
  BASE_URL,
  MOVIE,
  API_KEY,
  truncate,
  MAX_OVERVIEW_LENGHT,
  DISCOVER,
  METHOD,
  VIDEO,
  LANGUAGE,
  GENRE
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
    async moviesAPI(root, { query }) {
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
          `${BASE_URL}${MOVIEN}${API_KEY}${LANGUAGE}${toQueryString({ query })}`
        );

        return res.data.results;
      } catch (e) {
        throw new Error(e);
      }
    },
    async moviesGenre(root, { genre }) {
      try {
        const res = await axios.get(
          `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}${METHOD}${VIDEO}${GENRE}${genre}`
        );
        return res.data.results;
      } catch (e) {
        throw new Error(e);
      }
    },

    async moviesType(root, { type, page }) {
      const NEW_METHOD = `&sort_by=${type}&`;
      console.log("page = ", page);
      try {
        const res = await axios.get(
          `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}${NEW_METHOD}${VIDEO}&page=${page}`
        );

        return res.data.results;
      } catch (e) {
        throw new Error(e);
      }
    },

    async searchMovies(root, { page }) {
      console.log(page);
      try {
        const res = await axios.get(
          `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}popularity.desc${VIDEO}&page=${page}`
        );

        // const newObj = res.data.results.map(item => {
        //   return {
        //     ...item,
        //     type: "myMovies"
        //   };
        // });

        // console.log("newObj ==== ", newObj);

        return {
          movies: [...res.data.results],
          pageInfo: res.data.total_pages
        };
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    async searchFilterMovies(
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
      console.log("page = ", page);

      try {
        const res = await axios.get(
          `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}sort_by=${sortBy}${VIDEO}&primary_release_year=${primaryReleaseYear}&certification=${certification}&vote_count.gte=${voteCountGte}&page=${page}`
        );

        return {
          id: res.data.total_pages,
          movies: [...res.data.results],
          pageInfo: res.data.total_pages
        };
      } catch (e) {
        console.log("ERRO ==== ", e);
      }
    },

    async searchOnHigh(
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
      console.log("page = ", page);

      try {
        const res = await axios.get(
          `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}sort_by=${sortBy}${VIDEO}&primary_release_year=${primaryReleaseYear}&certification=${certification}&vote_count.gte=${voteCountGte}&page=${page}`
        );

        console.log(res.data.total_pages);
        return {
          id: res.data.total_pages,
          movies: [...res.data.results],
          pageInfo: res.data.total_pages
        };
      } catch (e) {
        console.log("ERRO ==== ", e);
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
      console.log("page = ", page);

      try {
        const res = await axios.get(
          `${BASE_URL}${DISCOVER}${API_KEY}${LANGUAGE}sort_by=${sortBy}${VIDEO}&primary_release_year=${primaryReleaseYear}&certification=${certification}&vote_count.gte=${voteCountGte}&page=${page}`
        );

        console.log(res.data.total_pages);
        return {
          id: res.data.total_pages,
          movies: [...res.data.results],
          pageInfo: res.data.total_pages
        };
      } catch (e) {
        console.log("ERRO ==== ", e);
      }
    }
  },

  Mutation: {
    async saveMovie(root, doc, { userId }) {
      console.log(doc);
      doc.userId = userId;
      const type = doc.type;
      console.log(type);

      if (type === "myMovies") {
        console.log(doc);
        const _id = await myMoviesCollection.insert(doc);
        console.log("_id: ", _id);
        const res = await myMoviesCollection.findOne(_id);
        console.log("res = ", res);
        return res;
      }

      if (type === "moviesWatched") {
        console.log("moviesWatched aqui");

        const _id = await MoviesWatchCollection.insert(doc);
        return await MoviesWatchCollection.findOne(_id);
      }
    },

    async removeMovie(root, doc, { userId }) {
      doc.userId = userId;
      const id = doc.id;
      const type = doc.type;

      console.log("id = ", id);
      console.log("type = ", type);

      if (type === "myMovies") {
        const data = await myMoviesCollection.findOne({ id: id, userId });
        console.log("data removeMovie type myMovies  = ", data);

        await myMoviesCollection.remove({ id: data.id, userId });
        return data;
      }

      if (type === "moviesWatched") {
        console.log("removendo aqui");
        const data = await MoviesWatchCollection.findOne({ id, userId });
        console.log(data);

        MoviesWatchCollection.remove({ id: data.id, userId });
        return data;
      }

      return null;
    },

    async saveWatchedMovie(root, obj, { userId }) {
      obj.userId = userId;
      const _id = await MoviesWatchCollection.insert(obj);
      return await MoviesCollection.findOne(_id);
    },
    async removeWatchedMovie(root, { id }, { userId }) {
      const data = await MoviesWatchCollection.findOne({
        id,
        userId
      });

      MoviesWatchCollection.remove({ id, userId });
      return data;
    }
  }
};
