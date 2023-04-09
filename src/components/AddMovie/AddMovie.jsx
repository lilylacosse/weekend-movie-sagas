import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function AddMovie() {
    const [newTitle, setNewTitle] = useState("");
    const [newURL, setNewURL] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newGenreID, setNewGenre] = useState("");
    const genres = useSelector((store) => store.genres);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_GENRES" });
    }, []);
    function handleGenre() {
        console.log('HANDLEGENRE:', event.target.value);
        setNewGenre(event.target.value)
    }

    function submitMovie(event) {

        event.preventDefault();
        console.log("newGenreID:", newGenreID);
        let newMovie = {
            title: newTitle,
            poster: newURL,
            description: newDescription,
            genre_id: newGenreID,
        };

        dispatch({ type: "POST_NEW_MOVIE", payload: newMovie });
        history.push('/')
    }
    return (
        <><h2>Add a Movie</h2>
            <form onSubmit={submitMovie}>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(evt) => setNewTitle(evt.target.value)}
                />
                <input
                    type="text"
                    placeholder="Poster URL"
                    value={newURL}
                    onChange={(evt) => setNewURL(evt.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={newDescription}
                    rows={6}
                    cols={60}
                    onChange={(evt) => setNewDescription(evt.target.value)}
                ></textarea>
                <select value={newGenreID}
                    onChange={handleGenre}
                >

                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <button type="submit">Add Movie</button>
            </form>
        </>
    );
}

export default AddMovie;
