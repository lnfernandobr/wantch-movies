export const schemaMovie = `
  type Query {
    movie(id: String): Movie
    movies(query: String!): [Movie]
    moviesWatched: [Movie]
    myMovies: [Movie]
    moviesAPI(query: String!): [Movie]
    moviesGenre(genre: String): [Movie]
    moviesType(type: String): [Movie]
  }
 
  type Mutation {
    removeWatchedMovie(id: Int!, title: String!, poster_path:String) : Movie      
    saveWatchedMovie(id: Int!, title: String!, poster_path:String) : Movie
    removeMovie(id: Int!) : Movie
    saveMovie(id: Int!, title: String!, poster_path:String) :Movie
  }
   
  type Movie {
   _id: String
    id: String
    title: String
    poster_path: String
    vote_count: Int
    popularity: String
    overview: String
    homepage: String
    original_language: String
    vote_average: String
    release_date: String
    backdrop_path: String
    runtime: String
    budget: String
    video: String
  }

`;
