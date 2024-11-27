import React, { useState, useEffect } from 'react';// import useState and useEffect from the React library
import { Link } from 'react-router-dom';// import Link from the react-router-dom library




const Home = ({ searchTerm, selectedGenre }) => {

    const [shows, setShows] = useState([]); // initialise an empty array to store the shows data
    const [filteredShows, setFilteredShows] = useState([]); // initialise an empty array to store the filtered shows data

    // Fetch the shows data from the API 
    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await fetch("https://podcast-api.netlify.app"); // API URL
                const data = await response.json(); // parse the response data as JSON

                setShows(data);
                setFilteredShows(data); // initialise filtered shows
            } catch (error) {
                console.error("Error fetching shows", error);
            }
        };
        fetchShows(); // call the fetchShows function
    }, []); // run the fetchShows function only once 

    //Update filtered shows whenever search or filter changes
    useEffect(() => {
        let filtered = shows;

        //Filter by search input
        if (searchTerm) {
            filtered = filtered.filter((show) =>
            show.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        //Filter by genre
        if(selectedGenre) {
            filtered = filtered.filter((show) =>
            show.genres.include(Number(selectedGenre))
            )
        }
        setFilteredShows(filtered); // update filtered shows

    }, [searchTerm, selectedGenre, shows]); // run the effect whenever searchInput, selectedGenre


    return (
        <div className="home">
            <div className="show-grid">
            {filteredShows.map((show) => (
                <div key={show.id} className="show-card">
                    <img src={show.image} alt={show.title} />
                    <h3>{show.title}</h3>
                    <Link to={`/shows/${show.id}`}>
                    <button>Watch</button>
                    </Link>
                    <h4>Seasons: {show.seasons}</h4>
                    <h4>Last Updated: {new Date(show.update).toLocaleDateString()}</h4>
                </div>
            ))}
            </div>
        </div>
    )

};
export default Home; // export the Home component as the default export