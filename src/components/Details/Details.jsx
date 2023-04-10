import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function Details() {

    const movieDetails = useSelector((store) => store.movieDetails)
    const genres = movieDetails.genres
    const dispatch = useDispatch()
    const history = useHistory();

    function handleBack() {
        // dispatch({ type: "CLEAR_MOVIE_DETAILS" })
        history.push('/')
    }
    return (<div>{
        movieDetails === {} ? (<div>Loading...</div>) : (<> <h2>{movieDetails.title}</h2>
            <img src={movieDetails.poster} />
            <br />
            <div>{movieDetails.description}</div>
            <br />
            <div>{genres.map((genre, i) => { return <h4 key={i}>{genre}</h4> })}</div>
            <br />
            <button onClick={handleBack}>Back</button></>)}
    </div >)
}
export default Details; 