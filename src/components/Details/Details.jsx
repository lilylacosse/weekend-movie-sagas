import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function Details() {
    const history = useHistory();
    const movieDetails = useSelector((store) => store.movieDetails)
    const genres = movieDetails.genres
    console.log(`movieDetails`, movieDetails.genres);
    return (<><h2>{movieDetails.title}</h2>
        <img src={movieDetails.poster} />
        <br />
        <div>{movieDetails.description}</div>
        <br />
        <div>
            {genres.map(genre => {
                console.log(`genre:`, genre);
                return (<h4>{genre}</h4>)
            })}</div>
        <br />
        <button onClick={() => history.push('/')}>Back</button>
    </>)
}
export default Details; 