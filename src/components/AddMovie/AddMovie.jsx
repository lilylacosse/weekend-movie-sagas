import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function AddMovie() {
    const [newTitle, setNewTitle] = useState("");
    const [newURL, setNewURL] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const genres = useSelector((store) => store.genres);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_GENRES" });
    }, []);

    function onAddMovie() {
        event.preventDefault();
        let newMovie = {
            title: newTitle,
            poster: newURL,
            description: newDescription,
            name: newGenre,
        };

        dispatch({ type: POST_NEW_MOVIE, payload: newMovie });
    }
    return (
        <>
            <form onSubmit={() => onAddMovie}>
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(evt) => setNewTitle(evt.target.value)}
                />
                <input
                    type="text"
                    placeholder="Poster URL"
                    onChange={(evt) => setNewURL(evt.target.value)}
                />
                <textarea
                    placeholder="Description"
                    rows={6}
                    cols={60}
                    onChange={(evt) => setNewDescription(evt.target.value)}
                ></textarea>
                <select
                    value={newGenre}
                    onChange={(evt) => setNewGenre(evt.target.value)}
                >
                    <option value="" disabled selected style={{ color: "grey" }}>
                        -Genre-
                    </option>
                    {genres.map((genre) => (
                        <option value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <button type="submit">Add Movie</button>
            </form>
        </>
    );
}

export default AddMovie;
