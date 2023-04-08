import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    function goToDetails(movieId) {
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieId
        })
        history.push('/details')
    }

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={() => history.push('/addmovie')}>Add Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <button onClick={() => goToDetails(movie.id)}>
                                <img src={movie.poster} alt={movie.title} />
                            </button>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;