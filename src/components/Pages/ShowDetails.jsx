import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom




const ShowDetails = () => {
    const { id } = useParams(); // Get the id from the URL
    const [show, setShow] = useState(null); // Initialize a state to store the show details
    const [error, setError] = useState(false); // Initialize a state to store any error messages
    const [playingEpisode, setPlayingEpisode] = useState(false); // Initialize a state to store whether to play an episode
    

    //Fetch the show details from the API
    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`); //API URL
                const data = await response.json(); // Parse the response data to json
                setShow(data); // Update the show state with the fetched data

            }catch (error) {
                console.error("Pleasse Try Again", error);
                setError(true); // Set the error state to true if there's an error
            }
        };
        fetchShowDetails(); // Call the fetchShowDetails function
    }), [id]; // The dependency array is set to [id] so that the effect is re-run

// Add to favorites
const addToFavorites = (episodes) => {
  const alreadyExist = JSON.parse(localStorage.getItem("favorites")) ||[]; // Check if the episode is already in the favorites list
  const alreadyFavorite = alreadyExist.some((fav) => fav.id === episodes.id); 

  if (!alreadyFavorite) {
    const updatedFavorites = [...alreadyExist, episodes];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    alert(`${episodes.title} added to favorites`)
  } else {
    alert(`${episodes.title} is already a favorite`)
  }
}

    if (error) return <div className="error">Error loading show details</div>; // If there's an error, display an error message
    if (!show) return <div className="loading">
        <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611gkosecep36x27bg9bz3hnuqenzj4us4aiawcsp65&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />

    </div>; // If the show data is not available

    // play an episode
    const playEpisode = (episode) => {
        setPlayingEpisode(episode); // Set the playEpisode state to true
    }

    
    return (
  <div className="show-details">
    <div className="details-container">
     <div className="header">
     <img
       src={show.image}
      alt={show.title}
       className="show-image"
            />
    <div className="info">
       <h1>{show.title}</h1>
         <p>{show.description}</p>
        <p><strong>Total Seasons:</strong> {show.seasons.length}</p>
        <p><strong>Last Updated:</strong> {new Date(show.updated).toLocaleDateString()}</p>
    </div>
</div>

<div className="season">
  <button onClick={prevSeason}>Preview</button>
    <div className="season-details">
      <h2>{currentSeason.title + 1}</h2>
      {currentSeason.image && (
        <img src={currentSeason.image} alt={currentSeason.title} className="season-image" />
        
      )}
      <ul className="episode-list">
      {currentSeason.episodes.map((episode, index) => (
        <li key={index} className="episode"> 
        <div>
         <strong>Episode {index + 1}: </strong> {episode.title}
        </div>
        <button onClick={() => playEpisode(episode)}>Play</button>
        <button onClick={() => addToFavorites(episode)}>Favorite</button>
        </li>
      ))}
      </ul>
    </div>
    <button onClick={nextSeason}>Next</button>
</div>
</div>
  {playingEpisode && (
   <div className="audio-player">
   <div className="audio-info">
   <h3>{playingEpisode.title}</h3>
  <audio controls autoPlay>
   <source src={playingEpisode.file} type="audio/mpeg" />
     Your browser does not support the audio element.
  </audio>
  </div>
   <button onClick={() => setPlayingEpisode(null)} className="play-button">
      Close
   </button>
</div>
   )}
</div>
    )
};
export default ShowDetails; // Export the component as the default export