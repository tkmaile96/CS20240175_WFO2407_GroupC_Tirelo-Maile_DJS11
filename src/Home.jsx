import React, { useState, useEffect } from 'react';// import useState and useEffect from the React library
import { Link } from 'react-router-dom';// import Link from the react-router-dom library
import PodcastImage from '../src/assets/podcast.png'; // podacst image
import Banner from './assets/Podcast background.jpg'; // banner image




const Home = ({ searchShow, selectGenre }) => {

    const [shows, setShows] = useState([]); // initialise an empty array to store the shows data
    const [filteredShows, setFilteredShows] = useState([]); // initialise an empty array to store the filtered shows data
    const [loading, setLoading] = useState(false); // initialise a boolean to track the loading state

    // Fetch the shows data from the API 
    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await fetch("https://podcast-api.netlify.app"); // API URL
                const data = await response.json(); // parse the response data as JSON

                setShows(data);
                setFilteredShows(data); // initialise filtered shows
               
                
            } catch (error) {
                console.error("Try Again🥲", error);
            } finally {
                setLoading(false); // set loading to false after fetching data
            }
        };
        fetchShows(); // call the fetchShows function
    }, []); // run the fetchShows function only once 

    
    

    //Update filtered shows whenever search or filter changes
    useEffect(() => {
        let filtered = shows;

        //Filter by search input
        if (searchShow) {
            filtered = filtered.filter((show) =>
            show.title.toLowerCase().includes(searchShow.toLowerCase())
            )
        }

        //Filter by genre
        if(selectGenre) {
            filtered = filtered.filter((show) =>
            show.genres.includes(Number(selectGenre))
            )
        }
        setFilteredShows(filtered); // update filtered shows

    }, [searchShow, selectGenre, shows]); // run the effect whenever searchInput, selectedGenre
    
    if (loading) return <div className="text-center">No Data is availabe at the Moment🥲</div>;// display a loading message if the data is being fetched

    if (!filteredShows.length && !loading) {
        return <div className="loading">
            <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611gkosecep36x27bg9bz3hnuqenzj4us4aiawcsp65&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Cool GIF" />

        </div>; // display a message if no shows are found
    }
    

    return (
        <div className="home">
            <div className="show-banner">
                <h1 className="show-title">Welcome to Podcastify <img src={PodcastImage} alt="podcast"  /> </h1>
                <h4 className="show-subtitle">The Number one Podcasting Platform in the area</h4>
                <p className="show-description">Sit back, grab your popcorns and enjoy the show.</p>
            </div>
            <div className="show-grid">
            {filteredShows.map((show) => (
                <div key={show.id} className="show-card">
                    <img src={show.image} alt={show.title} />
                    <h3>{show.title}</h3>
                    <Link to={`/show/${show.id}`}>
                    <button>Watch</button>
                    </Link>
                    <h4>Genre: {show.genres.join(', ')}</h4>
                    <h4>Seasons: {show.seasons}</h4>
                    <h4>Last Updated: {new Date(show.updated).toLocaleDateString()}</h4>
                </div>
            ))}
            </div>
        </div>
    )

};
export default Home; // export the Home component as the default export