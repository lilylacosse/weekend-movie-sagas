import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_MOVIE_DETAILS", fetchOneMovie);
  yield takeEvery("FETCH_GENRES", fetchAllGenres);
  yield takeEvery("POST_NEW_MOVIE", postNewMovie);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    console.log("get all:", movies.data);
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch {
    console.log("get all error");
  }
}
// this saga gets all of the data for one movie, including all genres for that movie, from the DB
function* fetchOneMovie(action) {
  try {
    const movieDetails = yield axios.get(`/api/movie/${action.payload}`);
    console.log(`fetchOneMovie:`, movieDetails.data);
    yield put({ type: "SET_MOVIE_DETAILS", payload: movieDetails.data });
  } catch {
    console.log("get one error");
  }
}
// saga get all genres from the db, and then saves them in the genres reducer
function* fetchAllGenres() {
  try {
    const genres = yield axios.get("/api/genre");
    // console.log(`genres.data:`, { ...genres.data });
    yield put({ type: "SET_GENRES", payload: genres.data });
  } catch {
    console.log("get genres error");
  }
}
// saga posts a new movie to the db, the post handles updating both the movie table and the genre table
function* postNewMovie(action) {
  try {
    yield axios.post("/api/movie", action.payload);
    yield put({ type: "FETCH_MOVIES" });
  } catch {
    console.log("post new movie error");
  }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();
// REDUCERS
// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};
// Stores details retrieved from a single movie
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS":
      return { ...action.payload[0] };
    case "CLEAR_MOVIE_DETAILS":
      return {};
    default:
      return state;
  }
};
// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};
// STORE
// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);
