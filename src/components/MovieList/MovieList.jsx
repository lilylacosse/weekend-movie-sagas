import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies);
    const movieDetails = useSelector((store) => store.movieDetails);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_MOVIES" });
        // dispatch({ type: "CLEAR_MOVIE_DETAILS" })
    }, []);

    function goToDetails(movieId) {

        dispatch({
            type: "FETCH_MOVIE_DETAILS",
            payload: movieId,
        })
        history.push("/details")
    }

    return (
        <main>
            <h1>MovieList</h1>
            <button className="button" onClick={() => history.push("/addmovie")}>
                Add Movie
            </button>
            <section className="movies">
                {movies.map((movie) => {
                    return (
                        <Card key={movie.id} sx={{ maxWidth: 400, margin: 2, bgcolor: "primary.main" }}>
                            <h3>{movie.title}</h3>
                            <button onClick={() => goToDetails(movie.id)}>
                                <img src={movie.poster} alt={movie.title} />
                            </button>
                        </Card>
                    );
                })}
            </section>
        </main>
    );
}

export default MovieList;
