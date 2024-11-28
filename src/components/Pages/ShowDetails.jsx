import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom



const ShowDetails = () => {
    const { id } = useParams(); // Get the id from the URL
    const [show, setShow] = useState(null); // Initialize a state to store the show details
    const [error, setError] = useState(false); // Initialize a state to store any error messages
    const [playingEpisode, setPlayingEpisode] = useState(false); // Initialize a state to store whether to play an episode
    const [selectedSeason, setSelectedSeason] = useState(null); // Initialize a state to store the selected season
    const [favorites, setFavorites] = useState([]); // Initialize a state to store the favorite shows

    //Fetch the show details from the API
    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`); //API URL
                const data = await response.json(); // Parse the response data to json
                setShow(data); // Update the show state with the fetched data

            }catch (error) {
                console.error("Error fetching show details:", error);
                setError(true); // Set the error state to true if there's an error
            }
        };
        fetchShowDetails(); // Call the fetchShowDetails function
    }), [id]; // The dependency array is set to [id] so that the effect is re-run

    if (error) return <div className="error">Error loading show details</div>; // If there's an error, display an error message
    if (!show) return <div className="loading">
        <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611gkosecep36x27bg9bz3hnuqenzj4us4aiawcsp65&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />

    </div>; // If the show data is not available

    // Select a season
    const selectSeason = (index) => {
      setSelectedSeason(selectedSeason === index ? null : index); // Update the selected season state
    }

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
    <div className="seasons">
     <h2>Seasons</h2>
     {show.seasons.map((season, seasonIndex) => (
      <div key={seasonIndex} className="season">
       <button onClick={() => selectSeason(seasonIndex)} className="play-button">
           {seasonIndex + 1}
        </button>
      {selectSeason === seasonIndex && (
        <ul className="episode-list">
          {season.episodes.map((episode, episodeIndex) => (
            <li className="episode" key={episodeIndex}>
              <div className="episode-info">
                <span>Episode {episodeIndex + 1}: {episode.title}
                  
                  <button onClick={() => playEpisode(episode)} className="play-button">
                  Play
                  </button>

                  <button onClick={() => playEpisode(episode)} className="play-button">
                  Play
                </button>
                  
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
  </div>
   ))}
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