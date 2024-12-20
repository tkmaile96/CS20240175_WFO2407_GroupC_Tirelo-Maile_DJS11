import React, { useState, useEffect } from 'react';// import useState and useEffect from the React library




const Favorites = () => {

    const [favorites, setFavorites] = useState([]); // Declare a new state variable

    useEffect(() => {
        const storedShows = JSON.parse(localStorage.getItem('favorites')) || [];// Check if there is a stored list of favorites in local storage if not set it to an empty array[]
        setFavorites(storedShows); // Update the favorites state with the stored list of favorites

    }, []); // The empty array means this effect will only run once

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== id); // Filter out the show with the id that was clicked
        setFavorites(updatedFavorites); // Update the favorites state with the updated list of favorites
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update the stored list of favorites in local storage

    };
    if (favorites.length === 0) return <p> No favorites episodes yet...</p>

    return (
        <div className="favorites">
            <h1>Favorites</h1>

            <ul>
               
                {favorites.map((episode) => (
                    <li key={episode.id}>
                        <h2>{episode.title}</h2>
                        <button onClick={() => removeFavorite(episode.id)}>Remove from Favorites</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Favorites; // export default Favorites;